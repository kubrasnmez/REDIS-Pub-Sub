const client = require("../redis/index.js")

module.exports = (router) => {
    /*TEST */
    router.get('/redis/test', async (req, res) => {
        res.json({
            message: "Welcome to Redis Router"
        })
    })

    /* STRING */
    router.get('/redis/string', async (req, res) => {
        const KEY = 'string';
        let value = await client.get(KEY);
        if (!value) {
            console.log('Veri yazılıyor')
            const val = "Hello World!"
            const write = await client.set(KEY, val)
            if (write === 'OK') {
                value = val;
            }
        }
        res.json({
            message: "REDIS STRING",
            value: value
        })
    })

    /* HASH */
    router.get('/redis/hash', async (req, res) => {
        const KEY = "hash";
        let value = await client.hGetAll(KEY);

        if (Object.keys(value).length === 0) {
            console.log("Veri yazılıyor...");
            await client.hSet(KEY, 'name', 'John Doe');
            await client.hSet(KEY, 'age', 30);
            await client.hSet(KEY, 'pets', ['cat', 'dog']);
            await client.hSet(KEY, 'phoneNumber', "541-920-87-13");
        }
        res.json({
            message: 'Redis Hash',
            value: value
        })
    })

    /* LIST */
    router.get('/redis/list', async (req, res) => {
        const KEY = 'list';
        //await client.lPush(KEY, ['Arda', 'Sıla', 'Kerem']);
        //await client.lInsert(KEY, 'BEFORE', 'Sıla', 'Deniz');
        //await client.rPush(KEY, ['Kübra', 'Eda']);
        //await client.rPop(KEY);
        //await client.lPop(KEY);
        // const droppedLeft = await client.lPopCount(KEY, 1);
        // console.log(droppedLeft);

        // await client.lRem(KEY, 2, 'Arda');


        const value = await client.lRange(KEY, 0, -1);

        res.json({
            message: 'Welcome to List',
            value: value
        })

    })

    /* SET */
    router.get('/redis/set', async (req, res) => {
        const KEY = 'set';
        const value = await client.sMembers(KEY);

        if (value.length === 0) {
            console.log("Veri yazılıyor")
            await client.sAdd(KEY, [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
                'Monday'
            ])
        }
        res.json({
            message: "REDIS SET",
            value: value
        })
    })

    /*SORTED SET ZSETS */

    router.get('/redis/sorted-set', async (req, res) => {
        const KEY = 'sorted-set';

        await client.zAdd(KEY, [{
            score: "4",
            value: "Mehmet"
        },
        {
            score: "2",
            value: "Arda"
        }, {
            score: "1",
            value: "John"
        },
        {
            score: "3",
            value: "Ben"
        },
        ])

        const value = await client.zRange(KEY, 0, -1);

        res.json({
            message: 'REDIS ZSET',
            value: value
        })
    })

    /*JSON */
    router.get('/redis/json', async (req, res) => {
        const KEY = "json";
        let value = await client.json.get(KEY)


        if (!value) {
            console.log('Veri yazılıyor');
            const val = {
                name: 'John Doe',
                age: 30,
                pets: ['cat', 'dog'],
                phoneNumber: '5423-53312-32',
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    state: 'CA'
                }
            }

            const write = await client.json.set(KEY, '$', val);

            if (write === 'OK') {
                value = val
            }
        }

        res.json({
            message: 'REDIS JSON',
            value: value
        })
    })

    /* DELETION */

    router.get('/redis/delete-all', async (req, res) => {
        let KEY = 'string';
        await client.del(KEY);

        //path tanımlı
        KEY = 'json';
        await client.json.del(KEY, '$')

        res.json({
            message: 'Keys are deleted'
        })
    })

}