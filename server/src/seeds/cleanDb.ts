import db from '../config/connection.js'; // Make sure db is correctly set up to connect to your MongoDB instance

export default async (collectionName: string) => {
  try {
    const connection = await db(); // Ensure the database connection is established
    if (!connection.db) {
      throw new Error('Database connection is not established.');
    }
    const collectionExists = await connection.db.listCollections({ name: collectionName }).toArray();

    // If collection exists, drop it
    if (collectionExists.length) {
      await connection.db.dropCollection(collectionName);
      console.log(`Collection ${collectionName} dropped.`);
    } else {
      console.log(`Collection ${collectionName} does not exist.`);
    }
  } catch (err) {
    console.error('Error in checking or dropping collection:', err);
    throw err; // Re-throw error to be handled upstream
  }
};