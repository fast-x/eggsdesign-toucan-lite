import type { NextPage } from 'next';
import React from 'react';
import { signIn } from 'next-auth/react';

import Button from '../components/clickables/Button';
import { CenterContent } from '../components';
import { ButtonColor } from '../@types';
import styled from 'styled-components';

import { colEmerald, screenWidthLarge, screenWidthMedium, screenWidthSmall } from '../styles/variables';
import ToucanLogo from '../assest/visuals/ToucanLogo';
import GreenWave from '../assest/visuals/GreenWave';
import { hiddenOnDesktop, hiddenOnMobile } from '../styles/styles';
import Slogan from '../components/info/Slogan';

const LogInPage: NextPage = () => {
  return (
    <>
      <Header>
        <h1>Toucan</h1>
        <Button
          onClick={() => signIn(undefined, { callbackUrl: '/' })}
          title="Sign in to Toucan"
          color={ButtonColor.WHITE}
          className="desktop-login">
          Start sharing
        </Button>
      </Header>
      <main style={{ overflow: 'hidden' }}>
        <PageWrapper>
          <CenterContent>
            <Slogan className="slogan" />
          </CenterContent>
          <div className="backgrounds">
            <GreenWave />
            <ToucanLogo />
          </div>
          <Button
            onClick={() => signIn(undefined, { callbackUrl: '/' })}
            title="Sign in to Toucan"
            color={ButtonColor.WHITE}
            className="mobile-login">
            Start sharing
          </Button>
        </PageWrapper>
      </main>
    </>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  max-height: 80px;
  background-color: transparent;
  h1 {
    font-weight: 600;
  }
  @media (min-width: ${screenWidthSmall}) {
    padding: 1.5rem;
    max-height: 96px;
  }
  .desktop-login {
    ${hiddenOnMobile};
    position: relative;
    z-index: 10;
  }
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: calc(100vh - 80px);
  overflow: hidden;
  @media (min-width: ${screenWidthSmall}) {
    min-height: calc(100vh - 96px);
  }
  .mobile-login {
    ${hiddenOnDesktop};
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    justify-content: center;
    z-index: 10;
  }
  .slogan {
    position: relative;
    z-index: 10;
    @media (min-width: ${screenWidthMedium}) {
      margin-top: 2rem;
    }
  }
  .backgrounds {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    padding-bottom: 5rem;
    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5rem;
      content: '';
      background-color: ${colEmerald};
    }
    @media (min-width: ${screenWidthLarge}) {
      padding-bottom: 0;
      &:after {
        height: 0;
      }
    }
  }
  .green-wave {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    z-index: 3;
  }
  .toucan-logo {
    position: absolute;
    bottom: calc(5rem + 20vw);
    left: 40%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    @media (min-width: ${screenWidthSmall}) {
      left: 20%;
      width: 140px;
      height: 140px;
    }
    @media (min-width: ${screenWidthLarge}) {
      bottom: 20vw;
      left: 20%;
      width: 250px;
      height: 250px;
    }
  }
`;

export default LogInPage;
