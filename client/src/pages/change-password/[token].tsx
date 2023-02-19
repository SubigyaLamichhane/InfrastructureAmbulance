import { NextPage } from 'next';

import { withApollo } from '../../utils/withApollo';

const ChangePassword: NextPage = () => {
  return <div>get</div>;
};

export default withApollo({ ssr: false })(ChangePassword);
