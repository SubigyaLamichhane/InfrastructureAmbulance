import { withApollo } from '../../utils/withApollo';
import React, { useEffect, useState } from 'react';
import HeaderText from '../../components/Base/HeaderText';
import NextButton from '../../components/buttons/NextButton';
import InputField from '../../components/InputField';
import {
  ComplainInput,
  useComplainQuery,
  useCreateComplainMutation,
  useLoginMutation,
} from '../../generated/graphql';
import Navbar from '../../components/Navbar';
import construction from '../assests/Asset 1.png';
import Image from 'next/image';

import { Formik, Form } from 'formik';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import SelectCategory from '../../components/SelectCategory';
import SelectWard from '../../components/SelectWard';
import TextArea from '../../components/TextArea';
import atlas from 'azure-maps-control';

interface ComplainProps {}

interface AtlasWindow extends Window {
  atlas: any;
  map: any;
}

declare let window: AtlasWindow;

let latitude: number = 85.32767705161245;
let longitude: number = 27.705308474955412;

function GetMap() {
  //Initialize a map instance.
  let map: any;
  const atlas = window.atlas;
  map = new atlas.Map('myMap', {
    center: [85.32767705161245, 27.705308474955412],
    zoom: 15,
    view: 'Auto',
    style: 'satellite',
    showLogo: false,
    showFeedbackLink: false,
    //Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
    authOptions: {
      authType: 'subscriptionKey',
      subscriptionKey: 'Wsh5kbtxkT8Poz2ojh8uCMRLvZSMrp1MOP-VOdULq90',
    },
  });
  window.map = map;

  //Wait until the map resources are ready.
  map.events.add('ready', function () {
    //Create a marker and add it to the map.
    if (document.querySelector('.azure-map-copyright')) {
      //@ts-ignore
      document.querySelector('.azure-map-copyright').style.display = 'none';
    }
    // let marker = new atlas.HtmlMarker({
    //   position: [85.32767705161245, 27.705308474955412],
    // });
    // map.markers.add(marker);

    //When the map is clicked, animate the marker to the new position.
  });
}

const CreateComplain: React.FC<ComplainProps> = ({}) => {
  const [isMapLoaded, setIsMapLoaded] = useState<Boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, loading } = useComplainQuery({
    variables: { id: parseInt(id as string) },
  });

  const onMapLoad = () => {
    GetMap();
    setIsMapLoaded(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !data) {
    return <div>The post does not exist</div>;
  }
  if (data && isMapLoaded) {
    console.log('ran');
    let marker = new window.atlas.HtmlMarker({
      position: [latitude, longitude],
    });
    window.map.markers.add(marker);
  }
  if (!data.complain) {
    return <div>An Error Occured</div>;
  }
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css"
          type="text/css"
        />
      </Head>
      <Script
        onLoad={onMapLoad}
        type="text/javascript"
        src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"
      ></Script>
      <Navbar />
      <div>
        <HeaderText>{data.complain.title}</HeaderText>
        <div className="flex">
          <div className="">
            <div
              id="myMap"
              style={{
                width: '500px',
                height: '500px',
              }}
            ></div>
          </div>
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

export default withApollo({ ssr: false })(CreateComplain);
