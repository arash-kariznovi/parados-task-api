const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/file-routes')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', fileRoutes)

app.listen(PORT, () => {
  console.log('listening to port', PORT)
})
