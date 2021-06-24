const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const { db, saltRounds, secretOrPrivateKey } = require('../conf');

router.post('/signup', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, parseInt(saltRounds));
  const sql = 'INSERT INTO users SET ?';
  const sqlFields = req.body;
  try {
    const [results] = await db.query(sql, sqlFields);
    const id = results.insertId;
    req.body.id = id;
    req.body.isStaff = 0;
    delete req.body.password;
    const token = jwt.sign(req.body, secretOrPrivateKey);
    res.json({ user: req.body, token: token });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/login', passport.authenticate('local'), async (req, res) => {
  const token = jwt.sign(JSON.stringify(req.user), secretOrPrivateKey);
  res.json({ user: req.user, token: token });
});

module.exports = router;
