import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Chip, 
  Rating, 
  Button,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronLeft, Movie as MovieIcon } from '@mui/icons-material';

export default function MoviePage({ movie }) {
  const router = useRouter();
  const theme = useTheme();

  if (router.isFallback) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Movie not found
        </Alert>
        <Link href="/movies" passHref>
          <Button 
            variant="contained" 
            startIcon={<ChevronLeft />}
            sx={{ mt: 2 }}
          >
            Back to Movies
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{movie.title} | Movie Details</title>
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={4}>
            {/* Movie Poster */}
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={movie.img}
                alt={movie.title}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  aspectRatio: '2/3',
                  objectFit: 'cover',
                  backgroundColor: theme.palette.grey[200]
                }}
                onError={(e) => {
                  e.target.src = '/default-movie.jpg';
                }}
              />
            </Grid>

            {/* Movie Details */}
            <Grid item xs={12} md={8}>
              <Box mb={3}>
                <Typography variant="h3" component="h1" gutterBottom>
                  {movie.title}
                </Typography>
                
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Chip 
                    label={movie.releaseYear} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Box display="flex" alignItems="center">
                    <Rating 
                      value={movie.rating / 2} 
                      precision={0.5} 
                      readOnly 
                    />
                    <Typography variant="body1" ml={1}>
                      {movie.rating}/10
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" paragraph>
                  {movie.description}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={2} mt={4}>
                <Link href="/" passHref>
                  <Button 
                    variant="contained" 
                    startIcon={<ChevronLeft />}
                  >
                    Back to All Movies
                  </Button>
                </Link>
                
                <Button 
                  variant="outlined" 
                  startIcon={<MovieIcon />}
                  onClick={() => alert('Feature coming soon!')}
                >
                  Watch Trailer
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Additional Sections (can be expanded) */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          More Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2">Genre</Typography>
              <Typography>Action</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2">Director</Typography>
              <Typography>Christopher Nolan</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2">Duration</Typography>
              <Typography>148 min</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2">Language</Typography>
              <Typography>English</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${params.id}`);
    const data = await res.json();
    
    if (!data.success || !data.movie) {
      return { notFound: true };
    }

    return {
      props: {
        movie: data.movie
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error loading movie:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies`);
    const data = await res.json();

    const paths = data.movies.map(movie => ({
      params: { id: movie.id.toString() }
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