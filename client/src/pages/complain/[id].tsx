import React, { useEffect } from 'react';
import HeaderText from '../../components/Base/HeaderText';
import Map from '../../components/Map';
import { useComplainQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

import { useRouter } from 'next/router';
import { setPulsatingMarker, setYellowDotMarker } from '../../utils/getMap';
import { connect, Provider } from 'react-redux';
import { store } from '../../store/store';
import { StoreStateI } from '../../store/reducers';
import Navbar from '../../components/Navbar';
import ComplainHelper from './ComplainHelper';

interface ComplainProps {}

const Complain: React.FC<ComplainProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  // useEffect(() => {
  //   if (data && isMapLoaded) {
  //     setPulsatingMarker(data.complain.latitude, data.complain.longitude);
  //   }
  // }, [isMapLoaded]);

  const { data, loading } = useComplainQuery({
    variables: { id: parseInt(id as string) },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !data) {
    return <div>The post does not exist</div>;
  }
  // if (data && isMapLoaded) {
  //   setPulsatingMarker(data.complain.latitude, data.complain.longitude);
  // }
  if (!data.complain) {
    return <div>An Error Occured</div>;
  }
  return (
    <div>
      <div>
        <Navbar />
        <HeaderText>{data.complain.title}</HeaderText>
        <div className="flex">
          {data && (
            <ComplainHelper
              latitude={data.complain.latitude}
              longitude={data.complain.longitude}
            />
          )}
          <div className="w-full border-b-2  border-black ml-4">
            <div className="flex  border-t-2 border-black mt-4  w-full">
              <div className="mr-4 mb-10 mt-10">
                <h3 className="text-lg font-semibold">Ward Number:</h3>
                <h3 className="text-lg font-semibold">Category:</h3>
                <h3 className="text-lg font-semibold">Created At:</h3>
                <h3 className="text-lg font-semibold">Posted By:</h3>
                <h3 className="text-lg font-semibold">Username:</h3>
                <h3 className="text-lg font-semibold">Phone Number:</h3>
                <h3 className="text-lg font-semibold">Email:</h3>
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-semibold">
                  {data.complain.wardNo}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.category}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.createdAt}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.firstname}{' '}
                  {data.complain.user.user.lastname}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.username}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.phonenumber}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.email}
                </h3>
              </div>
            </div>
            <p className="md:text-lg">{data.complain.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WithProvider: React.FC<ComplainProps> = ({}) => {
  return (
    <Provider store={store}>
      <Complain />
    </Provider>
  );
};

export default withApollo({ ssr: true })(WithProvider);
