import React, { Component } from 'react';

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
                                <button>Delete</button>
                            </ React.Fragment>
                        }
                        {editing && 
                            <React.Fragment>
                                <button>Submit</button>
                                <button onClick={() => this.setState({ editing: false })}>Cancel</button>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}