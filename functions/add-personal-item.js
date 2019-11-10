const MongoClient = require('mongodb').MongoClient
const { MG_URL, MG_DB } = process.env

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const item = JSON.parse(event.body)

    try {
        const client = new MongoClient(MG_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        console.log("Connected correctly to db")

        const db = client.db(MG_DB)
        const Item = db.collection('items')

        await Item.insertOne(item)
        client.close()
    
        return {
            statusCode: 200,
            body: JSON.stringify({ created: true })
        }
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ created: false, err })
        }
    }
}