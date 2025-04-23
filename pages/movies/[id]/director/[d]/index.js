import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import styles from '../../../../../styles/director.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(id ? `/api/director/${id}` : null, fetcher);

  console.log(data,"shshshs")
  if (error) return <div className={styles.error}>Failed to load director</div>;
  if (isLoading) return <div className={styles.loading}>Loading director...</div>;
  if (!data) return <div className={styles.loading}>No data found</div>;

  const { director, movies } = data;
  

  return (
    <div className={styles.container}>
      <h1 className={styles.directorName}>{director.name}</h1>
      <p className={styles.biography}>{director.biography}</p>
      
      <h2 className={styles.moviesTitle}>Movies Directed:</h2>
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
              {movie.title} ({movie.releaseYear})
            </Link>
          </li>
        ))}
      </ul>
      
      <Link href={`/movies/${id}`} className={styles.backLink}>
        ← Back to Movie
      </Link>
    </div>
  );
}