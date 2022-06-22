import React, { useState } from 'react';
import construction from '../../assests/Asset 1.png';
import Image from 'next/image';
import HeaderText from '../../components/Base/HeaderText';
import Navbar from '../../components/Navbar';
import InputField from '../../components/InputField';
import { Form, Formik } from 'formik';
import NextButton from '../../components/buttons/NextButton';
import RegisterMain from './register-components/RegisterMain';
import PhoneNumberEntry from './register-components/PhoneNumberEntry';
import UsernameEntry from './register-components/UsernameEntry';
import VerifyNumber from './register-components/VerifyNumber';

interface IndexProps {}

type Page =
  | 'register-main'
  | 'username-entry'
  | 'phonenumber-entry'
  | 'verify-number';

const selectPage = (
  page: Page,
  setPage: React.Dispatch<React.SetStateAction<Page>>
) => {
  switch (page) {
    case 'phonenumber-entry':
      return (
        <PhoneNumberEntry
          onNext={() => {
            setPage('verify-number');
          }}
        />
      );
    case 'register-main':
      return (
        <RegisterMain
          onNext={() => {
            setPage('username-entry');
          }}
        />
      );
    case 'username-entry':
      return (
        <UsernameEntry
          onNext={() => {
            setPage('phonenumber-entry');
          }}
        />
      );
    case 'verify-number':
      return <VerifyNumber />;
  }
};

const Index: React.FC<IndexProps> = ({}) => {
  const [page, setPage] = useState<Page>('register-main');
  return (
    <div>
      <Navbar />
      <div className="flex justify-between">
        <div className="w-3/6">
          <Formik initialValues={{ username: '' }} onSubmit={() => {}}>
            {({ values, handleChange, isSubmitting }) => {
              return <Form>{selectPage(page, setPage)}</Form>;
            }}
          </Formik>
        </div>
        <div className="h-3/6 w-3/6 ml-10 invisible lg:visible">
          <Image src={construction} alt="construction svg"></Image>
        </div>
      </div>
    </div>
  );
};

export default Index;
