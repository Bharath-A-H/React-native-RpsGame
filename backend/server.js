const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Array of possible choices
const choices = ['rock', 'paper', 'scissors'];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Rock Paper Scissors Game API');
});

// Route to instruct how to play the game
app.get('/play', (req, res) => {
    res.send('Use POST method to play the game by sending your choice in the request body.');
});

// Route to play the game - expects user's choice in request body
app.post('/play', (req, res) => {
    const userChoice = req.body.choice;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = '';
    let userScore = 0;
    let computerScore = 0;

    // Determine the game result
    if (userChoice === computerChoice) {
        result = 'draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'win';
        userScore = 1;
    } else {
        result = 'lose';
        computerScore = 1;
    }

    // Respond with game result
    res.json({ userChoice, computerChoice, result, userScore, computerScore });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
