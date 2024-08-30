// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Profile } from "./entities/Profile";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Register a new user
app.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, gender } = req.body;

  if (!username || !email || !password || !gender) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({
      id: uuidv4(),
      username,
      email,
      password,
      gender,
    });
    const savedUser = await userRepository.save(newUser);

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create or update profile for male users
app.post("/profile", async (req: Request, res: Response) => {
  const { userId, bio, age, location } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const profileRepository = AppDataSource.getRepository(Profile);

    const user = await userRepository.findOneBy({ id: userId, gender: "male" });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or not a male user." });
    }

    let profile = await profileRepository.findOneBy({ user: { id: userId } });

    if (profile) {
      profile.bio = bio;
      profile.age = age;
      profile.location = location;
    } else {
      profile = profileRepository.create({
        id: uuidv4(),
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

// Get all male profiles (for swiping)
app.get("/profiles", async (req: Request, res: Response) => {
  try {
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
    const userRepository = AppDataSource.getRepository(User);
    const profileRepository = AppDataSource.getRepository(Profile);

    const user = await userRepository.findOneBy({ id: userId, gender: "female" });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or not a female user." });
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