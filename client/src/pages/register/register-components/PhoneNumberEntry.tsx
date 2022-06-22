import { Form } from 'formik';
import React from 'react';
import HeaderText from '../../../components/Base/HeaderText';
import NextButton from '../../../components/buttons/NextButton';
import InputField from '../../../components/InputField';

interface PhoneNumberEntryProps {
  onNext: () => void;
}

const PhoneNumberEntry: React.FC<PhoneNumberEntryProps> = ({ onNext }) => {
  return (
    <div>
      <HeaderText>Almost there..</HeaderText>
      <div className="mt-10">
        <InputField
          name="phonenumber"
          label="Phone Number"
          placeholder="Enter your number"
        />
        <NextButton onClick={onNext}>Next</NextButton>
      </div>
    </div>
  );
};

export default PhoneNumberEntry;
