import { Formik, Form } from 'formik';
import React from 'react';
import HeaderText from '../../../components/Base/HeaderText';
import NextButton from '../../../components/buttons/NextButton';
import InputField from '../../../components/InputField';
import SelectField from '../../../components/SelectField';

interface RegisterMainProps {
  onNext: () => void;
}

const RegisterMain: React.FC<RegisterMainProps> = ({ onNext }) => {
  return (
    <div>
      <HeaderText>Register</HeaderText>
      <div className="mt-10">
        <SelectField />
        <InputField
          name="firstname"
          label="First Name"
          placeholder="Enter your firstname"
        />
        <InputField
          name="lastname"
          label="Last Name"
          placeholder="Enter your lastname"
        />
        <InputField
          name="email"
          label="Email Address"
          placeholder="example@email.com"
        />
        <NextButton onClick={onNext}>Next</NextButton>
      </div>
    </div>
  );
};

export default RegisterMain;
