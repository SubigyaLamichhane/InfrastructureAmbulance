import { Form, Formik } from 'formik';
import React from 'react';
import HeaderText from '../../../components/Base/HeaderText';
import BackButton from '../../../components/buttons/BackButton';
import NextButton from '../../../components/buttons/NextButton';
import InputField from '../../../components/InputField';

interface VerifyNumberProps {
  onBack: () => void;
}

const VerifyNumber: React.FC<VerifyNumberProps> = ({ onBack }) => {
  return (
    <Formik
      initialValues={{ verificationcode: '' }}
      onSubmit={async (values, { setErrors }) => {
        if (values.verificationcode.length === 6) {
          //@ts-ignore
          window.confirmationResult
            .confirm(values.verificationcode)
            .then((result) => {
              const user = result.user;
              console.log(user);
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

export default VerifyNumber;
