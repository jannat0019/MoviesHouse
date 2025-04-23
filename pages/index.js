
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import MoviesList from '@/components/MoviesList';
import path from 'path'
import fs from 'fs/promises';
import router from 'next/router';

export default function Home({trendingMovies}){


    return(
        
        <div className={styles.homeContainer}>

            <Head>
                <title>Movie House</title>
            </Head>
            <div className={styles.headerContainer}>
                <h1 className={styles.pageTitle}>Trending Movies</h1>
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

  const p=path.join(process.cwd(),'data','movies.json');
  const datajson =await fs.readFile(p);
  
  const data=JSON.parse(datajson);
    
  
   
    return {
      props: {
        trendingMovies:data['movies']
      },
      revalidate: 60, // ISR: regenerate every 60 seconds if needed
    };
  }