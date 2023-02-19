import Image from 'next/image';
import React, { ButtonHTMLAttributes } from 'react';
import NextArrow from '../../assests/Asset 3.png';

type NextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const LinkButton: React.FC<NextButtonProps> = ({ children, ...props }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
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
          <p className="text-xl my-0">{children}</p>
          <Image height={10} src={NextArrow} alt="arrow"></Image>
        </div>
      </button>
    </div>
  );
};

export default LinkButton;
