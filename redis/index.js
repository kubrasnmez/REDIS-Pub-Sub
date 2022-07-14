const redis = require("redis");

const url = "redis://default:BTTAQt1yfba5bfrgqZyZDWuDHWXCgsmJ@redis-10877.c300.eu-central-1-1.ec2.cloud.redislabs.com:10877";

const client = redis.createClient({
    url: url
})

module.exports = client;