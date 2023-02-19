import React from 'react';

import { Provider } from 'react-redux';
import IndexHelper from '../components/IndexHelper';
import { store } from '../store/store';
import { withApollo } from '../utils/withApollo';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <div className="">
      {
        //@ts-ignore
        <IndexHelper />
      }
    </div>
  );
};

const WithProvider: React.FC<IndexProps> = ({}) => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default withApollo({ ssr: true })(WithProvider);
