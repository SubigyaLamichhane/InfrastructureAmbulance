import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props);
  // !!error : error in string so checking empty string
  return (
    <div className="w-full">
      <h2 className="text-xl">{props.label}</h2>
      <input
        className="
        border-2
        rounded-standard 
        border-black 
        focus:border-4
        w-full
        p-2
        mb-2
        "
        {...field}
        {...props}
        autoComplete="off"
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <>{error}</>}
    </div>
  );
};

export default InputField;
