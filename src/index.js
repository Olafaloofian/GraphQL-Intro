import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Import these two things up top. We are going to be using 'react-apollo' and 'apollo-boost' to hook up our app into GraphQL
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Make sure the client uri uses the same server port that we are running on
const client = new ApolloClient({ uri: 'http://localhost:4020/graphql' });

ReactDOM.render(
    // Now wrap App with ApolloProvider
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
, document.getElementById('root'));

// Let's head to our components and start implementing our GraphQL stuff!
// => ProductDashboard.js

serviceWorker.unregister();
