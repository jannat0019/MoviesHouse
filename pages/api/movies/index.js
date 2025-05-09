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
    const movies = await db.collection('movies').find({}).toArray();
    await client.close();
    
    res.status(200).json({
      success: true,
      movies: movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        img: movie.img,
        directorId: movie.directoryId,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genreId: movie.genreId,
        rating: movie.rating
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