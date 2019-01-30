import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_PRODUCTS } from './ProductDashboard'

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

export default class AddProduct extends Component {
    state = {
        editing: false,
        productProperties: ['name', 'picture', 'price', 'stock']
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                {!this.state.editing && <button onClick={() => this.setState(prevState => { return { editing: !prevState.editing } })}>New Product</button>}

                {this.state.editing && 
                    <div className="input-container">
                        {this.state.productProperties.map(val => (
                        <React.Fragment key={val}>
                            <input
                            type={val === 'price' || val === 'stock'? 'number': 'text'}
                            name={val}
                            onChange={this.handleInput}
                            placeholder={val.toUpperCase()}
                            />
                        </React.Fragment>
                        ))}
                        <select name="category" id="" onChange={this.handleInput}>
                            <option value={null}>Select Category</option>
                            <option value={1}>Toys</option>
                            <option value={2}>Tools</option>
                            <option value={3}>Clothing</option>
                        </select>
                        <Mutation
                            mutation={NEW_PRODUCT}
                            refetchQueries={[{ query: GET_PRODUCTS }]}
                            onCompleted={() => this.setState({ editing: false })}
                        >
                            {(addProduct, { loading, error }) => (
                                <div>
                                    <button
                                        onClick={() => {
                                        addProduct({
                                            variables: {
                                                input: {
                                                    name: this.state.name,
                                                    price: +(+this.state.price).toFixed(2),
                                                    picture: this.state.picture,
                                                    stock: +this.state.stock,
                                                    category: +this.state.category
                                                }
                                            }
                                        })
                                        }}
                                    >
                                        Submit
                                    </button>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :(</p>}
                                </div>
                            )}
                        </Mutation>
                        <button onClick={() => this.setState({ editing: false })}>Cancel</button>
                    </div>
                }
            </div>
        );
    }
}