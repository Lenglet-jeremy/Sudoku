import React from "react";

export default function NumericKeyboard({ onKeyPress }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "OK"];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto p-4">
      {keys.map((key) => (
        <button
          key={key}
          className="bg-gray-200 hover:bg-gray-300 text-xl font-bold p-4 rounded-xl shadow"
          onClick={() => onKeyPress(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
