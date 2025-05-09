import { useRouter } from 'next/router';
import useSWR from 'swr';
import { 
  Box, 
  Typography, 
  Avatar, 
  CircularProgress,
  Alert,
  Button,
  Grid,
  Card,
  CardMedia,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import { ArrowBack, Movie, Star, Person } from '@mui/icons-material';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(
    id ? `/api/directors/${id}` : null, 
    fetcher
  );

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '60vh', alignItems: 'center' }}>
      <CircularProgress size={80} />
    </Box>
  );

  if (error) return (
    <Box sx={{ p: 4 }}>
      <Alert severity="error" sx={{ mb: 3 }}>
        Failed to load director information
      </Alert>
      <Link href="/directors" passHref>
        <Button variant="contained" startIcon={<ArrowBack />}>
          Back to Directors
        </Button>
      </Link>
    </Box>
  );

  if (!data?.director) return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Director not found
      </Typography>
      <Link href="/directors" passHref>
        <Button variant="contained" startIcon={<ArrowBack />}>
          Back to Directors
        </Button>
      </Link>
    </Box>
  );

  const { director, movies } = data;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Link href="/directors" passHref>
        <Button startIcon={<ArrowBack />} variant="outlined" sx={{ mb: 4 }}>
          All Directors
        </Button>
      </Link>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ 
              width: 200, 
              height: 200, 
              fontSize: '4rem',
              bgcolor: 'primary.main'
            }}>
              {director.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {director.name}
            </Typography>
            <Chip 
              icon={<Person />} 
              label={`ID: ${director.id}`} 
              color="primary" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body1" paragraph>
              {director.biography}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        <Movie sx={{ verticalAlign: 'middle', mr: 1 }} />
        Filmography
      </Typography>

      {movies.length > 0 ? (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.img}
                  alt={movie.title}
                />
                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5">
                    {movie.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={movie.releaseYear} size="small" />
                    <Chip icon={<Star />} label={`${movie.rating}/10`} size="small" color="primary" />
                  </Stack>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Link href={`/movies/${movie.id}`} passHref>
                    <Button fullWidth variant="contained">
                      View Details
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No movies found for this director
        </Typography>
      )}
    </Box>
  );
}