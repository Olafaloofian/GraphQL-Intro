import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { GET_PRODUCTS } from './ProductDashboard';
import { NEW_PRODUCT } from './AddProduct'
import gql from 'graphql-tag'

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            name
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
                                <Mutation
                                    mutation={DELETE_PRODUCT}
                                    refetchQueries={[{ query: GET_PRODUCTS }]}
                                >
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
                                    mutation={NEW_PRODUCT}
                                    refetchQueries={[{ query: GET_PRODUCTS }]}
                                >
                                    {(updateProduct, {loading, error }) => (
                                        <button onClick={() => {
                                            updateProduct({
                                                variables: {
                                                    input: {
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