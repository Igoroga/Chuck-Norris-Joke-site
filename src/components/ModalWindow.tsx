import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding-right:15px;
  padding-left:15px;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 400px; 
  overflow: auto; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any;
  }
  
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e:any) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
         {children}
        </ModalContent>
      </ModalOverlay>
    );
  };
  
  export default Modal;