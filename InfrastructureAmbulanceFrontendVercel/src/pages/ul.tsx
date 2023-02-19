import Script from 'next/script';
import React, { useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { UsernamePasswordRequest } from '@azure/msal-node';
// import OneDriveAPI from 'onedrive-api';

interface UploadFileProps {}

const CLIENT_ID = '97a38fd0-ad11-4cc1-b777-3a472a000697';
const TENANT_ID = 'dfdfe807-3952-4bac-a154-141931f9836f';
const AUTHORITY_URL = `https://login.microsoftonline.com/${TENANT_ID}`; ///oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/ul&scope=Files.ReadWrite.All offline_access&response_mode=fragment
const RESOURCE_URL = 'https://graph.microsoft.com/';
const API_VERSION = 'v1.0';
const USERNAME = 'newforupworkRD@outlook.com'; //Office365 user's account username
const PASSWORD = 'aonveaiov eaw89238979noan@avne#aiva';
const SCOPES = ['Sites.ReadWrite.All', 'Files.ReadWrite.All'];

const ACCESS_TOKEN =
  'EwCIA8l6BAAUkj1NuJYtTVha%2bMogk%2bHEiPbQo04AAfKptW8MM9WwYkydmnOPQfoE1QrfXuJK9vTWxszS61LFg7hg/XkH8Y2f7zXQfIM4Xbskdpxx1eTGvHiLdBARYcMS2k6kZTMpFmNQaN2jTt/2MaEiDEVlOk1HXoYSuA4S%2bHJyCRGbSKFoLkn5OOoBseqEs3LlKJFd8MfUmqVV6rOgisFYksFnXMvaLSRPVm6zt3w/qltFL9jahZYH0bIRWWMJ4yFJXC8bbDramqdiByZmGYNpbHHYMOOxgOWguQydVdvLyZQpGqoBCA2S6jWbsOOQaTjRtz05sgtUwjz2O4S3AU%2bGIXJujaT8OHoovomE9a5wA4y%2bcaHZNBZW9CkORjsDZgAACKxkb6atj3maWAItHnRGS1kF18liiMYtX/itbWKJ6NJkx%2bv9LauCJDsWfrtqgwbmVKPVwpWuDBmrwebswtQCdMVbmL8xi7WHqr204Z8EbYvDFVLam14/6mmaHEURAsxtqV8F1O8u5BFRCT2vqMndPHi09/cv9b2pTyk293RY30qQb4y%2bl5T3OAUaEcNCNRZSt9/KlFW7mMf/kWuON6amzF7qeXwF5QujCZedcQ5i2d1ur7OtHGjwZjI7Uio1upcjadcaRGP5HWWlbpy/B6WgfGbCgF3nqtKwISUdz%2b5vBV5bR/ZzWniKCOpiZkwy%2b%2brbExjEzMMsXcJxhBb16y9Sv0b6mxMwwY/Brxq4InQ/fyOwIN5sc19n15g6GLc57C11JHoevJHu3AaMJ%2b8oeQMk%2bXzduyk4Jv4D5go/9EmoR/mjr%2b3Hgbgqed8ib00HHAAKKGstMrk6S9%2b8Q9IULGblWQBMGF%2bv9tHvQ%2bQyOnet8N8xo%2b5lpUNnNLm/CNiGz2UTuE68EJC4Ndv8lZrxUVHcTat7Z1T1%2bCwJfJCK06tJIvFT7M6/4xWY9Pt4xNe2wf%2bshQuFdMVQqmyKoaYtTfZ4lamt%2bRQMQHDPeoEL67ZaTV22ykxuYBtszCVRZtbv7SfWIqfRgy1yG6uaSbwhTRmB5DSq1%2bqpK4c66aOqt9DEnlGhxDQ%2bWfk2lfCIOFsaHxoDWl3raMIDmjkS89vOgbT7djkGHSMtKSbIbDEvkXW29epKTwp%2bXkyoKkEC81cek/F1uiABscezl7jFSFW7pzlYwSXr94pjC/7aUB6P1YHu0mq5/ayCAg%3d%3d';

interface OneDriveWindow extends Window {
  OneDrive: any;
}

declare let window: OneDriveWindow;

const UploadFile: React.FC<UploadFileProps> = ({}) => {
  const [fileSelected, setFileSelected] = useState<FileList[0] | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [fileUploadoing, setFileUploading] = useState<boolean>(false);
  const [fileUploadError, setFileUploadError] = useState<boolean>(false);
  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   //@ts-ignore
  //   formData.append('file', fileSelected);
  //   //launchOneDrivePicker()
  // };
  const launchSaveToOneDrive = async () => {
    let odOptions = {
      clientId: '97a38fd0-ad11-4cc1-b777-3a472a000697',
      action: 'save',
      sourceInputElementId: 'file',
      sourceUri: 'https://localhost:3000/ul',
      fileName: fileName,
      openInNewWindow: true,
      advanced: {
        redirectUri: 'https://localhost:3000/ul',
      },
      success: () => setFileUploaded(true) /* success handler */,
      progress: () => setFileUploading(true) /* progress handler */,
      cancel: () => {} /* cancel handler */,
      error: () => setFileUploadError(true) /* error handler */,
    };
    window.OneDrive.save(odOptions);

    // let cognosToOneDrive = new PublicClientApplication({
    //   auth: {
    //     clientId: CLIENT_ID,
    //     authority: AUTHORITY_URL,
    //     redirectUri: 'http://localhost:3000/ul',
    //   },
    // });
    // console.log(cognosToOneDrive.getAllAccounts());
    // const user = cognosToOneDrive.getAccountByUsername(USERNAME);
    // console.log(user);
    // let token = await cognosToOneDrive.acquireTokenSilent({
    //   scopes: SCOPES,
    //   account: cognosToOneDrive.getAllAccounts()[0],
    // });
  };
  return (
    <div>
      <div key={1}>
        <Script
          onLoad={() => {}}
          type="text/javascript"
          src="https://js.live.net/v7.2/OneDrive.js"
        ></Script>
      </div>
      <div>
        <input
          id="file"
          type="file"
          onChange={(e) => {
            if (e.target) {
              if (e.target.files) {
                setFileSelected(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }
            }
          }}
        ></input>

        <div>
          {/* {imagePublicId && ( publicId={imagePublicId}*/}
          {/* <Image
            src="https://res.cloudinary.com/dz9n8x0mk/image/upload/v1628666669/nextjs/nextjs.png"
            width="500"
            height={500}
            alt="complain-picture"
          /> */}
          {/* )} */}
        </div>

        <button onClick={launchSaveToOneDrive}>Save to OneDrive</button>
      </div>
    </div>
  );
};
export default UploadFile;
