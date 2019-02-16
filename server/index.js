import express from 'express'

const app = express()

app.get('/hello', (req, res) => {
  res.send('world')
})

module.exports = {
  path: '/api',
  handler: app
}
