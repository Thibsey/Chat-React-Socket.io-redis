const express = require('express');
const config = require('./config.js');
const process = require('process');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient(config.redis_port, config.redis_host);
redisClient.set('REDIS_KEY', '0');


app.get('/', (req, res) => {
    redisClient.incr('REDIS_KEY');
    redisClient.get('REDIS_KEY', (err, reply) => {
        res.send("<html><head><title>Page" + "</title></head><body><h1>Our Redis and Express Web Applocation</h1>" + "Redis count: " + reply + "</body></html>");
        res.end();
    });
});

app.listen(8080, () => {
    console.log('Listening to port: 8080');
});
// app.listen(process.argv[2]);