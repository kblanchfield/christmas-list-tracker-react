const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt-nodejs')
const { MG_URL, MG_DB } = process.env

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const { username, password } = JSON.parse(event.body)

    try {
        const client = new MongoClient(MG_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect()
        console.log("Connected correctly to db")

        const db = client.db(MG_DB)
        const User = db.collection('users')

        const user = await User.findOne({ username: username })
        console.log("User found: ", user)
        client.close()

        if (user && bcrypt.compareSync(password, user.password)) {
            return {
                statusCode: 200,
                body: JSON.stringify({ id: user._id, name: user.username, accessToken: user.accessToken })
            }
        } else {
            return {
                statusCode: 400,
                body: "Username or password not found"
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ err })
        }
    }

}
