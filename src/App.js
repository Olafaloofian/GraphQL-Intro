import React, { Component } from 'react';
import logo from './logo.svg';
import ProductDashboard from './Components/ProductDashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="outer-container">
        <ProductDashboard />
      </div>
    );
  }
}

export default App;
