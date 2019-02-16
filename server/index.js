import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-github2'
import bodyParser from 'body-parser'

const app = express()

// requestでjsonを扱えるように設定
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// sessionの設定
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: 'auto'
  }
}))

// Passport.jsの設定
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile)
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    name: user.username,
    avatarUrl: user.photos[0].value
  })
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

app.get('/auth/login', passport.authenticate('github', { scope: ['user:email'] }))
app.get('/auth/callback',
  passport.authenticate('github'),
  (req, res) => {
    res.json({ user: req.user })
  }
)
app.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = {
  path: '/api',
  handler: app
}
