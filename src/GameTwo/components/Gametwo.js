import React, { useState } from 'react';
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
} from '@mui/material';
import { ArrowBack, Menu } from '@mui/icons-material';

const WordGame = () => {
  const wordsToFind = ['PEG', 'HER', 'REP', 'REG', 'CEE', 'NEP', 'HEN', 'REC', 'GEE', 'PEE'];
  const [wordCount, setWordCount] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [selectedLetters, setSelectedLetters] = useState('');
  const [submittedWords, setSubmittedWords] = useState([]);
  const [showSubmittedWords, setShowSubmittedWords] = useState(false);

  const handleLetterClick = (letter) => {
    if (currentWord.length < 3) {
      setCurrentWord((prevWord) => prevWord + letter);
      setSelectedLetters((prevLetters) => prevLetters + letter);
    }
  };

  const handleWordSubmit = () => {
    const isWordToFind = wordsToFind.includes(currentWord);
    setSubmittedWords((prevWords) => [...prevWords, { word: currentWord, isMatch: isWordToFind }]);
    if (isWordToFind) {
      setWordCount(wordCount + 1);
    }
    setCurrentWord('');
    setSelectedLetters('');
  };

  const resetWord = () => {
    setCurrentWord('');
    setSelectedLetters('');
  };

  const showWordsDialog = () => {
    setShowSubmittedWords(true);
  };

  const handleCloseWordsDialog = () => {
    setShowSubmittedWords(false);
  };

  return (
    <>
      <div style={{ backgroundColor: '#6A0DAD' }}>
        <AppBar position="static" sx={{ backgroundColor: '#6A0DAD' }}>
          <Toolbar>
            <IconButton color="inherit">
              <ArrowBack />
            </IconButton>
            <IconButton color="inherit">
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin:'1rem'
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(77, 175, 164)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                  }}
                >
                  <Typography variant="h4">{wordCount}/10</Typography>
                </div>
              </div>
            </div>
        <Container maxWidth="sm" >
          <Paper elevation={1} sx={{border:'2px solid white',borderRadius:'5px'}} >
           
            <Typography variant="h6">{selectedLetters}</Typography>
            <Typography variant="h5" sx={{ mt: 2, textAlign: 'center',}}>
              Make a Word
            </Typography>
            <div
              style={{
                borderRadius: '10px',
                marginTop: '10px',
                display: 'flex',
                flexWrap: 'wrap',
               
              }}
            >
              {['N', 'G', 'R', 'H', 'P', 'E', 'E', 'C'].map((letter) => (
                <Button
                  key={letter}
                  variant="outlined"
                  color={currentWord.includes(letter) ? 'primary' : 'inherit'}
                  sx={{ width: '25%', borderRadius: 0, border:'2px solid ', borderColor: '#6A0DAD', padding:'1rem'}}
                  onClick={() => handleLetterClick(letter)}
                >
                  {letter}
                </Button>
              ))}
            </div>
            <Grid container spacing={0} width="100%"  >
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  sx={{ width: '100%',borderRadius: '10px',backgroundColor:'transparent',color:'black', borderRadius: 0,padding:'1rem', borderColor: '#6A0DAD', border:'2px solid #6A0DAD ' }}
                >
                  x
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  
                  onClick={handleWordSubmit}
                  sx={{ width: '100%', borderRadius: 0, borderColor: '#6A0DAD',padding:'1rem', border:'2px solid #6A0DAD ' }}
                  disabled={currentWord.length !== 3}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                variant="contained"
                 
                  onClick={resetWord}
                  sx={{ width: '100%',borderRadius: '1rem',backgroundColor:'transparent',color:'black',padding:'1rem', borderRadius: 0, borderColor: '#6A0DAD', border:'2px solid #6A0DAD ' }}
                >
                  l
                </Button>
                <div></div>
              </Grid>
            </Grid>
           
          </Paper>
        </Container>
      </div>
<div > <Button
              variant="outlined"

              onClick={showWordsDialog}
              sx={{ width: '30%', marginTop: '10px',backgroundColor:'white' ,marginLeft:'1.2rem',padding:'0px' }}
            >
              Words Found
            </Button></div>
      <Dialog open={showSubmittedWords} onClose={handleCloseWordsDialog}>
        <DialogTitle>Submitted Words</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
              {submittedWords.map((submittedWord, index) => (
                <ListItem key={index}>
                  {submittedWord.word} - {submittedWord.isMatch ? 'Match' : 'No Match'}
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WordGame;
