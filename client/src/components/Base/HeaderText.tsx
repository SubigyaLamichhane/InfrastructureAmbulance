import React from 'react';

interface HeaderTextProps {}

const HeaderText: React.FC<HeaderTextProps> = ({ children }) => {
  return (
    <div className="">
      <h1 className="text-6xl">{children}</h1>
    </div>
  );
};

export default HeaderText;
