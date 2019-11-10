const MongoClient = require('mongodb').MongoClient
const { MG_URL, MG_DB } = process.env

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const { username, name, comment, reserver, buyer, bought } = JSON.parse(event.body)

    const filter = {
        username,
        name,
        comment
    }
    const update = {
        reserver: reserver ? reserver : '',
        buyer: buyer ? buyer : '',
        bought
    }

    try {
        const client = new MongoClient(MG_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        console.log("Connected correctly to db")

        const db = client.db(MG_DB)
        const Item = db.collection('items')

        await Item.updateOne(filter, { $set: update })
        client.close()
    
        return {
            statusCode: 200,
            body: JSON.stringify({ updated: true })
        }
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ updated: false, err })
        }
    }
}