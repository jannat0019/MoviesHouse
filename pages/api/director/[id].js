import path from 'path';
import fs from 'fs/promises';

export default async function handler(req, res) {
  const { id } = req.query;
  console.log("id", id)

  try {
    // Verify file path is correct
    const filePath = path.join(process.cwd(), 'data', 'movies.json');
    console.log('Looking for file at:', filePath); // Debug log
    
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    // Debug logs
    console.log('All directors:', data.directors);
    console.log('Looking for director ID:', id);

    const director = data.directors.find(d => d.id.toString() === id);
    
    if (!director) {
      console.log('Director not found');
      return res.status(404).json({ error: 'Director not found' });
    }

    const movies = data.movies.filter(movie => movie.directorId.toString() === id);

    return res.status(200).json({
      director,
      movies: movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        releaseYear: movie.releaseYear
      }))
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to load director',
      details: error.message 
    });
  }
}