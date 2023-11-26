"use client"
import React from 'react';

interface CustomButtonProps {
  buttonText: string;
  onClick?: () => void; // onClick 함수를 props로 받음 (선택적)
  type?: "button" | "submit";
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <button
      className="hover:bg-blue-800 text-white font-semibold py-2 px-4" 
      style={{
        flex: 1,
        backgroundColor: "#194280",
      }}
      onClick={props.onClick} // props로 받은 onClick 함수를 버튼의 onClick 이벤트에 연결
      type={props.type}
    >
      {props.buttonText}
    </button>
  );
}

export default CustomButton;
