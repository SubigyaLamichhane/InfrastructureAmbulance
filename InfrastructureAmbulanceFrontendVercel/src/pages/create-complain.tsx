import axios from 'axios';
import React, { useState } from 'react';
import HeaderText from '../components/Base/HeaderText';
import NextButton from '../components/buttons/NextButton';
import InputField from '../components/InputField';
import Navbar from '../components/Navbar';
import ImageUploader from 'react-image-upload';
import {
  ComplainInput,
  ComplainsByUserDocument,
  ComplainsDocument,
  ComplainsQuery,
  useCreateComplainMutation,
} from '../generated/graphql';
import { client, withApollo } from '../utils/withApollo';

import { Form, Formik } from 'formik';
import Router from 'next/router';
import { Provider } from 'react-redux';
import SelectCategory from '../components/SelectCategory';
import SelectWard from '../components/SelectWard';
import TextArea from '../components/TextArea';
import { store } from '../store/store';
import { Image, CloudinaryContext } from 'cloudinary-react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface CreateComplainProps {}

interface FormValuesType {
  category: 'Category' | 'Sewage' | 'Road' | 'Electricity' | 'Water';
  title: string;
  description: string;
  wardNo: 'Ward No.' | number;
}

interface CloudinaryResponse {
  public_id: string;
  height: number;
  url: string;
  placeholder: string | false;
  original_filename: string;
}

let latitudeAndLongitudeActual: {
  latitude: number | null;
  longitude: number | null;
} = {
  latitude: null,
  longitude: null,
};

const CreateComplain: React.FC<CreateComplainProps> = ({}) => {
  const [createComplain] = useCreateComplainMutation();
  const [imagePublicId, setImagePublicId] = useState('');
  const [imageSelected, setImageSelected] = useState<FileList[0]>();
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY);
    const response: { data: CloudinaryResponse } = await axios.post(
      'https://api.cloudinary.com/v1_1/infrastructure-ambulance/image/upload',
      formData
    );

    setImagePublicId(response.data.public_id);
  };

  const [latitudeAndLongitude, setLatitudeAndLongitude] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  return (
    <div>
      <Navbar />
      <HeaderText>Report a problem</HeaderText>
      <div className="flex justify-between mt-4">
        {
          //@ts-ignore
        }
        <Map
          complains={[
            {
              id: 'create-complain',
            },
          ]}
          latlng={[
            latitudeAndLongitude.latitude,
            latitudeAndLongitude.longitude,
          ]}
          onClick={(e: any) => {
            latitudeAndLongitudeActual = {
              latitude: e.latlng.lat,
              longitude: e.latlng.lng,
            };
            setLatitudeAndLongitude({
              latitude: e.latlng.lat,
              longitude: e.latlng.lng,
            });
            console.log(latitudeAndLongitudeActual);
          }}
        />

        <div className="w-full md:w-3/6 ml-10">
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
                //@ts-ignore
                // } else if (!window.latitude && !window.longitude) {
                //   setErrors({
                //     description: 'Please enter the location on the map',
                //   });
              } else if (!imagePublicId) {
                setErrors({
                  description: 'Select at least one image',
                });
              } else if (!latitudeAndLongitudeActual.latitude) {
                setErrors({
                  description: 'Select the location on the map',
                });
              } else {
                const response = await createComplain({
                  variables: {
                    input: {
                      category: values.category,
                      description: values.description,
                      //@ts-ignore
                      // latitude: window.latitude,
                      //@ts-ignore
                      // longitude: window.longitude,
                      latitude: latitudeAndLongitudeActual.longitude,
                      longitude: latitudeAndLongitudeActual.latitude,
                      title: values.title,
                      wardNo: parseInt(values.wardNo.toString()),
                      imagePublicId,
                    } as ComplainInput,
                  },
                  update: (store, { data }) => {
                    // const complainsData = store.readQuery<ComplainsQuery>({
                    //   query: ComplainsDocument,
                    // });
                    let complainsData = store.readQuery<ComplainsQuery>({
                      query: ComplainsDocument,
                      variables: {
                        limit: 15,
                        cursor: null,
                      },
                    });

                    if (complainsData) {
                      store.writeQuery<ComplainsQuery>({
                        query: ComplainsDocument,
                        data: {
                          complains: {
                            ...complainsData.complains,
                            complains: [
                              data.createComplain,
                              ...complainsData.complains.complains,
                            ],
                          },
                        },
                        variables: {
                          limit: 15,
                          cursor: null,
                        },
                      });
                      complainsData = store.readQuery<ComplainsQuery>({
                        query: ComplainsDocument,
                        variables: {
                          limit: 15,
                          cursor: null,
                        },
                      });
                      console.log(complainsData);
                    }
                  },
                });
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
                      <div>
                        <label id="file_uploader">
                          <input
                            type="file"
                            name="upload"
                            onChange={(e) =>
                              setImageSelected(e.target.files[0])
                            }
                            accept="image/*"
                            id="file_uploader"
                            placeholder="Pictures can help us identify issues"
                          ></input>
                          <button type="button" onClick={uploadImage}>
                            Upload Image
                          </button>
                        </label>
                        <CloudinaryContext cloudName="infrastructure-ambulance">
                          <div>
                            {imagePublicId && (
                              <Image
                                publicId={imagePublicId}
                                width="100"
                                alt="complain-picture"
                              />
                            )}
                          </div>
                        </CloudinaryContext>
                      </div>
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

const WithProvider: React.FC<CreateComplainProps> = ({}) => {
  return (
    <Provider store={store}>
      <CreateComplain />
    </Provider>
  );
};

export default withApollo({ ssr: false })(WithProvider);
