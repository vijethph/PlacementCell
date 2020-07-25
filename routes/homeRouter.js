const express = require('express')
const homeRouter = express.Router()
const cors = require('cors')

const Registration = require('../models/Registration')
homeRouter.use(cors())

homeRouter.route('/')
.get((req,res,next) =>{
   Registration.find({})
   .then((registrations)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(registrations);
   })
   .catch(err => {
    res.send('error: ' + err)
  })
})

.post((req,res) => {
    res.statusCode=403;
    res.end('POST operation not supported on /registrations');
})
.put((req,res) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /registrations');
})
.delete((req,res) => {
    res.statusCode=403;
    res.end('DELETE operation not supported on /registrations');
});



module.exports = homeRouter;
