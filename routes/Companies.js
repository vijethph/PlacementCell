const express = require('express')
const companies = express.Router()
const cors = require('cors')
const authenticate = require("../authenticate")
const Company = require('../models/Company')
companies.use(cors())

companies.get('/',(req,res) => {
  res.statusCode=401;
  res.end('Unauthorised');
})
companies.post('/companies/details',authenticate.authenticateToken,(req,res) =>{
   Company.find({})
   .then((company)=>{
        if(company){
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json(company);
        } else {
        res.send('Company does not exist');
      }
   })
   .catch(err => {
    res.send('error: ' + err)
  })
})
companies.put('/',(req,res) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /companies');
})
companies.delete('/',(req,res) => {
    res.statusCode=403;
    res.end('DELETE operation not supported on /companies');
});



module.exports = companies;
