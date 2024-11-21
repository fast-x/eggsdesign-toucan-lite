import styled, { keyframes } from 'styled-components';
import React from 'react';
import ToucanLogo from '../../assest/visuals/ToucanLogo';

type Props = {
  loadingText?: string;
  className?: string;
};

const ToucanLoader: React.FC<Props> = ({ loadingText, className }: Props) => {
  return (
    <Wrapper className={className}>
      <div>
        <ToucanLogo width={200} height={100} />
      </div>
      <LoadingText>
        {loadingText ? (
          loadingText
        ) : (
          <span>
            Loading
            <DotsWrapper>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </DotsWrapper>
          </span>
        )}
      </LoadingText>
    </Wrapper>
  );
};

const floaty = (x: number, y: number) => keyframes`
  0%, 90%, 100% { transform: scale(1) translate(0, 0) ; }
  50% { transform: scale(1.2) translate(${x}px, ${y}px); }
`;

const fadeInOut = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: auto;
  text-align: center;
  > div {
    width: 60px;
    height: 60px;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    .inner-beak {
      animation: ${floaty(30, -60)} 4s infinite linear;
      transform-origin: center top;
    }
    .middle-beak {
      animation: ${floaty(40, -40)} 4s infinite;
      transform-origin: center bottom;
      animation-delay: 0.5s;
    }
    .outer-beak {
      animation: ${floaty(20, -50)} 4s infinite;
      transform-origin: center bottom;
      animation-delay: 1s;
    }
    .head {
      animation: ${floaty(-7, -7)} 4s infinite;
      transform-origin: center bottom;
      animation-delay: 1s;
    }
    .face {
      animation: ${floaty(10, -10)} 4s infinite;
      transform-origin: center bottom;
      animation-delay: 0.5s;
    }
    .body {
      animation: ${floaty(-7, 7)} 4s infinite;
      transform-origin: center bottom;
      animation-delay: 1s;
    }
  }
`;

const LoadingText = styled.span`
  margin-top: 4rem;
`;

const DotsWrapper = styled.span`
  margin-left: 0.15rem;
  display: inline-block;
  font-size: 1.5em;

  span {
    display: inline-block;
    margin-right: 0.15rem;
    animation: ${fadeInOut} 0.3s alternate infinite;
  }

  & span:nth-child(1) {
    animation-delay: 0.3s;
  }
  & span:nth-child(2) {
    animation-delay: 0.7s;
  }
  & span:nth-child(3) {
    animation-delay: 1.1s;
  }
`;

export default ToucanLoader;
