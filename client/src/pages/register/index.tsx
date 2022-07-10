import { Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import construction from '../../assests/Asset 1.png';
import Navbar from '../../components/Navbar';
import { withApollo } from '../../utils/withApollo';
import PhoneNumberEntry from '../../components/register-components/PhoneNumberEntry';
import RegisterMain from '../../components/register-components/RegisterMain';
import UsernameEntry from '../../components/register-components/UsernameEntry';
import VerifyNumber from '../../components/register-components/VerifyNumber';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
          onBack={() => {
            setPage('username-entry');
          }}
        />
      );
    case 'register-main':
      return (
        //@ts-ignore
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
          onBack={() => {
            setPage('register-main');
          }}
        />
      );
    case 'verify-number':
      return (
        <VerifyNumber
          onBack={() => {
            setPage('phonenumber-entry');
          }}
        />
      );
  }
};

const Index: React.FC<IndexProps> = ({}) => {
  const [page, setPage] = useState<Page>('register-main');
  return (
    <div>
      <Navbar />
      <div className="flex justify-between">
        <div className="w-full md:w-3/6">{selectPage(page, setPage)}</div>
        <div className="h-3/6 w-3/6 md:ml-10 md:inline">
          <Image src={construction} alt="construction svg"></Image>
        </div>
      </div>
    </div>
  );
};

const WithProvider: React.FC<IndexProps> = ({}) => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default withApollo({ ssr: false })(WithProvider);
