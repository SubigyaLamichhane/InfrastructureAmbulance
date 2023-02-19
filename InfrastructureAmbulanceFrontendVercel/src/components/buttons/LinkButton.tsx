import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

type LinkButtonProps = HTMLAttributes<HTMLDivElement> & {
  href: string;
};

const LinkButtonTwo: React.FC<LinkButtonProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <div
      className="
      px-[24px]
      py-[12px]
      border-2
      border-black
      rounded-full
      group
      smooth-shadow
      hover:px-[40px]
      hover:cursor-pointer
      "
      {...props}
    >
      <Link href={href}>
        <p className="text-black flex items-center justify-center text-center">
          {children}
        </p>
      </Link>
    </div>
  );
};

export default LinkButtonTwo;
