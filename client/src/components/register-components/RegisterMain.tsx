import { withApollo } from '../../utils/withApollo';
import React, { useEffect, useState } from 'react';
import HeaderText from '../Base/HeaderText';
import NextButton from '../buttons/NextButton';
import InputField from '../InputField';
import { useDoesEmailExistMutation } from '../../generated/graphql';
import { connect } from 'react-redux';
import {
  RegisterFormI,
  updateForm,
  UpdateFormActionI,
} from '../../store/actions';
import { StoreStateI } from '../../store/reducers';
import { Formik, Form } from 'formik';
import SelectWard from '../SelectWard';

interface RegisterMainProps {
  onNext: () => void;
  registerForm: RegisterFormI;
  updateRegisterForm: (data: RegisterFormI) => UpdateFormActionI;
}

interface FormValuesType {
  firstname: string;
  lastname: string;
  wardNo: 'Ward No.' | string;
  email: string;
}

const RegisterMain: React.FC<RegisterMainProps> = ({
  onNext,
  updateRegisterForm,
  registerForm,
}) => {
  let isError = false;
  const [doesEmailExist] = useDoesEmailExistMutation();

  return (
    <Formik
      initialValues={
        {
          firstname: registerForm.firstname,
          lastname: registerForm.lastname,
          wardNo: registerForm.wardNo,
          email: registerForm.email,
        } as FormValuesType
      }
      onSubmit={async (values: FormValuesType, { setErrors }) => {
        if (!values.email) {
          isError = true;
          setErrors({
            email: 'This field is required',
          });
        } else if (!values.firstname) {
          isError = true;
          setErrors({
            firstname: 'This field is required',
          });
        } else if (!values.lastname) {
          isError = true;
          setErrors({
            lastname: 'This field is required',
          });
        } else if (!values.wardNo || values.wardNo === 'Ward No.') {
          isError = true;
          setErrors({
            wardNo: 'This field is required',
          });
        } else {
          isError = false;
        }

        const response = await doesEmailExist({
          variables: {
            email: values.email,
          },
        });
        if (response.data.doesEmailExist) {
          isError = true;
          setErrors({
            email: 'This email is already registered',
          });
        }

        if (!isError) {
          updateRegisterForm({
            ...registerForm,
            ...values,
            wardNo: parseInt(values.wardNo),
          });
          onNext();
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => {
        return (
          <Form autoComplete="off">
            <div>
              <HeaderText>Register</HeaderText>
              <div className="mt-10">
                <SelectWard name="wardNo" />
                <InputField
                  name="firstname"
                  label="First Name"
                  key="firstname"
                  placeholder="Enter your firstname"
                />
                <InputField
                  name="lastname"
                  key="lastname"
                  label="Last Name"
                  placeholder="Enter your lastname"
                />
                <InputField
                  name="email"
                  type="email"
                  key="email"
                  label="Email Address"
                  placeholder="example@email.com"
                />
                <NextButton>Next</NextButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({ registerForm }: StoreStateI) => {
  return { registerForm };
};

export default connect(mapStateToProps, {
  updateRegisterForm: updateForm,
})(RegisterMain) as any;
