import { withApollo } from '../utils/withApollo';
import React, { useEffect, useState } from 'react';
import HeaderText from '../components/Base/HeaderText';
import NextButton from '../components/buttons/NextButton';
import InputField from '../components/InputField';
import {
  ComplainInput,
  useCreateComplainMutation,
  useLoginMutation,
} from '../generated/graphql';
import Navbar from '../components/Navbar';
import construction from '../assests/Asset 1.png';
import Image from 'next/image';

import { Formik, Form } from 'formik';
import Router from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import SelectCategory from '../components/SelectCategory';
import SelectWard from '../components/SelectWard';
import TextArea from '../components/TextArea';

interface CreateComplainProps {}

interface FormValuesType {
  category: 'Category' | 'Sewage' | 'Road' | 'Electricity' | 'Water';
  title: string;
  description: string;
  wardNo: 'Ward No.' | number;
}

interface AtlasWindow extends Window {
  atlas: any;
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
    zoom: 13,
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

  //Wait until the map resources are ready.
  map.events.add('ready', function () {
    //Create a marker and add it to the map.
    if (document.querySelector('.azure-map-copyright')) {
      //@ts-ignore
      document.querySelector('.azure-map-copyright').style.display = 'none';
    }
    let marker = new atlas.HtmlMarker({
      position: [85.32767705161245, 27.705308474955412],
    });
    map.markers.add(marker);

    //When the map is clicked, animate the marker to the new position.
    map.events.add('click', function (e: any) {
      map.markers.remove(marker);
      marker = new atlas.HtmlMarker({
        position: e.position,
      });
      longitude = e.position[0];
      latitude = e.position[1];
      console.log(longitude, latitude);
      map.markers.add(marker);
    });
  });
}

const CreateComplain: React.FC<CreateComplainProps> = ({}) => {
  const [createComplain] = useCreateComplainMutation();
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
        onLoad={GetMap}
        type="text/javascript"
        src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"
      ></Script>
      <Navbar />
      <HeaderText>Report a problem</HeaderText>
      <div className="flex justify-between ">
        <div className="h-3/6 w-3/6 md:ml-10">
          <div
            id="myMap"
            style={{
              width: '500px',
              height: '500px',
            }}
          ></div>
        </div>
        <div className="w-full md:w-3/6">
          <Formik
            initialValues={
              {
                category: 'Category',
                wardNo: 'Ward No.',
                title: '',
                description: '',
              } as FormValuesType
            }
            onSubmit={async (values: FormValuesType, { setErrors }) => {
              if (values.category === 'Category') {
                console.log('ran');
                setErrors({
                  category: 'This field is required.',
                });
              } else if (!values.title) {
                setErrors({
                  title: 'Please enter the title.',
                });
              } else if (!values.description) {
                setErrors({
                  description: 'Please enter the description.',
                });
              } else if (values.wardNo === 'Ward No.') {
                setErrors({
                  wardNo: 'Please enter the Ward No.',
                });
              } else {
                const response = await createComplain({
                  variables: {
                    input: {
                      category: values.category,
                      description: values.description,
                      latitude,
                      longitude,
                      title: values.title,
                      wardNo: parseInt(values.wardNo.toString()),
                    } as ComplainInput,
                  },
                });
                console.log(response);
                if (response.data.createComplain.id) {
                  Router.push('/');
                } else {
                  setErrors({
                    description: 'An error occured.',
                  });
                }
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => {
              return (
                <Form autoComplete="off">
                  <div>
                    <div className="mt-10">
                      <div className="flex justify-between ">
                        <div className="w-full ">
                          <SelectCategory name="category" />
                        </div>

                        <div className="w-full">
                          <SelectWard name="wardNo" />
                        </div>
                      </div>

                      <InputField
                        name="title"
                        key="title"
                        label="Title"
                        placeholder="Enter Title..."
                      />
                      <TextArea
                        name="description"
                        type="text-area"
                        key="description"
                        label="Description"
                        placeholder="Enter Description..."
                      />
                      <NextButton>Submit</NextButton>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(CreateComplain);
