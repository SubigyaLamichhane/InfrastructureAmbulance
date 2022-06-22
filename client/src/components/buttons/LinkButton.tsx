import Link from 'next/link';
import React from 'react';

interface LinkButtonProps {
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, children }) => {
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
    >
      <Link href={href}>
        <p className="text-xl my-0">{children}</p>
      </Link>
    </div>
  );
};

export default LinkButton;
