import React, { useState } from 'react';
import axios from 'axios';
import { Image, CloudinaryContext } from 'cloudinary-react';

interface testImageUploadProps {}
interface CloudinaryResponse {
  public_id: string;
  height: number;
  url: string;
  placeholder: string | false;
  original_filename: string;
}

const TestImageUpload: React.FC<testImageUploadProps> = ({}) => {
  const [imageSelected, setImageSelected] = useState<FileList[0]>();
  const [imagePublicId, setImagePublicId] = useState('');
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY);

    const response: { data: CloudinaryResponse } = await axios.post(
      'https://api.cloudinary.com/v1_1/infrastructure-ambulance/image/upload',
      formData
    );

    setImagePublicId(response.data.public_id);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
      ></input>
      <CloudinaryContext cloudName="infrastructure-ambulance">
        <div>
          {imagePublicId && (
            <Image
              publicId={imagePublicId}
              width="500"
              alt="complain-picture"
            />
          )}
        </div>
      </CloudinaryContext>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default TestImageUpload;
