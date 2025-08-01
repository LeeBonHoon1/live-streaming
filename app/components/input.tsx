import React, { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

const Input = ({
  errors = [],
  name,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-3"
        name={name}
        {...props}
      />

      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default Input;
