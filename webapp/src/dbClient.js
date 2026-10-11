var redis = require("redis");
const configure = require('./configure');
const config = configure();

const redisUrl = process.env.REDIS_URL || `redis://${config.redis.host}:${config.redis.port}`;

var db = redis.createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 100, 3000)
    }
});

db.on('error', (err) => {
    console.error('Valkey/Redis Error:', err.message);
    if (err.code === 'CONNECTION_BROKEN') {
        console.log('Attempting to recover broken connection...');
    }
});

db.on('ready', () => console.log('Valkey is ready and connected!'));

module.exports = db;