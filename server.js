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

const mongoURI = 'mongodb://localhost:27017/college-mern'
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
var Questions = require('./routes/Questions');

app.use('/users', Users)
app.use('/companies',Companies)
app.use('/videos',Videos)
app.use('/quiz',Questions);

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
