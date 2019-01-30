// First, let's require buildASTSchema from graphql. AST stands for abstract syntax tree. What this basically means is that we will be building out a data structure until a final value is assigned for each branch.
const { buildASTSchema } = require('graphql')
// Now, we will get the gql tag to make sure VSCode doesn't start flipping out when we use graphql syntax.
const gql = require('graphql-tag')
// Finally, require the server index file so we have access to the database instance
const index = require('./index.js')

// Here is our export object
module.exports = {
// GraphQL can be implemented in any code, not just JavaScript. It technically has its own language, but it should feel pretty similar to JSON, minus the commas and required double quotes.

// In a GraphQL schema, we deal with different types. Let's start by making an OBJECT TYPE. This is the most basic component of a GraphQL schema, which just represents a kind of object you can fetch from your service, and what fields it has.
// => type Product {}

// GraphQL is similar to SQL in that you have to define what type of data will be held before you actually do it. In GraphQL, we call these 'SCALAR TYPES'. The default scalar types are Int, Float, String, Boolean, and ID, but you can make your own custom scalar types or put object types here as well. We can mark a scalar type as required by adding an exclamation point after it, like we did here on ID. Otherwise, this value is allowed to be null. The value for category is another OBJECT TYPE that we are about to make.

// Let's go ahead and make another OBJECT type for the other table in our database.
// => type ProductCategory {}

// The next type we will make is called a QUERY. This is a special OBJECT TYPE that defines an ENTRY POINT of every GraphQL query. Basically, this type will hold all of the information needed to request data from our previously written object types. The query will replace the GET requests we've been doing in REST.
// => type Query {}

// Putting square brackets around the value means that it will be a list (we can think of it as an array) of that value. For example, the PRODUCTS FIELD expects an array of PRODUCT types. PRODUCT_CATEGORIES expects a list of PRODUCTCATEGORY types, and none of those values can be null. When we want to query for a single piece of data, the product and product_category fields will be used. These both take in a parameter called id, with a value of a non-null ID. About what we'd expect, right? When we actually query the data, we will pass values to these parameters.

// Is everything making sense so far? We can't quite check for errors yet but we will be able to soon.

// There's another special OBJECT type called MUTATION. Can anyone guess what this one handles? It's in charge of mutating, or changing our data for us. This will replace the POST, PUT, and DELETE that we've worked with before. Just like Query, it also defines what is called an ENTRY POINT into the schema.
// => type Muation {}

// We are going to have two mutations. SubmitProduct will handle updating and adding new products, and deleteProduct will delete products. Mutations can take parameters just like we saw in our Query fields. The delete one is pretty simple. You pass in an id, and it will use that id to delete the right product. The submitProduct takes an input parameter though, with a REQUIRED VALUE (remember the exclamation point?) of 'updateProduct'. When GraphQL sees this, it will look for a type of updateProduct. It doesn't exist yet, so let's go make one!
// => input updateProduct {}

// If you notice, we didn't use the keyword 'type' to define updateProduct. INPUT is another special type that allows us to pass complex objects to other types. This is a perfect tool to use for Mutation types because we can give it all the information at once with an INPUT. The fields of updateProduct look pretty similar to Product, but we are requiring all of the values and just passing an integer into the category field since this information will be handled by our database.
    schema: buildASTSchema(gql`
        type Product {
            id: ID!
            name: String
            price: Float
            picture: String
            stock: Int
            category: ProductCategory
        }

        type ProductCategory {
            id: ID!
            name: String
            description: String
        }


        type Query {
            products: [Product]
            product(id: ID!): Product
            productCategories: [ProductCategory!]
            productCategory(id: ID!): ProductCategory
        }

        type Mutation {
            submitProduct(input: updateProduct!): Product
            deleteProduct(id: ID!): Product
        }

        input updateProduct {
            id: ID
            name: String!
            price: Float!
            picture: String!
            stock: Int!
            category: Int!
        }
    `),

    // Phew! We are all set with out GraphQL schema. 
    // => go to index.js and show that we are still missing the root

    // So we know we need a root object here, but what does all this 'root' and 'rootValue' mean in the context of GraphQL? Well, so far we have described our Schema (or how the data is going to be structured). But GraphQL still has no idea where the data is coming from. To handle this, we need to make what is called a RESOLVER FUNCTION for each ENTRY POINT into the schema. If you remember, the two entry points are Queries and Mutations. Basically, we need to fill up this 'root' object with resolver functions - one for each query or mutation that we described above. These functions are similar to the functions that we use in the second argument of our REST-ful endpoints, which a lot of people like to keep in a separate controller file.

    root: {
        // We will make the function async because we are going to be using a database call inside, which is a promise.
        products: async () => {
            // Set up a try/catch block to handle errors
            try {
                // Here we give the function access to the database instance that we exported in server/index => go to server/index and show
                const db = index.database
                // Now we await the result of our database call with a variable
                const products = await db.get_all_products().then(products => products)
                // When we console log products, we see that it's a list of all of our products, which is what we expected. However, there is an issue here. This whole 'products' method must return an object with KEYS THAT MATCH THE FIELD NAMES of type PRODUCT because we defined the result of this query to be a list of type Project. GraphQL is just smart enough to assign it all for us, as long as it matches. If you look at the console log closely, you will see that there is no 'category' key. We will need to restructure the data to put the category underscore keys into their own object on the product.
                console.log('------------ products', products)
                products.forEach(product => product.category = { id: product.category_id, name: product.category_name, description: product.category_description })
                return products
            } catch(error) {
                console.log('------------ error in products resolver', error)
                // When we get an error, we need to throw it so that we can see what is going on as part of the GraphQL response. When we throw it here, GraphQL will automatically catch it for us.
                throw new Error(error.message)
            }
        },
        // Awesome, now let's work on the query to retrieve a single product. The main difference in this one is that we need to pass an argument of id to the function. Resolver functions take an object as the first parameter, and this is where you can put the id in question.
        product: async ({ id }) => {
            try {
                const db = index.database
                // The rest of this is pretty similar to the resolver above, but there should only be one result so we don't need a forEach to configure the category key on the product object.
                const product = await db.get_product([id]).then(product => product[0])
                product.category = { id: product.category_id, name: product.category_name, description: product.category_description }
                return product
            } catch(error) {
                console.log('------------ error in product resolver', error)
                throw new Error(error.message)
            }
        },
        productCategories: async () => {
            try {
                const db = index.database
                // This database call returns a list of objects with keys that already match the ProductCategory fields, so there's no need for any extra work - we can just send it right along!
                const productCategories = await db.get_all_product_categories().then(categories => categories)
                return productCategories
            } catch(error) {
                console.log('------------ error in products resolver', error)
                throw new Error(error.message)
            }
        },
        productCategory: async ({ id }) => {
            try {
                const db = index.database
                // Pretty similar to the get single product resolver above
                const productCategory = await db.get_product_category([id]).then(category => category[0])
                return productCategory
            } catch(error) {
                console.log('------------ error in products resolver', error)
                throw new Error(error.message)
            }
        },
        // Ok, this one is our update/delete resolver and it will be a little different. Just like the parameters before, we use an object but this time it's the input obejct generated by our INPUT TYPE UPDATEPRODUCT. We can name the parameters the same as the fields on updateProduct for clarity.
        submitProduct: async ({ input: { id, name, price, picture, stock, category }}) => {
            try {
                const db = index.database
                // Let's do something cool here and configure this resolver to handle both updates and deletes based on whether or not it is provided an id.
                if(id) {
                    const updatedProduct = await db.update_product({ id, name, price, picture, stock, category }).then(updated => updated[0])
                    // We run into the same issue here with the category key. If you inspect the database file being called, you can see it is because of a join statement.
                    updatedProduct.category = { id: updatedProduct.category_id, name: updatedProduct.category_name, description: updatedProduct.category_description }
                    return updatedProduct
                } else {
                    const newProduct = await db.add_product({ name, price, picture, stock, category }).then(user => user[0])
                    newProduct.category = { id: newProduct.category_id, name: newProduct.category_name, description: newProduct.category_description }
                    return newProduct
                }
            } catch(error) {
                console.log('------------ error in newProduct resolver', error)
                throw new Error(error.message)
            }
        },
        // Here in this resolver we will simply pass an id in an object as above, but delete this product
        deleteProduct: async ({ id }) => {
            try {
                const db = index.database
                const deleteResponse = await db.delete_product([id]).then(response => response)
                return deleteResponse
            } catch(error) {
                console.log('------------ error in newProduct resolver', error)
                throw new Error(error.message)
            }
        },
    }
}

// Holy cow. Give yourself a pat on the back! You just made your first GraphQL server! Now comes the fun part where we get to reap the rewards of our work here. Make sure your server is running with npm run nodemon, and let's make sure everyone is on track.

// Cool, now let's check out what this GraphiQL is all about! Remember how we set that to true in our index?
// => README GraphiQL