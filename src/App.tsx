import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, MenuItem, Select, FormControl, InputLabel, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Drawer, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
import './App.css';

interface Provider {
  id: string;
  name: string;
}

interface Note {
  date: string;
  noteType: string;
  audioLink: string;
  transcriptLink: string;
  commentsLink: string;
  soapNoteLink: string;
}

const practices = [
  { id: '1', name: 'Practice 1' },
  { id: '2', name: 'Practice 2' },
  // Add more practices as needed
];

const providers: { [key: string]: Provider[] } = {
  '1': [
    { id: '1', name: 'Provider A' },
    { id: '2', name: 'Provider B' },
  ],
  '2': [
    { id: '3', name: 'Provider C' },
    { id: '4', name: 'Provider D' },
  ],
  // Add more providers as needed
};

const dummyNotes: Note[] = [
  {
    date: '2024-07-01',
    noteType: 'Eval',
    audioLink: '#',
    transcriptLink: '#',
    commentsLink: '#',
    soapNoteLink: '#',
  },
  {
    date: '2024-07-02',
    noteType: 'Daily',
    audioLink: '#',
    transcriptLink: '#',
    commentsLink: '#',
    soapNoteLink: '#',
  },
];

const drawerWidth = 240;

function App() {
  const [selectedPractice, setSelectedPractice] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  const handlePracticeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPractice(event.target.value as string);
    setSelectedProvider('');
  };

  const handleProviderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProvider(event.target.value as string);
  };

  const fetchNotes = () => {
    // Fetch notes from the backend service
    // For now, we use dummy data
    setNotes(dummyNotes);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ScribePT QA Reporting Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button key="Dashboard">
              <ListItemText primary="Reporting Dashboard" />
            </ListItem>
            <ListItem button key="Account">
              <ListItemText primary="Account Details" />
            </ListItem>
          </List>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Aryan Chaudhary</Typography>
            <Typography variant="body2">Developer</Typography>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: drawerWidth }}
      >
        <Toolbar />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                ScribePT QA Reporting Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Practice</InputLabel>
                <Select
                  value={selectedPractice}
                  onChange={handlePracticeChange}
                  label="Select Practice"
                >
                  <MenuItem value="">
                    <em>--Select Practice--</em>
                  </MenuItem>
                  {practices.map(practice => (
                    <MenuItem key={practice.id} value={practice.id}>
                      {practice.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {selectedPractice && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Select Provider</InputLabel>
                  <Select
                    value={selectedProvider}
                    onChange={handleProviderChange}
                    label="Select Provider"
                  >
                    <MenuItem value="">
                      <em>--Select Provider--</em>
                    </MenuItem>
                    {providers[selectedPractice]?.map(provider => (
                      <MenuItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {selectedProvider && (
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={fetchNotes}>
                  Fetch Notes
                </Button>
              </Grid>
            )}
            {notes.length > 0 && (
              <Grid item xs={12}>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Note Type</TableCell>
                          <TableCell>Audio Link</TableCell>
                          <TableCell>Transcript Link</TableCell>
                          <TableCell>Comments Link</TableCell>
                          <TableCell>SOAP Note Link</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {notes.map((note, index) => (
                          <TableRow key={index}>
                            <TableCell>{note.date}</TableCell>
                            <TableCell>{note.noteType}</TableCell>
                            <TableCell>
                              <a href={note.audioLink}>Audio</a>
                            </TableCell>
                            <TableCell>
                              <a href={note.transcriptLink}>Transcript</a>
                            </TableCell>
                            <TableCell>
                              <a href={note.commentsLink}>Comments</a>
                            </TableCell>
                            <TableCell>
                              <a href={note.soapNoteLink}>SOAP Note</a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
