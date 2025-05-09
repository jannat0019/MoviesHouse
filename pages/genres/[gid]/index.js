import MoviesList from '@/components/MoviesList';

export default function GenreMoviesPage({ genre, movies }) {
  if (!genre) {
    return <div>Genre not found</div>;
  }

  return (
    <div className="container">
      <h1>{genre.name} Movies</h1>
      <div className="movies-grid">
        {movies?.map(movie => (
          <MoviesList 
            key={movie.id}
            id={movie.id}
            img={movie.img}
            title={movie.title}
            directorId={movie.directorId}
            description={movie.description}
            releaseYear={movie.releaseYear}
            genreId={movie.genreId}
            rating={movie.rating}
            singleView={true}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { gid } = context.params;
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/genres/${gid}`);
    const data = await res.json();

    if (!data.success) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        genre: data.genre || null, 
        movies: data.movies || [] 
      }
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      notFound: true
    };
  }
}