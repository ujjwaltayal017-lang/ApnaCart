
import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="flex justify-center gap-2 text-3xl font-bold md:text-4xl">
      <span className="text-gray-800">{text1}</span>
      <span className="text-orange-500">{text2}</span>
    </div>
  );
}

export default Title;
