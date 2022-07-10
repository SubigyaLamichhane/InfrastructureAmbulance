import { Form, Formik } from 'formik';
import React from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { authentication } from '../../firebase-config';
import HeaderText from '../Base/HeaderText';
import BackButton from '../buttons/BackButton';
import NextButton from '../buttons/NextButton';
import InputField from '../InputField';
import {
  RegisterFormI,
  updateForm,
  UpdateFormActionI,
} from '../../store/actions';
import { connect } from 'react-redux';
import { StoreStateI } from '../../store/reducers';
import { useDoesPhoneNumberExistMutation } from '../../generated/graphql';

interface PhoneNumberEntryProps {
  onNext: () => void;
  onBack: () => void;
  updateRegisterForm: (data: RegisterFormI) => UpdateFormActionI;
  registerForm: RegisterFormI;
}

interface FormValuesType {
  phonenumber: 'string';
}

const generateRecaptcha = () => {
  //@ts-ignore
  window.recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'invisible',
      callback: (response) => {},
    },
    authentication
  );
};

const PhoneNumberEntry: React.FC<PhoneNumberEntryProps> = ({
  onNext,
  onBack,
  updateRegisterForm,
  registerForm,
}) => {
  let [doesPhoneNumberExist] = useDoesPhoneNumberExistMutation();
  return (
    <Formik
      initialValues={{ phonenumber: registerForm.phoneNumber }}
      onSubmit={async (values: FormValuesType, { setErrors }) => {
        generateRecaptcha();
        let phonenumber: string = values.phonenumber;
        //@ts-ignore
        let appVerifier = window.recaptchaVerifier;
        if (!phonenumber) {
          setErrors({
            phonenumber: 'This field is required',
          });
        } else {
          if (
            phonenumber.toString().length !== 10 ||
            phonenumber.toString()[0] != '9' ||
            phonenumber.toString()[1] != '8'
          ) {
            setErrors({
              phonenumber: 'Please enter a valid phone number.',
            });
          } else {
            const response = await doesPhoneNumberExist({
              variables: {
                phonenumber: values.phonenumber,
              },
            });
            if (response.data.doesPhoneNumberExist) {
              setErrors({
                phonenumber: 'The phone number you entered already exists',
              });
            } else {
              updateRegisterForm({
                ...registerForm,
                phoneNumber: phonenumber,
              });

              phonenumber = '+977' + phonenumber;
              signInWithPhoneNumber(authentication, phonenumber, appVerifier)
                .then((confirmationResult) => {
                  //@ts-ignore
                  window.confirmationResult = confirmationResult;
                  onNext();
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => {
        return (
          <Form>
            <div>
              <HeaderText>Almost there..</HeaderText>
              <div className="mt-10">
                <BackButton onClick={onBack}>Back</BackButton>
                <InputField
                  name="phonenumber"
                  label="Phone Number"
                  type="number"
                  placeholder="Enter your number"
                />
                <div id="recaptcha-container"></div>
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
})(PhoneNumberEntry) as any;
