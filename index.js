const express = require('express');
const cors = require('cors');
const passport = require('passport');
const app = express();
const { backendPort, frontendUrl } = require('./conf');
require('./strategies');

app.use(passport.initialize());
app.use(express.json());
app.use(cors({ credentials: true, origin: frontendUrl }));

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/auth', require('./routes/auth'));
app.use('/characters', require('./routes/characters'));

app.get('/testprotected', passport.authenticate('jwt'), (req, res) => {
  res.send(`Welcome, ${req.user.displayName}`);
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(backendPort, () => {
  console.log('API is up!');
});
