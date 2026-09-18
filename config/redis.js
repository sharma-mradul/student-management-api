const redis = require("redis");

const client = redis.createClient({
    url: "redis://localhost:6379"
}); //connect to redis running on my port 6379

client.on("error" , (err) => {
    console.log("Redis Error:" , err);
});

const connectRedis = async () => {
    await client.connect();
    console.log("Redis Connected");
};

module.exports = { client , connectRedis };