const { createClient } = require("redis"); //it gets redis creator from package we installed

const redisClient = createClient({
    url: "redis://localhost:6379"
}); //creates our redis client , 6379 is our default redis port

redisClient.on("error" , (err) => {
    console.log("Redis Client Error", err);
}); //if redis has a connection/client error then show it

const connectRedis = async () => {
    await redisClient.connect();     //actually extablishes the connection
    console.log("Redis connected");
};

module.exports = {
    redisClient,
    connectRedis
};