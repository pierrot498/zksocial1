// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Profile } from "./entities/Profile";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is not set.`);
  }
});

export const AppDataSource = new DataSource({
  type: "postgres",
  schema: "public",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Profile],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
