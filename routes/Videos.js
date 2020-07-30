const express = require('express')
const videos = express.Router()
const cors = require('cors')
const authenticate = require("../authenticate")
const Video = require('../models/Video')
videos.use(cors())

videos.route('/')
.get((req,res) => {
    res.statusCode=401;
    res.end('Unauthorised');
})
.post(authenticate.authenticateToken,(req,res,next) =>{
   Video.find({})
   .then((videos)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(videos);
   })
   .catch(err => {
    res.send('error: ' + err)
  })
})

.put((req,res) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /videos');
})
.delete((req,res) => {
    res.statusCode=403;
    res.end('DELETE operation not supported on /videos');
});



module.exports = videos;
