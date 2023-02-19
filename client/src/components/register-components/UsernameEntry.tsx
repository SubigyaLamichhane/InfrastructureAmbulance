import { Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import HeaderText from '../Base/HeaderText';
import BackButton from '../buttons/BackButton';
import NextButton from '../buttons/NextButton';
import InputField from '../InputField';
import { useDoesUsernameExistMutation } from '../../generated/graphql';
import {
  RegisterFormI,
  updateForm,
  UpdateFormActionI,
} from '../../store/actions';
import { StoreStateI } from '../../store/reducers';

interface UsernameEntryProps {
  onNext: () => void;
  onBack: () => void;
  updateRegisterForm: (data: RegisterFormI) => UpdateFormActionI;
  registerForm: RegisterFormI;
}

interface FormValuesType {
  username: string;
  password: string;
}

const UsernameEntry: React.FC<UsernameEntryProps> = ({
  onNext,
  onBack,
  registerForm,
  updateRegisterForm,
}) => {
  let isError: boolean = false;
  const [doesUsernameExist] = useDoesUsernameExistMutation();
  return (
    <Formik
      initialValues={{
        username: registerForm.username,
        password: registerForm.password,
      }}
      onSubmit={async (values: FormValuesType, { setErrors }) => {
        if (!values.username) {
          setErrors({
            username: 'This field is required',
          });
          isError = true;
        }
        if (!values.password) {
          setErrors({
            password: 'This field is required',
          });
          isError = true;
        }

        const response = await doesUsernameExist({
          variables: {
            username: values.username,
          },
        });
        if (response.data.doesUsernameExist) {
          isError = true;
          setErrors({
            username: 'This username already exist',
          });
        }
        if (!isError) {
          updateRegisterForm({ ...registerForm, ...values });
          onNext();
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => {
        return (
          <Form>
            <div>
              <HeaderText>Register</HeaderText>
              <div className="mt-10">
                <BackButton type="submit" onClick={onBack}>
                  Back
                </BackButton>
                <InputField
                  name="username"
                  label="User Name"
                  placeholder="Username"
                />
                <InputField
                  name="password"
                  label="Password"
                  placeholder="Enter password..."
                  type="password"
                />
                <NextButton type="submit">Next</NextButton>
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
})(UsernameEntry) as any;
