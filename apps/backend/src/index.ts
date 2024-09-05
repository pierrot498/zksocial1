// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Profile } from "./entities/Profile";
import { ethers } from "ethers";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const initializeDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Database connected!");
  }
};

app.post("/authenticate", async (req: Request, res: Response) => {
  const { signature, walletAddress, gender } = req.body;

  if (!signature || !walletAddress) {
    return res.status(400).json({ message: "Signature and wallet address are required." });
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Step 1: Verify the signature
    var message = "Sign this message to connect with Kinto.";
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(400).json({ message: "Invalid signature." });
    }

    // Step 2: Find or create user
    const userRepository = AppDataSource.getRepository(User);
    let user = await userRepository.findOneBy({ walletAddress });
    let isNewUser = false;

    if (!user) {
      // Signup
      if (!gender) {
        return res.status(400).json({ message: "Gender is required for new users." });
      }
      user = userRepository.create({ walletAddress, isVerified: true, gender });
      isNewUser = true;
    } else {
      // Login
      user.isVerified = true;
      if (gender) {
        user.gender = gender;
      }
    }

    const isOnboardingDone = user.profile !== null;

    await userRepository.save(user);

    var message = isNewUser ? "User registered and verified successfully." : "User authenticated successfully.";
    res.status(200).json({ message, user, isNewUser, isOnboardingDone });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await AppDataSource.destroy();
  }
});

// Create or update profile for male users
app.post("/profile", async (req: Request, res: Response) => {
  const { userId, bio, age, location } = req.body;

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(User);
    const profileRepository = AppDataSource.getRepository(Profile);

    const user = await userRepository.findOneBy({ id: userId, gender: "male" });

    if (!user) {
      return res.status(404).json({ message: "User not found or not a male user." });
    }

    let profile = await profileRepository.findOneBy({ user: { id: userId } });

    if (profile) {
      profile.bio = bio;
      profile.age = age;
      profile.location = location;
    } else {
      profile = profileRepository.create({
        user,
        bio,
        age,
        location,
      });
    }

    const savedProfile = await profileRepository.save(profile);
    res.status(200).json(savedProfile);
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/profile", async (req: Request, res: Response) => {
  const { userId } = req.query as { userId?: string };
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(User);
    const profileRepository = AppDataSource.getRepository(Profile);

    const user = await userRepository.findOneBy({ id: userId, gender: "male" });

    if (!user) {
      return res.status(404).json({ message: "User not found or not a male user." });
    }

    const profile = await profileRepository.findOneBy({ user: { id: userId } });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all male profiles (for swiping)
app.get("/profiles", async (req: Request, res: Response) => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const profileRepository = AppDataSource.getRepository(Profile);
    const profiles = await profileRepository
      .createQueryBuilder("profile")
      .leftJoinAndSelect("profile.user", "user")
      .where("user.gender = :gender", { gender: "male" })
      .getMany();

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Swipe functionality for female users
app.post("/swipe", async (req: Request, res: Response) => {
  const { userId, profileId, action } = req.body;

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(User);
    const profileRepository = AppDataSource.getRepository(Profile);

    const user = await userRepository.findOneBy({ id: userId, gender: "female" });

    if (!user) {
      return res.status(404).json({ message: "User not found or not a female user." });
    }

    const profile = await profileRepository.findOneBy({ id: profileId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Here you would save the swipe action (like or dislike) to the database
    res.status(200).json({ message: `You have ${action}d the profile.` });
  } catch (error) {
    console.error("Error swiping profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
