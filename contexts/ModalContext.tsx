import React from 'react';

type ModalContext = {
  open: boolean;
  toggleModal: () => void;
};

const defaultState = {
  open: false,
  toggleModal: () => {
    console.log('Toggle modal window');
  },
};

export const ModalContext = React.createContext<ModalContext>(defaultState);
