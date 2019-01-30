const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const graphqlHTTP = require('express-graphql')
const massive = require('massive')
// Import this after exporting schema and root
const gqlConfigs = require('./graphqlConfigs')

// Nothing new so far here. Let's go ahead and connect to our databse. Make sure your connection string is in the .env file. As always, you should put this file in the root directory of the project and add it to you gitignore - unless you want random wackos filling your database with links to their latest scamming project!
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    // Run this initialization to fill out some tables in your database, and then delete or comment it after it finishes.
    // dbInstance.init()

    // Normally here we would do app.set('db', dbInstance). app.set() is a built-in express tool to store values without setting global variables. Pretty handy, but it won't work for us here because our app isn't going to use a request/response (req, res) system. Instead, we will use Node's export system. We have seen controller files default exporting objects, but you can actually define any export you want to.
    exports.database = dbInstance
    console.log('Connected to database ⌨')
}).catch(error => console.log('------------ MASSIVE error', error))


// If we were using REST, we would line up our endpoints here. Im sure you've seen in your personal projects - with a big app, the list can be extremely long and hard to manage. So, let's configure graphQL instead!

// To let our front end communicate with our GraphQL server, we need to use this middleware package which configures CORS for us.
app.use(cors())

// The imported graphqlHTTP function creates an Express server running GraphQL
app.use('/graphql', graphqlHTTP({
    // These are the configurations for our GraphQL server. Schema expects a valid graphQL schema as its value, and rootValue expects resolvers for the schema. We will make these things in the next step. Finally, setting graphiql to true lets us use graphiql in the browser by going to localhost:4020(PORT NUMBER)/graphql.
    schema: gqlConfigs.schema,
    rootValue: gqlConfigs.root,
    graphiql: true
}))
// Fire the server up with `npm run nodemon`. That's a special command that has been added to the package.json to run nodemon and ignore the src folder. The server may bug out for now until we get everything coded out.
// Now, let's make our schema and resolvers. Head over to the graphqlConfigs file! => ./graphqlConfigs


const PORT = 4020
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT} 🌄`))