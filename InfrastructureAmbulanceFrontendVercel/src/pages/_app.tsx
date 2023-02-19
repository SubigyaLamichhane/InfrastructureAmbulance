import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import theme from '../theme';
import '../styles/index.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import 'react-image-upload/dist/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ApolloProvider client={client}>
    <Provider store={store}>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </Provider>
    // </ApolloProvider>
  );
}

export default MyApp;
