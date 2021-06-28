const express = require('express');
const passport = require('passport');
const router = express.Router();
const { db } = require('../conf');
router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM characters';
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM characters WHERE id=?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

// ---------------- AUTH WALL ----------------
router.use(passport.authenticate('jwt'));
// ---------------- AUTH WALL ----------------

router.post('/', async (req, res) => {
  const sql = 'INSERT INTO characters SET ?';
  const sqlValues = [req.body];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE characters SET ? WHERE id=?';
  const sqlValues = [req.body, id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM characters WHERE id=?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
