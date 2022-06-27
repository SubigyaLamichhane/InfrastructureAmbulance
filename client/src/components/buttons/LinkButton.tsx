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
      rounded-standard 
      border-2  
      px-8 
      border-black 
      hover:border-4 
      hover:px-10 
      hover:font-bold
      hover:cursor-pointer
      "
      {...props}
    >
      <Link href={href}>
        <p className="text-xl my-0">{children}</p>
      </Link>
    </div>
  );
};

export default LinkButton;
