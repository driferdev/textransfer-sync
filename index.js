const config = require('./config');
const redis = require('redis');
const sequelize = require('./Sequelize')();

const redisClient = redis.createClient(config.cache.port, config.cache.server);
const { promisify } = require("util");
const delAsync = promisify(redisClient.del).bind(redisClient);
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const Room = require('./models/Room');
const intervalTime = 5000;

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

const pluck = (array, key) => {
    return array.map((obj) => {
      return obj[key];
    });
}

let disableExpiredRooms = async () => {
    const [result, _] =  await sequelize.query(
            'SELECT name, id FROM room WHERE last_used < NOW() - INTERVAL 1 DAY AND active = 1'
        );
    if(result.length > 0) {
        const roomNames = pluck(result, 'name');
        await delAsync(roomNames);
        const roomIds = pluck(result, 'id');
        await sequelize.query(
            `UPDATE room set active = 0, updated_at = now() WHERE id in (${roomIds.join(',')})`
        );
    }
    console.log('Rooms disabled: ', result.length);

}

let worker = async () => {
    await disableExpiredRooms();
    setTimeout(worker, intervalTime);
}

let init = () => {
    worker();
}

init();