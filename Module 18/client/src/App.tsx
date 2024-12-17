import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import { ApolloProvider } from '@apollo/client';
import client from './apollo/apolloClient.ts'; 

const App = () => {
  return <div>Hello, World!</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!); // Use createRoot for React 18+
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);