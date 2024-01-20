const express = require('express')
const fileRoutes = require('./routes/file-routes')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', fileRoutes)

app.listen(PORT, () => {
  console.log('listening to port', PORT)
})
