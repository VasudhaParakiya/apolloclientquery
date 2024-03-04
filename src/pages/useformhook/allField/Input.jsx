import React from "react";

export default function InputField({
  id,
  label,
  placeholder,
  type,
  name,
  register,

  errorMessage,
}) {
  return (
    <div className="d-flex flex-column mb-3">
      <label htmlFor={id}>{label} :</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...register}
      />
      <span style={{ color: "red" }}>{errorMessage}</span>
    </div>
  );
}
