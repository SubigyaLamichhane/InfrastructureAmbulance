import { useField } from 'formik';
import React, { SelectHTMLAttributes } from 'react';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {};

const SelectField: React.FC<SelectFieldProps> = ({ size: _, ...props }) => {
  // @ts-ignore
  return (
    <div className="w-full">
      <select
        className="
        bg-blank
        w-full
        p-[24px]
        
        mb-2
        "
        {...props}
        autoComplete="off"
      >
        <option value="Category">Category:</option>
        <option value="Sewage">Sewage</option>
        <option value="Road">Road</option>
        <option value="Electricity">Electricity</option>
        <option value="Water">Drinking water</option>
      </select>
    </div>
  );
};

export default SelectField;
