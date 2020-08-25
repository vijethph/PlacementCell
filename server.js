var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'YOUR MONGO URI HERE'
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true,
    useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./routes/Users')
var Companies = require('./routes/Companies')
var Videos = require('./routes/Videos')

app.use('/users', Users)
app.use('/companies',Companies)
app.use('/videos',Videos)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
