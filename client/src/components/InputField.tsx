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
  // !!error : error in string so checking empty string
  const [field, { error }] = useField(props);
  return (
    <div className="w-full">
      <h2 className="text-xl">{props.label}</h2>
      <input
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className="
        border-2
        rounded-standard 
        border-black 
        focus:border-4
        w-full
        p-2
        mb-2
        "
        {...props}
        {...field}
        id={field.name}
        autoComplete="off"
        placeholder={props.placeholder}
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
