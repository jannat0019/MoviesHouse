import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const { id } = req.query;
    if (!id) {
      res.status(400).json({ success: false, error: 'Movie ID is required' });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });

    const db = client.db('movies');
    
    // OPTIMIZATION: Query the database directly for the specific movie
    const movie = await db.collection('movies').findOne({ 
      id: Number(id) // Convert string ID to number to match your schema
    });

    console.log("movie in the id ", movie)
    await client.close();

    res.status(200).json({
      success: true,
      movie: {
        id: movie.id,
        title: movie.title,
        img: movie.img,
        directorId: movie.directorId,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genreId: movie.genreId,
        rating: movie.rating,
      },
    });

  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}