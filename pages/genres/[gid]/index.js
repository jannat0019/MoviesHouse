
import path from 'path'
import fs from 'fs/promises';
import MoviesList from '@/components/MoviesList';

export default function GenreMoviesPage({ genre, movies }) {
  return (
    <div>
      <h1>{genre.name} Movies</h1>
      <ul>
       {movies.map(movie => {
                   return <MoviesList id={movie.id} img={movie.img}
                   title={movie.title}
                   directorId={movie.directorId} 
                   description={movie.description}
                   releaseYear={movie.releaseYear}
                   genreId={movie.genreId}
                   rating={movie.rating}
                   singleView={true}/>
                 
       })}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const p = path.join(process.cwd(), 'data', 'movies.json');
  const datajson = await fs.readFile(p);
  const data = JSON.parse(datajson);
  const genreId = parseInt(context.params.gid);
  const genre = data.genres.find(g => g.id === genreId);
  console.log("gen", genre)
  const movies = data.movies.filter(m => m.genreId === genreId);

  return {
    props: {
      genre,
      movies,
    },
  };
}