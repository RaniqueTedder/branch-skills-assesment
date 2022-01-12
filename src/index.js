import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Edit } from './Edit';
import { Home } from './Home';
import { ALL_USERS_QUERY } from './queries';



const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  },
  defaultOptions: { watchQuery: { fetchPolicy: 'no-cache' } }
});



const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  

  return (
    <main>
      <Routes>
        <Route path='/' element={<Home data={data} />} />
        <Route path='/edit/:email' element={<Edit data={data} />} />
      </Routes>
    </main>
  );
}

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

