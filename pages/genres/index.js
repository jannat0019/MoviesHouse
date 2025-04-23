import Link from "next/link";
import { useRouter } from "next/router";
import path from 'path';
import fs from 'fs/promises';
import styles from '../../styles/genres.module.css'

export default function Genres({ genres }) {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h1 className={styles.pageTitle}>Browse by Genre</h1>
                <button 
                    className={styles.backButton}
                    onClick={() => router.back()}
                >
                    ← Back
                </button>
            </div>

            <div className={styles.genresGrid}>
                {genres.map(genre => (
                    <Link 
                        href={`/genres/${genre.id}`} 
                        key={genre.id}
                        className={styles.genreCard}
                    >
                        <h2>{genre.name}</h2>
                        <div className={styles.viewDetails}>
                            View Movies →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const p = path.join(process.cwd(), 'data', 'movies.json');
    const datajson = await fs.readFile(p);
    const data = JSON.parse(datajson);
        
    return {
        props: {
            genres: data.genres,
        },
    };
}