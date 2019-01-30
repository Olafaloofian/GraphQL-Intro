import React, { Component } from 'react';
import Card from './Card'
import AddProduct from './AddProduct'


export default class ProductDashboard extends Component {
    state = {
        products: []
    }

    render() {
        return (
            <div className='dashboard-container'>
                <AddProduct />
                <Card />
            </div>
        );
    }
}