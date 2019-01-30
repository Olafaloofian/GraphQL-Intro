import React, { Component } from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Card from './Card'
import AddProduct from './AddProduct'

// Here is where GraphiQL comes in really handy. We can use it to test out our queries and put them here when we know they work. Let's query for all the products and specify the fields to return.
// => Query
export const GET_PRODUCTS = gql`
    query getProducts {
        products {
            id
            name
            price
            stock
            picture
            category {
                id
            }
        }
    }
`;

export default class ProductDashboard extends Component {
    state = {
        products: []
    }

    render() {
        console.log('------------ this.state', this.state)
        return (
            <div className='dashboard-container'>
                <AddProduct />
                {/* React apollo is pretty sweet, but in my opinion it is the most convoluted part of setting up GraphQL with React. If you haven't used package components before (like bootstrap), this may look a little odd to you. The general idea is that you wrap any part of your app needing access to GraphQL data in the correct apollo component. Here we need to get all of our products, so we should import and use QUERY. */}
                <Query query={GET_PRODUCTS}>
                {/* The QUERY component takes a query prop, which should be our actual GraphQL query. Let's define it above. => GET_PRODUCTS */}
                    {({ loading, error, data }) => {
                        // One of the super nice things about Apollo is that it handles loading of data for us. If we use the loading parameter property correctly, we can avoid setting up our own loading handler. Apollo also nicely handles errors.
                        if (loading) return <h1>Loading Data...</h1>;
                        if (error) return <h1>Error :(</h1>;
                        // Let's console log data to see if we are on the right track.
                        console.log('------------ data', data)
                        return (
                            <div>
                            {/* Cool, now that we have our data let's map them and return another component that will display the products nicely. => Card */}
                            {data.products.map((product, index) => <Card {...product} key={index} />)}
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}