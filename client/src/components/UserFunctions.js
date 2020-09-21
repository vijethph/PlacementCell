import axios from 'axios'
import jwt_decode from 'jwt-decode'
export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCompanies = company => {
  const token = localStorage.usertoken
    return axios
        .post('companies/details',{},{
          headers:{
            Authorization:"bearer "+token //This is format for sending authorization header
          }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getVideos = video => {
    const token = localStorage.usertoken
  return axios
    .post('/videos', {},{
      headers:{
        Authorization:"bearer "+token
      }
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getQuestions = question => {
  const token = localStorage.usertoken
return axios
  .post('/quiz', {},{
    headers:{
      Authorization:"bearer "+token
    }
  })
  .then(response => {
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const postDiscussion = discussion =>{
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token)
    
  return axios
    .post('/discussion',{"title":discussion.title,"description":discussion.description,"first_name":decoded.first_name,"last_name":decoded.last_name,"email":decoded.email},{
      headers:{
        Authorization:"bearer "+token
      }
    })
    .then(response=>{
      console.log('Success')
      return response.data
    })
    .catch(err=>{
      console.log(err)
    })
}

export const getDiscussion = discussion =>{
  const token = localStorage.usertoken;
  return axios
    .get('/discussion',{
      headers:{
        Authorization:"bearer "+token
      }
    })
    .then(response=>{
      console.log(response)
      return response.data
    })
    .catch(err=>{
      console.log(err)
    })
}