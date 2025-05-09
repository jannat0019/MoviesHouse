import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../../styles/Movies.module.css';

export default function Movie({ movie}) {
  const router = useRouter();

  console.log("in main function:", movie)
  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!movie) {
    return (
      <div className={styles.error}>
        <h1>Movie Not Found</h1>
        <Link href="/movies" className={styles.button}>
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{movie.title} | Movie Details</title>
      </Head>

      <div className={styles.movieHeader}>
        <h1 className={styles.movieTitle}>{movie.title}</h1>
        <div className={styles.movieMeta}>
          <span>{movie.releaseYear}</span>
          <span className={styles.rating}>Rating: {movie.rating}/10</span>
        </div>
      </div>

      <div className={styles.movieContent}>
        <div className={styles.poster}>
          <img src ={movie.img} className={styles.posterImage}/>
          {/* {movie.title.split(' ').map(word => word[0]).join('')} */}
        </div>

        <div className={styles.details}>
          <p className={styles.description}>{movie.description}</p>
          
          {/* <div className={styles.director}>
            <h2>Director</h2>
            {director ? (
              <Link href={`/movies/${movie.id}/director/${director.id}`} className={styles.directorLink}>
                {director.name}
              </Link>
            ) : (
              <p>Director information not available</p>
            )}
          </div> */}

          <Link href="/" className={styles.button}>
            Back to All Movies
          </Link>
        </div>
      </div>
    </div>
  );
}


export async function getStaticProps({ params }) {
  try {

    
    const movieId = parseInt(params.id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${movieId}`);
    const data=await res.json()
    console.log("data   ", data)
    const movie=data.movie
    

    if (!movie) {
      return {
        notFound: true
      };
    }

    // const director = data.directors.find(d => d.id === movie.directorId);

    return {
      props: {
        movie
        // director: director || null, // Ensure director is never undefined
      },
      revalidate: 60, // ISR
    };
  } catch (error) {
    console.error('Error loading movie:', error);
    return {
      notFound: true
    };
  }
}

export async function getStaticPaths() {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies`);
    const data= await res.json()

    console.log("in movies static path")
    const paths = data.movies.map(movie => ({
      params: { id: movie.id.toString() } // Ensure ID is string
    }));

    return {
      paths,
      fallback: true, 
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}