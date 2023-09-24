"use client"
import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import Modal from '../components/Modal';
import CustomButton from '../components/Custombutton';

const LoginPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <CustomButton buttonText='로그인' onClick={handleOpenModal}></CustomButton>
      {showModal && (
        <Modal onClose={handleCloseModal}>
            <LoginForm/>
        </Modal>
      )}
    </div>
  );
};

export default LoginPage;
