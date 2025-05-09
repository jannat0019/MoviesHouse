import { MongoClient } from 'mongodb';

// Initialize connection
let client;
let db;

async function connectDB() {
  if (db) return db;
  
  client = await MongoClient.connect(process.env.MONGODB_URI);
  db = client.db('movies');
  return db;
}

export async function queryDB(collectionName, operation, query = {}) {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    
    switch (operation) {
      case 'find':
        return await collection.find(query).toArray();
      case 'findOne':
        return await collection.findOne(query);
    //   case 'insert':
    //     return await collection.insertOne(query);
    //   case 'update':
    //     const { _id, ...updates } = query;
    //     return await collection.updateOne({ _id }, { $set: updates });
    //   case 'delete':
    //     return await collection.deleteOne(query);
      default:
        throw new Error(`Invalid operation: ${operation}`);
    }
  } catch (error) {
    console.error('DB Error:', error);
    throw error;
  }
}

// Close connection (optional)
export async function closeDB() {
  if (client) await client.close();
  client = null;
  db = null;
}