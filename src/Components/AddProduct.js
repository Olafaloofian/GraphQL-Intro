import React, { Component } from 'react';

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
                                <div>
                                    <button>
                                        Submit
                                    </button>
                                </div>
                        <button onClick={() => this.setState({ editing: false })}>Cancel</button>
                    </div>
                }
            </div>
        );
    }
}