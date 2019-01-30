import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { GET_PRODUCTS } from './ProductDashboard';
import gql from 'graphql-tag'

// This again is similar to a mutation we can run in GraphiQL, but this time we need to pass it variables. Similarly to how massive handles database manipulation, we can put dollar signs in the mutation to signify incoming variables. Next to the mutation name, we define the variable and the type, then we use that variable in the actual mutation right below it
export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            name
        }
    }
`;

export const NEW_PRODUCT = gql`
    mutation newProduct($input: updateProduct!) {
        submitProduct(input: $input) {
            id
            name
            price
            category {
                id
            }
        }
    }
`;


export default class Card extends Component {
    state = {
        editing: false,
        name: this.props.name,
        price: this.props.price,
        picture: this.props.picture,
        stock: this.props.stock
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        // We just passed a lot of props over here. Let's see what they are.
        console.log('------------ this.props', this.props)
        const { editing } = this.state
        const { id, name, price, picture, stock, category } = this.props
        return (
            <div className='product-card'>
                <img src={picture} alt="product" width='400'/>
                <div className='product-info'>
                    {editing ? 
                    <React.Fragment>
                        <input type="text" name='name' value={this.state.name} onChange={(e) => this.handleInput(e)}/>
                        <input type='text' name='picture' value={this.state.picture} onChange={(e) => this.handleInput(e)}/>
                        <div>
                            <input type="number" name='price' value={this.state.price} onChange={(e) => this.handleInput(e)}/>
                            <input type="number" name='stock' value={this.state.stock} onChange={(e) => this.handleInput(e)}/>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className='product-title'>{name}</div>
                        <div>
                            <span>Price: {price}</span><span>Stock: {stock}</span>
                        </div>
                    </React.Fragment>
                    }
                    <div>
                        {!editing && 
                            <React.Fragment>
                                <button onClick={() => this.setState({ editing: true })}>Edit</button>
                                {/* Okay, what we want to do here is set up our edit and delete button. Both of these will require us to mutate our data, so let's import Mutate from apollo. */}
                                <Mutation
                                // Pretty similar to the query so far. We need to define our mutation above. => mutation
                                // Another really cool thing we can do with apollo is set a query to run after the mutation finishes. In this case, we should import GET_PRODUCTS from the dashboard. The way you pass it in is kinda weird (it expects an array of defined object types), but it does beat having to reset state all the time.
                                    mutation={DELETE_PRODUCT}
                                    refetchQueries={[{ query: GET_PRODUCTS }]}
                                >
                                {/* The first parameter of our mutation child function will run the mutation for us. */}
                                    {(deleteProduct) => (
                                        <button onClick={() => {
                                            deleteProduct({
                                                variables: {
                                                    id
                                                }
                                            })
                                        }}>Delete</button>
                                    )}
                                </Mutation>
                            </ React.Fragment>
                        }
                        {editing && 
                            <React.Fragment>
                                <Mutation
                                // Let's make another mutation for editing the product.
                                    mutation={NEW_PRODUCT}
                                    refetchQueries={[{ query: GET_PRODUCTS }]}
                                >
                                {/* We can use the second parameter of the child function to handle loading and error. This should be an object for it to work right. */}
                                    {(updateProduct, {loading, error }) => (
                                        <button onClick={() => {
                                            updateProduct({
                                                variables: {
                                                    input: {
                                                        // We know GraphQL expects specific types of data, so we should configure our state values to match them.
                                                        id: +id,
                                                        name: this.state.name,
                                                        price: +(+this.state.price).toFixed(2),
                                                        picture: this.state.picture,
                                                        stock: +this.state.stock,
                                                        category: +category.id
                                                    }
                                                }
                                            })
                                        }}>Submit</button>
                                    )}
                                </Mutation>
                                <button onClick={() => this.setState({ editing: false })}>Cancel</button>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

// Nice! We made our product card! There's one more thing we should do: add the ability to make a new product. => AddProduct