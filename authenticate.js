const jwt = require('jsonwebtoken')
exports.authenticateToken = (req, res, next) => {
    // Get the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) 
        return res.sendStatus(401) // if there is no token
  
    jwt.verify(token, process.env.SECRET_KEY, (err,success) => {
      if (err) 
        return res.sendStatus(401) // access denied
      next() //serve the request
    })
  }