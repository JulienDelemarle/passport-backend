const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { db, secretOrPrivateKey } = require('./conf');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (formMail, formPassword, done) => {
      const sql =
        'SELECT id, email, password, displayName, avatar, isStaff FROM users WHERE email = ?';
      const sqlFields = [formMail];
      try {
        const [[results]] = await db.query(sql, sqlFields);

        if (!results.email) {
          throw new Error('wrong email');
        }

        if (!bcrypt.compareSync(formPassword, results.password)) {
          throw new Error('wrong password');
        }

        delete results.password;
        done(null, results);
      } catch (err) {
        console.log(err);
        done(err);
      }
      res.send(`Not yet! (${email})`);
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: secretOrPrivateKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (user, done) => {
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
