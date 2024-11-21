import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { ModalContext } from '../../contexts/ModalContext';
import Button from '../clickables/Button';
import { ButtonColor, ButtonVariant } from '../../@types';
import { X } from '@phosphor-icons/react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ModalWrapper: React.FC<Props> = ({ children, className }: Props) => {
  const { open, toggleModal } = useContext(ModalContext);

  const customStyles = {
    content: {
      top: '0',
      left: '0',
      padding: '1.5rem',
      minWidth: '300px',
      height: '100vh',
      width: '100%',
      backgroundColor: '#fdfffc',
      color: '#000',
    },
  };

  ReactModal.setAppElement('#__next');

  const handleClose = () => {
    toggleModal();
  };

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      className={className}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleClose}>
      <CloseButton
        onClick={() => handleClose()}
        title="Close modal"
        variant={ButtonVariant.SECONDARY}
        noBorder
        icon
        color={ButtonColor.GREY}>
        <X size={32} weight="bold" />
      </CloseButton>
      {children}
    </ReactModal>
  );
};
const CloseButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 999;
`;

export default ModalWrapper;
