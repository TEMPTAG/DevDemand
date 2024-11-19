// seeds/dev-seed.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import DeveloperModel from '../models/Developer.js';
import db from '../config/connection.js';

dotenv.config();

const seedDevelopers = async () => {
  try {
    await db(); // Connect to DB
    console.log('Seeding developers...');

    // Sample developers
    const developers = [
      {
        email: 'developer1@example.com',
        password: 'password123', // This will be hashed
        skills: ['JavaScript', 'Node.js', 'React'],
        bio: 'Full-stack developer with 5 years of experience.',
      },
      {
        email: 'developer2@example.com',
        password: 'password456',
        skills: ['Python', 'Django', 'SQL'],
        bio: 'Backend developer with a focus on scalable systems.',
      },
    ];

    // Seed developers
    for (const dev of developers) {
      const developer = new DeveloperModel(dev);
      await developer.save();
    }

    console.log('Developers seeded successfully!');
    mongoose.disconnect(); // Close DB connection
  } catch (error) {
    console.error('Error seeding developers:', error);
  }
};

seedDevelopers();