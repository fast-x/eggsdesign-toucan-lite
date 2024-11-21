import React, { useState } from 'react';
import { ModalContext } from './ModalContext';

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <ModalContext.Provider
      value={{
        open: open,
        toggleModal: toggleModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
