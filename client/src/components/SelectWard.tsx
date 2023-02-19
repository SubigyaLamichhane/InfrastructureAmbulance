import { useField } from 'formik';
import React, { SelectHTMLAttributes } from 'react';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {};

const SelectField: React.FC<SelectFieldProps> = ({ size: _, ...props }) => {
  // @ts-ignore
  const [field, { error }] = useField(props);
  return (
    <div className="w-full">
      <select
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
        autoComplete="off"
        {...field}
        id={field.name}
      >
        <option value="Ward No.">Ward No.</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        <option value="32">32</option>
      </select>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;