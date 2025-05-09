import useSWR from 'swr';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  CircularProgress,
  Alert,
  TextField,
  Button
} from '@mui/material';
import { Theaters, Search } from '@mui/icons-material';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsList() {
  const { data, error, isLoading } = useSWR('/api/directors', fetcher);
  const [searchId, setSearchId] = useState('');

  if (isLoading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ m: 2 }}>
      Failed to load directors
    </Alert>
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId) {
      window.location.href = `/directors/${searchId}`;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Film Directors
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <TextField
          label="Search Director by ID"
          variant="outlined"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          sx={{ mr: 1, width: 250 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<Search />}
          disabled={!searchId}
        >
          Search
        </Button>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data?.directors?.map((director) => (
          <ListItem 
            key={director.id}
            alignItems="flex-start"
            component={Link}
            href={`/directors/${director.id}`}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
                cursor: 'pointer'
              }
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {director.name.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={director.name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    ID: {director.id}
                  </Typography>
                  {` — ${director.biography.substring(0, 60)}...`}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}