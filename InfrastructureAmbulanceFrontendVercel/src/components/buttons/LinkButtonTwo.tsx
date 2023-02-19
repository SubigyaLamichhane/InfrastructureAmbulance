import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

type LinkButtonProps = HTMLAttributes<HTMLDivElement> & {
  href: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <div
      className="
      block
       
      px-[24px]
      py-[12px]
      bg-gray-700
      rounded-full
      group
      smooth-shadow
      hover:px-[40px]
      w-full
      lg:w-fit
      "
      {...props}
    >
      <Link href={href}>
        <p className="text-gray-100 flex items-center justify-center">
          {children}
        </p>
      </Link>
    </div>
  );
};

export default LinkButton;
