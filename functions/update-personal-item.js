const MongoClient = require('mongodb').MongoClient
const { MG_URL, MG_DB } = process.env

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const { item: { username, name }, updatedItem: { updatedName, updatedComment, updatedLinks }} = JSON.parse(event.body)

    const filter = {
        username,
        name
    }

    const update = {
        name: updatedName ? updatedName : '',
        comment: updatedComment ? updatedComment : '',
        links: updatedLinks ? updatedLinks : ''
    }

    try {
        const client = new MongoClient(MG_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        console.log("Connected correctly to db")

        const db = client.db(MG_DB)
        const Item = db.collection('items')

        await Item.updateOne(filter, { $set: update })
        const personalList = await Item.find({ username })
            .project({ name: 1, comment: 1, links: 1, _id: 0 })
            .sort({ index: 1 })
            .toArray()
        client.close()

        console.log("status: ", 200)
        return {
            statusCode: 200,
            body: JSON.stringify({ updated: true, personalList })
        }
    }
    catch (err) {
        console.log("status: ", 400)
        return {
            statusCode: 400,
            body: JSON.stringify({ updated: false, err })
        }
    }
}