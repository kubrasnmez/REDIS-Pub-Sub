const client = require("../redis/index.js");

const Users = require("../mongodb/users.js");

const Messages = require("../mongodb/messages.js");
const { use } = require("express/lib/router/index.js");

module.exports = function (router) {
    router.get('/cached/users', async (req, res) => {
        const users = await Users.find({}).limit(50).lean();
        res.json({
            message: 'Not cached users',
            users: users
        })
    })

    /*Cached Users */

    router.get('/cached/users-cached', async (req, res) => {
        const cacheKey = "users/first50";
        let users = await client.get(cacheKey);

        if (!users) {
            users = await Users.find({}).limit(50).lean();
            await client.set(cacheKey, JSON.stringify(users));
        }
        else {
            users = JSON.parse(users);
        }
        res.json({
            message: 'Cached Users',
            users: users
        })
    })

    /*Absolute Timing */

    router.get('/cached/users-cached-absolute-expire', async (req, res) => {
        const cacheKey = 'users/expire/first50';
        let users = await client.get(cacheKey);

        if (!users) {
            users = await Users.find({}).limit(50).lean();

            await client.set(cacheKey, JSON.stringify(users), {
                EX: 60,
                NX: true,
                KEEPTTL: true
            })
        } else {
            users = JSON.parse(users);
        }

        res.json({
            message: 'CACHED USERS WITH ABSOLUTE TIMING',
            users: users
        })

    })

    /*Sliding Timing */

    router.get('/cached/users-cached-sliding-expire', async (req, res) => {
        const cacheKey = 'users/expire/first50';
        let users = await client.get(cacheKey);

        if (!users) {
            users = await Users.find({}).limit(50).lean();

            await client.set(cacheKey, JSON.stringify(users), {
                EX: 60,
                NX: true,
                KEEPTTL: true
            })
        } else {
            const GETEX_OLD = await client.ttl(cacheKey);
            console.log("Cache would have been expired in ", GETEX_OLD, "seconds")

            client.expire(cacheKey, 60).then(async () => {
                const GETEX_NEW = await client.ttl(cacheKey);
                console.log("Cache will expired in", GETEX_NEW, "seconds")
            }).catch(err => {
                console.log(err);
            })

            users = JSON.parse(users);
        }

        res.json({
            message: 'CACHED USERS WITH SLINDING TIMING',
            users: users
        })

    })

    router.get("/cached/messages", async (req, res) => {
        const messages = await Messages.find({}).populate(["from", "to"]).limit(50).lean();
        res.json({
            message: "NON-CACHED MESSAGES",
            messages: messages
        })
    })

    router.get("/cached/messages-cached", async (req, res) => {
        const cacheKey = "messages/1"
        let messages = await client.json.get(cacheKey);

        if (!messages) {
            console.log("Cache Adding")
            messages = await Messages.find({}).populate(["from", "to"]).limit(50).lean();
            await client.json.set(cacheKey, '$', messages)
        }

        res.json({
            message: "CACHED MESSAGES",
            messages: messages
        })
    })


}