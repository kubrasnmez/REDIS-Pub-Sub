module.exports = (router) => {
    router.get('/test', async (req, res) => {
        console.log("API ROUTER TEST")
        res.json({
            test: "successful",
            path: '/api/test',
            createdAt: new Date().toUTCString()
        })

    })
}