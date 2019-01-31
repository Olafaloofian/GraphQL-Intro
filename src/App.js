import React, { Component } from 'react';
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
