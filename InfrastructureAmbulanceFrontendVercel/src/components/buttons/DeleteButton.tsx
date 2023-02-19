// import Link from 'next/link';
// import React, { ButtonHTMLAttributes } from 'react';

// type StandardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

// const StandardButton: React.FC<StandardButtonProps> = ({
//   children,
//   ...props
// }) => {
//   return (
//     <button
//       className="rounded-standard border-2  px-8 border-black hover:border-4 hover:px-10 hover:font-bold hover:cursor-pointer block my-4"
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export default StandardButton;

import React, { HTMLAttributes } from 'react';

type LinkButtonProps = HTMLAttributes<HTMLDivElement> & {};

const LinkButton: React.FC<LinkButtonProps> = ({ children, ...props }) => {
  return (
    <div
      className="
      block
       
      px-[24px]
      py-[12px]
      bg-red-700
      rounded-full
      group
      smooth-shadow
      hover:px-[40px]
      w-full
      lg:w-fit
      "
      {...props}
    >
      <button>
        <p className="text-gray-100 flex items-center justify-center">
          {children}
        </p>
      </button>
    </div>
  );
};

export default LinkButton;
