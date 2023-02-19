import { withApollo } from '../utils/withApollo';
import React, { useEffect, useState } from 'react';
import HeaderText from '../components/Base/HeaderText';
import NextButton from '../components/buttons/NextButton';
import InputField from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import Navbar from '../components/Navbar';
import construction from '../assests/Asset 1.png';
import Image from 'next/image';

import { Formik, Form } from 'formik';
import Router from 'next/router';
import { useApolloClient } from '@apollo/client';
import { ArrowRightIcon } from '@chakra-ui/icons';

interface LoginProps {}

interface FormValuesType {
  usernameOrNumber: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({}) => {
  const apolloClient = useApolloClient();
  const [login] = useLoginMutation();
  return (
    <div>
      <Navbar />
      <div className="flex justify-between">
        <div className="w-full md:w-3/6">
          <Formik
            initialValues={
              {
                usernameOrNumber: '',
                password: '',
              } as FormValuesType
            }
            onSubmit={async (values: FormValuesType, { setErrors }) => {
              if (!values.usernameOrNumber) {
                setErrors({
                  usernameOrNumber:
                    'Please enter your username of phone number',
                });
              } else if (!values.password) {
                setErrors({
                  password: 'Please Enter your password',
                });
              } else {
                const response = await login({
                  variables: {
                    usernameOrNumber: values.usernameOrNumber,
                    password: values.password,
                  },
                });
                if (response.data.login.user) {
                  await apolloClient.resetStore();
                  Router.push('/');
                } else {
                  setErrors({
                    password: 'Either username or password incorrect',
                  });
                }
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => {
              return (
                <Form autoComplete="off">
                  <div>
                    <HeaderText>Login</HeaderText>
                    <div className="mt-10">
                      <InputField
                        name="usernameOrNumber"
                        key="usernameOrNumber"
                        label="Username or Phone Number"
                        placeholder="Enter your Username or Phone Number"
                      />
                      <InputField
                        name="password"
                        type="password"
                        key="password"
                        label="Password"
                        placeholder="Enter your password..."
                      />
                      <NextButton>
                        <span className="mr-16 group-hover:mr-32">Next</span>
                        <ArrowRightIcon></ArrowRightIcon>
                        {/* <Image
                          src={ArrowRightIcon}
                          width={30}
                          height={30}
                          alt="down arrow"
                        /> */}
                      </NextButton>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="h-3/6 w-3/6 md:ml-10  md:inline">
          <Image src={construction} alt="construction svg"></Image>
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(Login);
