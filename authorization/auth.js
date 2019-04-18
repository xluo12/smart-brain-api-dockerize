const redisClient = require('../controllers/signin').redisClient;

const authorize = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).json('Unauthorized');
        } else {
            return res.status(200).json('Works!');
        }   
    })
}
const express = require('express');
const app = express();
app.get('/', authorize);
app.post('/', authorize);

app.listen(23456, ()=> {
  console.log('auth API is working!');
})