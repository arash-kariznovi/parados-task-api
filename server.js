const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/file-routes')
const HttpError = require('./models/http-error')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', fileRoutes)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' })
})

app.listen(PORT, () => {
  console.log('listening to port', PORT)
})
