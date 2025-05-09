import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });
    
    const db = client.db('movies');
    const genres = await db.collection('genres').find({}).toArray();
    await client.close();
    console.log('genres', genres)
    
    res.status(200).json({
      success: true,
      genres: genres.map(g => ({
        id: g.id,
        name: g.name
      }))
    });
    
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}