import styles from '../styles/Movies.module.css';
import Link from 'next/link';

export default function MoviesList(props) {
  return (
    <div className={`${styles.movieCard} ${props.singleView ? styles.singleView : ''}`}>
      <div className={styles.movieImageContainer}>
        <img 
          className={styles.movieImage}
          src={props.img} 
          alt={`${props.title} movie poster`}
        />
      </div>
      <div className={styles.movieContent}>
        <h2 className={styles.movieTitle}>{props.title}</h2>
        <span className={styles.movieRating}>{props.rating}/10</span>
        <span className={styles.movieYear}>{props.releaseYear} • {props.genreName}</span>
        <Link href={`/movies/${props.id}`}>
          <div className={styles.viewDetails}>
            View Details
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}