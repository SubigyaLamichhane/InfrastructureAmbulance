import { Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import HeaderText from '../Base/HeaderText';
import BackButton from '../buttons/BackButton';
import NextButton from '../buttons/NextButton';
import InputField from '../InputField';
import { authentication } from '../../firebase-config';
import {
  useLoginMutation,
  useRegisterMutation,
  UserInput,
} from '../../generated/graphql';
import router from 'next/router';
import {
  RegisterFormI,
  updateForm,
  UpdateFormActionI,
} from '../../store/actions';
import { StoreStateI } from '../../store/reducers';
import { useApolloClient } from '@apollo/client';

interface VerifyNumberProps {
  onBack: () => void;
  updateRegisterForm: (data: RegisterFormI) => UpdateFormActionI;
  registerForm: RegisterFormI;
}

const VerifyNumber: React.FC<VerifyNumberProps> = ({
  onBack,
  updateRegisterForm,
  registerForm,
}) => {
  const [register] = useRegisterMutation();
  const apolloClient = useApolloClient();
  return (
    <Formik
      initialValues={{ verificationcode: '' }}
      onSubmit={async (values, { setErrors }) => {
        if (values.verificationcode.length === 6) {
          //@ts-ignore //to
          window.confirmationResult
            .confirm(values.verificationcode)
            .then((result) => {
              authentication.currentUser
                .getIdToken(true)
                .then(async (idToken) => {
                  const response = await register({
                    variables: {
                      input: {
                        email: registerForm.email,
                        firstname: registerForm.firstname,
                        idToken,
                        lastname: registerForm.lastname,
                        password: registerForm.password,
                        phoneNumber: registerForm.phoneNumber,
                        username: registerForm.username,
                        //@ts-ignore //
                        wardNo: parseInt(registerForm.wardNo),
                      } as UserInput,
                    },
                  });

                  if (!response.data.register.user) {
                    setErrors({
                      verificationcode:
                        'The verification code that you entered is incorrect!!',
                    });
                  }
                  await apolloClient.resetStore();
                  router.push('/');
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {});
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => {
        return (
          <Form>
            <div>
              <HeaderText>Verify your number</HeaderText>
              <div className="mt-10">
                <BackButton onClick={onBack}>Back</BackButton>
                <InputField
                  name="verificationcode"
                  label="Enter the 6 digit code:"
                  placeholder="enter code"
                />

                <NextButton type="submit">Verify</NextButton>
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
})(VerifyNumber) as any;
