import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Button,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
  CardActions
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronLeft, MovieFilter } from '@mui/icons-material';
import Head from 'next/head';

export default function GenresPage({ genres }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!genres || genres.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          No Genres Found
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ChevronLeft />}
          onClick={() => router.back()}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Browse by Genre | Movie House</title>
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          color:'gray'
        }}>
          <Typography variant="h3" component="h1">
            Browse by Genre
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<ChevronLeft />}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>

        <Grid container spacing={3}>
          {genres.map((genre) => (
            <Grid item key={genre.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                color:'lightgray',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}>
                <Link href={`/genres/${genre.id}`} passHref>
                  <CardActionArea sx={{ flexGrow: 1 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <MovieFilter sx={{ 
                        fontSize: 60,
                        color: 'lightcoral',
                        mb: 2
                      }} />
                      <Typography gutterBottom variant="h5" component="div">
                        {genre.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Link href={`/genres/${genre.id}`} passHref>
                    <Button 
                      size="small" 
                      color="primary"
                      endIcon={<ChevronLeft sx={{ transform: 'rotate(180deg)' }} />}
                    >
                      View Movies
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/genres`);
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    
    return {
      props: {
        genres: data.genres || []
      }
    };
  } catch (error) {
    console.error("Error fetching genres:", error);
    return {
      props: {
        genres: []
      }
    };
  }
}