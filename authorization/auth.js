const redis = require('redis');

// create Redis client
const redisClient = redis.createClient(process.env.REDIS_URI);

const authorize = (req, res) => {
    const { authorization } = req.headers;
    console.log('received request: \n');
    console.log('authorization: \n', authorization);
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).json('Unauthorized');
        } else {
            console.log('reply: \n', reply);
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