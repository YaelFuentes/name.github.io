import React from 'react';

export default function AlertCheck({ status, text, textInfo }) {
  let textColorClass;
  let borderColorClass;
  let bgColor;
  let darkText;
  let darkBorderColorClass;

  switch (status) {
    case 1:
      textColorClass = 'text-green-800';
      borderColorClass = 'border-green-300';
      bgColor = 'bg-green-50'
      darkText = 'dark:text-green-400'
      darkBorderColorClass = 'dark:border-green-800'
      break;
    case 2:
      textColorClass = 'text-red-800';
      borderColorClass = 'border-red-300'
      bgColor = 'bg-red-50'
      darkText = 'dark:text-red-400'
      darkBorderColorClass = 'dark:border-red-800'
      break;
    case 3:
      textColorClass = 'text-blue-800';
      borderColorClass = 'border-blue-300'
      bgColor = 'bg-blue-50'
      darkText = 'dark:text-blue-400'
      darkBorderColorClass = 'dark:border-blue-800'
      break;
    case 4:
      textColorClass = 'text-yellow-800';
      borderColorClass = 'border-yellow-300'
      bgColor = 'bg-yellow-50'
      darkText = 'dark:text-yellow-400'
      darkBorderColorClass = 'dark:border-yellow-800'
      break;
    default:
      textColorClass = 'text-gray-800';
      borderColorClass = 'border-gray-300'
      bgColor = 'bg-gray-50'
      darkText = 'dark:text-gray-400'
      darkBorderColorClass = 'dark:border-gray-800'
  }

  return (
    <>
      <div className={`flex items-center p-4 mb-4 text-sm ${textColorClass} border ${borderColorClass} rounded-lg ${bgColor} dark:bg-gray-800 ${darkText} ${darkBorderColorClass}`}
        role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">{text}</span> {textInfo}
        </div>
      </div>
    </>
  );
}
