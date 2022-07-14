const client = require("../../redis/index.js");

const Publisher = async () => {
    const channel = "message";
    const data = {
        from: "Academy",
        to: "Kübra Sönmez",
        message: 'Test Message Successful'
    };

    await client.connect();
    await client.publish(channel, JSON.stringify(data));
}
Publisher().then(() => {
    console.log("Message Published")
}).catch(err => {
    console.log(err)
})