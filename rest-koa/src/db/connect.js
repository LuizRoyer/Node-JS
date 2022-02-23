const { MongoClient } = require('mongodb');

const url ='mongodb+srv://sys:sys@cluster0.juabi.azure.mongodb.net/NODESTR?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.log(err)
        client.close();
        process.exit(-1)
    }
    console.log("success connect the Mongo")
})

module.exports = client