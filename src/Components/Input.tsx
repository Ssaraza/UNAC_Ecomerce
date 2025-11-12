import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
}

const Input: React.FC<InputProps> = ({ classname ='', ...props }) => {
  return <input 
  className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${classname}`} 
  {...props} />;
}

export default Input;