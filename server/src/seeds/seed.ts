// seeds/dev-seed.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import DeveloperModel from "../models/Developer.js";
import db from "../config/connection.js";

dotenv.config();

const seedDevelopers = async () => {
  try {
    await db(); // Connect to DB
    console.log("Seeding developers...");

    // Sample developers
    const developers = [
      {
        email: "axep504@gmail.com",
        password: "password123",
        imageUrl: "https://quiet-cheesecake-8e0b20.netlify.app/assets/pfp.jpeg",
        firstName: "Axel",
        lastName: "Paxton",
        telephone: "888-888-8888",
        city: "Springville",
        state: "UT",
        portfolioLink: "https://quiet-cheesecake-8e0b20.netlify.app/",
        githubLink: "https://github.com/Axe-P",
        hourlyRate: 150,
        bio: "Hello! I’m Axel, a passionate full-stack developer. My journey in web development began with HTML and CSS, and since then, I've expanded my skill set to include JavaScript, TypeScript, SQL, and React. I also have experience with APIs and Node.js, which enhance my ability to build and integrate robust web applications.",
      },
      {
        email: "iansterlingferguson@gmail.com",
        password: "password123",
        imageUrl: "https://avatars.githubusercontent.com/u/170969819?v=4",
        firstName: "Ian",
        lastName: "Ferguson",
        telephone: "480-266-5233",
        city: "Mesa",
        state: "AZ",
        portfolioLink: "https://github.com/TEMPTAG/Portfolio",
        githubLink: "https://github.com/TEMPTAG",
        hourlyRate: 150,
        bio: "Full-stack developer with 20+ years in automotive and medical industries, focused on building efficient, user-centered web applications.",
      },
      {
        email: "keith.amadeus.williams@gmail.com",
        password: "password123",
        imageUrl:
          "https://media.licdn.com/dms/image/v2/D5603AQFJNiPjTbe5rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723669954062?e=1737590400&v=beta&t=kwW3p4-yjgwjaWbCaILzxA0Li5WDfcyTGpNdRuh5I4o",
        firstName: "Keith",
        lastName: "Williams",
        telephone: "888-777-7777",
        city: "Idaho Falls",
        state: "ID",
        portfolioLink: "https://comingsoon.com",
        githubLink: "https://github.com/keithamadeus",
        hourlyRate: 150,
        bio: "I am a passionate and hard working Engineer and Leader. I have a thirst for learning new technology and finding creative ways to solve problems. I love building beautiful and reusable code. I thrive working with a team to achieve success together. I have excellent interpersonal communication and organization skills.",
      },
      {
        email: "rorydowse@hotmail.com",
        password: "password123",
        imageUrl: "https://avatars.githubusercontent.com/u/170678508?v=4",
        firstName: "Rory",
        lastName: "Dowse",
        telephone: "480-336-0379",
        city: "Phoenix",
        state: "AZ",
        portfolioLink: "https://rory-dowse-portfolio.netlify.app/",
        githubLink: "https://github.com/rorydowse",
        hourlyRate: 150,
        bio: "Software Engineer specializing in the MERN stack, with a creative background as a professional pianist and over 8 years of web development experience.",
      },
    ];

    // Seed developers
    for (const dev of developers) {
      const developer = new DeveloperModel(dev);
      await developer.save();
    }

    console.log("Developers seeded successfully!");
    mongoose.disconnect(); // Close DB connection
  } catch (error) {
    console.error("Error seeding developers:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedDevelopers();
