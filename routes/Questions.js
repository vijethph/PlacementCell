const express = require('express')
const questions = express.Router()
const cors = require('cors')
const authenticate = require("../authenticate")
const Quiz = require('../models/Quiz')
questions.use(cors())

questions.route('/')
.get((req,res) => {
  res.statusCode=401;
  res.end('Unauthorised');
})
.post(authenticate.authenticateToken,(req,res) =>{
   Quiz.find({})
   .then((question)=>{
        if(question){
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json(question);
        } else {
        res.send('Quiz questions are not available');
      }
   })
   .catch(err => {
    res.send('error: ' + err)
  })
})
.put((req,res) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /quiz');
})
.delete((req,res) => {
    res.statusCode=403;
    res.end('DELETE operation not supported on /quiz');
});



module.exports = questions;
