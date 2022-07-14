// const fetch = require("node-fetch");

// const msArr = [];
// const msCachedArr = [];

// const unCachedUrl = "http://localhost/api/cached/users";
// const cachedUrl = "http://localhost/api/cached/users-cached";

// const fetcher = async (cached = false) => {
//     const url = cached ? cachedUrl : unCachedUrl;
//     const date1 = new Date();

//     const response = await fetch(url);
//     const json = await response.json();
//     const date2 = new Date();

//     const ms = date2 - date1;
//     if (cached) {
//         msCachedArr.push(ms)
//     }
//     else {
//         msArr.push(ms)
//     }
// }

// const average = (arr) => {
//     const sum = arr.reduce((a, b) => {
//         return a + b
//     }, 0);
//     const length = arr.length;

//     return sum / length;
// }

// const length = 1000;
// const stopPoint = 1000;


// const stop = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(function () {
//             resolve()
//         });
//     }, 3000)
// }

// const start = async () => {
//     const finished = () => {
//         if (msArr.length === length) {
//             console.log("Finished Uncached Fetching");
//             startCached().then(() => {

//             }).catch((err) => {

//             })
//         }
//     }

//     for (let i = 0; i < length; i++) {
//         if (i % stopPoint === 0) {
//             await stop();
//         }

//         console.log("Fetching uncached", i + 1, "th data");
//         fetcher(false).then((data) => {
//             finished();
//         }).catch((err) => {
//             msArr.push(30000);
//             finished();
//         })
//     }

// }

// const startCached = async () => {
//     const finished = () => {
//         if (msCachedArr.length === length) {
//             console.log("Finished Uncached Fetching");
//             console.log("Average of Uncached Mongodb:", average(msArr));
//             console.log("Average of Cached Redis:", average(msCachedArr));
//         }
//     }

//     for (let i = 0; i < length; i++) {
//         if (i % stopPoint === 0) {
//             await stop();
//         }

//         console.log("Fetching cached", i + 1, "th data");
//         fetcher(true).then((data) => {
//             finished();
//         }).catch((err) => {
//             msCachedArr.push(30000);
//             finished();
//         })
//     }
// }

// start().then(() => {

// }).catch((error) => {

// })

const fetch = require('node-fetch');


const msArr = [];
const msCachedArr = [];

const fetcher = async (url) => {
    const date1 = new Date();
    const response = await fetch(url);
    const json = await response.json();
    const date2 = new Date();
    const ms = date2 - date1;
    msArr.push(ms);
    return json;
}

const fetcherCached = async (url) => {
    const date1 = new Date();
    const response = await fetch(url);
    const json = await response.json();
    const date2 = new Date();
    const ms = date2 - date1;
    msCachedArr.push(ms);
    return json;
}


const url = 'http://localhost/api/cached/messages';
const cachedUrl = 'http://localhost/api/cached/messages-cached';

const length = 500;

const stopPoint = 500;

const stop = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}

const startUnCached = async () => {
    for (let i = 0; i < length; i++) {
        if (i % stopPoint === 0) {
            await stop();
        }
        console.log('fetching uncached', i + 1, 'th data');
        fetcher(url).then(data => {
            if (msArr.length === length) {
                console.log('Finished Uncached');
                console.log("Average of UnCached MongoDb: ", msArr.reduce((a, b) => a + b, 0) / msArr.length);
                startCached().then(() => {

                })
            }
        }).catch(err => {
            msArr.push(30000);
            if (msArr.length === length) {
                console.log('Finished Uncached');
                console.log("Average of UnCached MongoDb: ", msArr.reduce((a, b) => a + b, 0) / msArr.length);
                startCached().then(() => {

                })
            }
            console.log(err);
        })

    }
}

const startCached = async () => {
    for (let i = 0; i < length; i++) {
        if (i % stopPoint === 0) {
            await stop();
        }
        console.log('fetching cached', i + 1, 'th data');
        fetcherCached(cachedUrl).then(data => {
            if (msCachedArr.length === length) {
                console.log('Finished All');
                console.log("Average of UnCached MongoDb: ", msArr.reduce((a, b) => a + b, 0) / msArr.length);
                console.log("Average of Cached MongoDb: ", msCachedArr.reduce((a, b) => a + b, 0) / msCachedArr.length);
            }
        }).catch(err => {
            msCachedArr.push(30000);
            if (msCachedArr.length === length) {
                console.log('Finished All');
                console.log("Average of UnCached MongoDb: ", msArr.reduce((a, b) => a + b, 0) / msArr.length);
                console.log("Average of Cached MongoDb: ", msCachedArr.reduce((a, b) => a + b, 0) / msCachedArr.length);
            }
            console.log(err);
        })
    }
}


startUnCached().then(() => {

})