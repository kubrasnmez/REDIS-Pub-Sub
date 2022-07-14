const client = require("../../redis/index.js");

const SubscribeAndUnSubscribe = async () => {
    const channel = "message";
    await client.connect();
    await client.subscribe(channel, (messageStr) => {
        const message = JSON.parse(messageStr);

        console.log("Sender:", message.from);
        console.log("Receiver:", message.to);
        console.log("Message:", message.message);
        console.log("-----------------------------")
    })

    let i = 0;
    const wait = 30;
    console.log("Subscriber started, will be down in 30 second");

    const timer = setInterval(() => {
        i++;
        console.log(wait - i, 'seconds left');
    }, 1000);

    const waited = await new Promise((resolve, reject) => {
        setTimeout(() => {
            clearInterval(timer);
            resolve(true)
        }, wait * 1000)
    })

    if (waited === true) {
        await client.unsubscribe(channel);
        console.log("Stopped SubScribing")
    }
}

SubscribeAndUnSubscribe().then(() => {
}).catch((err) => {
    console.log(err)
})