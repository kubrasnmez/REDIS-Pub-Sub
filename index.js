
const mongoose = require("mongoose");
const express = require('express');
const helmet = (require('helmet'));

const Models = (require('./mongodb/index.js'));

const ExampleDataFormation = require('./mongodb/data/index.js');

const RouterFns = require('./routes/index.js');

const app = express();

const router = express.Router();

const client = require("./redis/index.js");
const cron = require("node-cron");

let redisConnected = false, mongoDbConnected = false;

const RedisUsersCacheWorker = require("./workers/RedisUserCacheWorker.js");

RouterFns.forEach((routerFn, index) => {
    routerFn(router);

})


app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: '1mb'
}))


app.get('/test', async (req, res) => {
    res.json({
        test: "successful",
        createdAt: new Date().toUTCString()
    })
});

app.use("/api", router);

client.on('connect', () => {
    console.log("Redis Client Connected");
})

client.on('error', (err) => {
    console.log("Redis Client Error", err)
})

client.connect().then(() => {
    console.log("REDIS CLIENT CONNECTED")
    redisConnected = true;
}).catch(err => {
    console.log(err)
})

mongoose.connect("mongodb+srv://redis:1EeYPckGXp7FdShO@cluster0.i5fbo.mongodb.net/redis?retryWrites=true&w=majority").then(async () => {
    console.log("MONGODB CONNECTED");
    mongoDbConnected = true;
    //await ExampleDataFormation();
}).catch(err => {
    console.log(err)
});

// cron.schedule('* * * * *', () => {
//     console.log("Redis Connected:", redisConnected);
//     console.log("MongoDb Connected:", mongoDbConnected);

//     if (redisConnected && mongoDbConnected) {
//         RedisUsersCacheWorker().then((res) => {
//             if (res) {
//                 console.log("Users are synchronized with Redis Cache System")
//             }

//         }).catch((err) => {
//             console.log(err);
//         })
//     }
//     else {
//         console.log("You cant run the worker because of connection not established")
//     }

// })

app.listen(80, () => {
    console.log('Express sunucusu 80. port üzerinde çalışıyor.')
})