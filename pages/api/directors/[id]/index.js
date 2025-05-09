import { queryDB } from "@/utils/api";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // Validate ID parameter
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        error: 'Valid director ID is required'
      });
    }

    // Get director details
    const director = await queryDB('directors', 'findOne', { 
      id: Number(id) 
    });

    if (!director) {
      return res.status(404).json({
        success: false,
        error: 'Director not found'
      });
    }

    // Get movies directed by this director
    const movies = await queryDB('movies', 'find', {
      directorId: Number(id)
    }, {
      projection: {
        _id: 0,
        id: 1,
        title: 1,
        img: 1,
        releaseYear: 1,
        rating: 1
      },
      sort: { releaseYear: -1 }
    });

    // Format response
    const response = {
      success: true,
      director: {
        id: director.id,
        name: director.name,
        biography: director.biography
      },
      movies: movies.map(movie => ({
        ...movie,
        img: movie.img || '/default-movie.jpg'
      }))
    };

    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    res.status(200).json(response);

  } catch (error) {
    console.error('Director API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { 
        details: error.message 
      })
    });
  }
}