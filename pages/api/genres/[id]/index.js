import { queryDB } from "@/utils/api";


export default async function handler(req,res){

    try{
    const {id}=req.query

    const movies=await queryDB('movies','find',{ genreId: Number(id) })

    const genre=await queryDB('genres','find',{id:Number(id)})
    console.log(genre.name,"g")

    res.status(200).json({
        success:true,
        movies: movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        img: movie.img,
        directorId: movie.directoryId,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genreId: movie.genreId,
        rating: movie.rating
      })),
        genre: { 
        id: genre.id,
        name: genre.name
      }
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

    

