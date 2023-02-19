import React from 'react';

import { Provider } from 'react-redux';
import WardHelper from './WardHelper';
import { store } from '../../../store/store';
import { withApollo } from '../../../utils/withApollo';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <div className="">
      {
        //@ts-ignore
        <WardHelper />
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

export default withApollo({ ssr: false })(WithProvider);
