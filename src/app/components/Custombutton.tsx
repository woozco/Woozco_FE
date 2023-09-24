"use client"
import React from 'react';

interface CustomButtonProps {
  buttonText: string;
  onClick?: () => void; // onClick 함수를 props로 받음 (선택적)
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <button
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={props.onClick} // props로 받은 onClick 함수를 버튼의 onClick 이벤트에 연결
    >
      {props.buttonText}
    </button>
  );
}

export default CustomButton;
