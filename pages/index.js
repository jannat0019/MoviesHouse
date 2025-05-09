
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import MoviesList from '@/components/MoviesList';
import router from 'next/router';
import { ThemeContext } from '../src/context/ThemeContext';

import { useEffect, useContext } from 'react';

export default function Home({trendingMovies}){


    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);


    return(
        
        <div className={styles.homeContainer}>

            <Head>
                <title>Movie House</title>
            </Head>
            <div className={styles.headerContainer}>
                <h1 className={styles.pageTitle}>Trending Movies</h1>
                <button className={styles.browseButton} onClick={()=>router.push('/director')}>
                   Directors
                </button>

                <button className={styles.browseButton} onClick={toggleTheme}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button 
                  className={styles.browseButton}
                  onClick={() => router.push('/genres')}>
                  Browse Genres
    </button>


            </div>
           

            <div className={styles.moviesGrid}>
        {trendingMovies.map(movie => {
            return <MoviesList id={movie.id} img={movie.img}
            title={movie.title}
            directorId={movie.directorId} 
            description={movie.description}
            releaseYear={movie.releaseYear}
            genreId={movie.genreId}
            rating={movie.rating}/>
          
})}
      </div>

      <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>© {new Date().getFullYear()} Movie House. All rights reserved.</p>
                    <div className={styles.footerLinks}>
                        <Link href="/help" className={styles.footerLink}>
                            Help Center
                        </Link>
                        <Link href="/help/about" className={styles.footerLink}>
                            About Us
                        </Link>
                        <Link href="help/contact" className={styles.footerLink}>
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>


        </div>

    )





    
}

export async function getStaticProps() {
  try {
    // Use absolute URL for both dev and production
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies`);
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }
    
    return {
      props: {
        trendingMovies: data.movies || []
      },
      revalidate: 60
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      props: {
        trendingMovies: []
      },
      revalidate: 60
    };
  }
}