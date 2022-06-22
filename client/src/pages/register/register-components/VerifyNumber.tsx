import { Form } from 'formik';
import React from 'react';
import HeaderText from '../../../components/Base/HeaderText';
import NextButton from '../../../components/buttons/NextButton';
import InputField from '../../../components/InputField';

interface VerifyNumberProps {}

const VerifyNumber: React.FC<VerifyNumberProps> = ({}) => {
  return (
    <div>
      <HeaderText>Verify your number</HeaderText>
      <div className="mt-10">
        <InputField
          name="verification-code"
          label="Enter the 6 digit code:"
          placeholder="enter code"
        />

        <NextButton type="submit">Verify</NextButton>
      </div>
    </div>
  );
};

export default VerifyNumber;
