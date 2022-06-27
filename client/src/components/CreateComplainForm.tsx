import { Formik, Form } from 'formik';
import Router from 'next/router';
import React from 'react';
import NextButton from './buttons/NextButton';
import InputField from './InputField';
import SelectCategory from './SelectCategory';
import SelectWard from './SelectWard';
import { useLoginMutation } from '../generated/graphql';
import Textarea from './TextArea';

interface tempcompProps {}

interface FormValuesType {
  usernameOrNumber: string;
  password: string;
}

const CreateComplainForm: React.FC<tempcompProps> = ({}) => {
  const [login] = useLoginMutation();

  return (
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
            usernameOrNumber: 'Please enter your username of phone number',
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
              <div className="mt-10">
                <div className="flex justify-between ">
                  <div className="w-full ">
                    <SelectCategory name="Category" />
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
                <Textarea
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
  );
};

export default CreateComplainForm;
