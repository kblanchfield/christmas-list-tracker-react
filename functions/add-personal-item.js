const MongoClient = require('mongodb').MongoClient
const { MG_URL, MG_DB } = process.env

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const { item: { username, name, comment, links, bought } } = JSON.parse(event.body)

    try {
        const client = new MongoClient(MG_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        console.log("Connected correctly to db")

        const db = client.db(MG_DB)
        const Item = db.collection('items')

        await Item.insertOne({ username, name, comment, links, bought })
        const personalList = await Item.find({ username: username }).project({ username: 1, name: 1, comment: 1, links: 1, _id: 0 }).toArray()
        client.close()
    
        console.log("status: ", 200)
        return {
            statusCode: 200,
            body: JSON.stringify({ created: true, personalList: personalList })
        }
    }
    catch (err) {
        console.log("status: ", 400)
        return {
            statusCode: 400,
            body: JSON.stringify({ created: false, err })
        }
    }
}