"use client"
import React, {ReactNode} from 'react';

interface ModalProps {
  onClose: () => void; // 모달 닫기 함수
  children: ReactNode; // children을 명시적으로 추가
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 shadow-lg rounded-lg">
        {children}
        <button onClick={onClose} className="text-red-500 mt-2 block">
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
