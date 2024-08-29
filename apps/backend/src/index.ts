// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { User } from './models/User';
import { Profile } from './models/Profile';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
const users: User[] = [];
const profiles: Profile[] = [];

// Register a new user
app.post('/register', (req: Request, res: Response) => {
  const { username, email, password, gender } = req.body;

  // Simple validation
  if (!username || !email || !password || !gender) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    password,
    gender
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Create or update profile for male users
app.post('/profile', (req: Request, res: Response) => {
  const { userId, bio, age, location } = req.body;

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  if (user.gender !== 'male') {
    return res.status(403).json({ message: 'Only male users can create profiles.' });
  }

  const existingProfile = profiles.find(p => p.userId === userId);

  if (existingProfile) {
    existingProfile.bio = bio;
    existingProfile.age = age;
    existingProfile.location = location;
    res.status(200).json(existingProfile);
  } else {
    const newProfile: Profile = {
      id: uuidv4(),
      userId,
      bio,
      age,
      location
    };
    profiles.push(newProfile);
    res.status(201).json(newProfile);
  }
});

// Get all male profiles (for swiping)
app.get('/profiles', (req: Request, res: Response) => {
  const maleProfiles = profiles.filter(p => {
    const user = users.find(u => u.id === p.userId);
    return user && user.gender === 'male';
  });
  res.status(200).json(maleProfiles);
});

// Swipe functionality for female users
app.post('/swipe', (req: Request, res: Response) => {
  const { userId, profileId, action } = req.body; // action can be 'like' or 'dislike'

  const user = users.find(u => u.id === userId);
  const profile = profiles.find(p => p.id === profileId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  if (user.gender !== 'female') {
    return res.status(403).json({ message: 'Only female users can swipe.' });
  }

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found.' });
  }

  // TODO: implement logic to handle 'like' or 'dislike' (e.g., store it in a database or array)
  res.status(200).json({ message: `You have ${action}d the profile.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});