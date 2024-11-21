import styled from 'styled-components';
import React, { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import Head from 'next/head';
interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { open } = useContext(ModalContext);
  return (
    <Wrapper modalIsOpen={open}>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/vvs7qox.css" />
      </Head>
      {children}
    </Wrapper>
  );
};

// Quickfix while I fix the trouble with having user fetching in this Layout file, each page has to fetch user and
// put in the header. But the plan is to only have it here, and put {children} in a main tag
const Wrapper = styled.div<{ modalIsOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
  overflow: hidden;
  height: ${({ modalIsOpen = false }) => (modalIsOpen ? '100vh' : 'auto')};
  > main {
    flex-grow: 1;
    width: 100%;
  }
`;

export default Layout;
