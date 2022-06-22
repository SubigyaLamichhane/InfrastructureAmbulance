import { Form } from 'formik';
import React from 'react';
import HeaderText from '../../../components/Base/HeaderText';
import NextButton from '../../../components/buttons/NextButton';
import InputField from '../../../components/InputField';

interface UsernameEntryProps {
  onNext: () => void;
}

const UsernameEntry: React.FC<UsernameEntryProps> = ({ onNext }) => {
  return (
    <div>
      <HeaderText>Register</HeaderText>
      <div className="mt-10">
        <InputField name="username" label="User Name" placeholder="Username" />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter password..."
        />
        <NextButton onClick={onNext}>Next</NextButton>
      </div>
    </div>
  );
};

export default UsernameEntry;
