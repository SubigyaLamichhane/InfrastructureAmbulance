import Image from 'next/image';
import React, { ButtonHTMLAttributes } from 'react';
import NextArrow from '../../assests/Asset 3.png';

type NextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton: React.FC<NextButtonProps> = ({ children, ...props }) => {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
        }}
        className="
          rounded-standard 
          border-2  
          px-8 
          border-black 
          hover:border-4 
          hover:px-10 
          hover:font-bold
          hover:cursor-pointer
          py-2
          mt-4
          w-40
        "
        {...props}
      >
        <div className="flex justify-between">
          <Image
            style={{ transform: 'scaleX(-1)' }}
            height={10}
            src={NextArrow}
            alt="back arrow"
          ></Image>
          <p className="text-xl my-0">{children}</p>
        </div>
      </button>
    </div>
  );
};

export default BackButton;
