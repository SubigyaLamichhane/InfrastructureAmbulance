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
        px-[48px]
        py-[24px]
        bg-gradient-to-r 
        from-from
        to-to
        rounded-full
        group
        smooth-shadow
        hover:px-[40px]
        w-full
        lg:w-fit
        "
        {...props}
      >
        <p className="text-black flex items-center justify-center text-center">
          {children}
          {/* <Image height={10} src={NextArrow} alt="arrow"></Image> */}
        </p>
      </button>
    </div>
  );
};

export default LinkButton;
