import React from "react";

export default function Button({ className, btnName, type }) {
  return (
    <div className="text-center mt-4">
      <button type={type} className={className}>
        {btnName}
      </button>
    </div>
  );
}
