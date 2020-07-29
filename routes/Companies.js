const express = require('express')
const companies = express.Router()
const cors = require('cors')

const Company = require('../models/Company')
companies.use(cors())

companies.get('/details',(req,res) =>{
   Company.find({})
   .then((company)=>{
        if(company){
          //res.statusCode=200;
          //res.setHeader('Content-Type','application/json');
          res.json(company);
        } else {
        res.send('Company does not exist');
      }
   })
   .catch(err => {
    res.send('error: ' + err)
  })
})

companies.post('/',(req,res) => {
    res.statusCode=403;
    res.end('POST operation not supported on /registrations');
})
companies.put('/',(req,res) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /registrations');
})
companies.delete('/',(req,res) => {
    res.statusCode=403;
    res.end('DELETE operation not supported on /registrations');
});



module.exports = companies;
