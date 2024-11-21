import styled from 'styled-components';
import React from 'react';
import { colAmber, colEmerald, screenWidthMedium, screenWidthSmall } from '../../styles/variables';
import { slideInBackgroundColor } from '../../styles/styles';

type Props = {
  className?: string;
};

const Slogan: React.FC<Props> = ({ className }: Props) => {
  return (
    <Wrapper className={className}>
      <h2>
        The most fun <span className="yellow">sharing</span> tool for <span className="green">creative</span> teams
      </h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 230px;
  h2 {
    font-weight: 400;
    font-size: 1.85rem;
    line-height: 3.25rem;
    span {
      display: inline-block;
      padding: 0 0.25rem;
      margin: 0 0.5rem;
      position: relative;
      &:before {
        position: absolute;
        top: 50%;
        left: -0.5rem;
        transform: translateY(-50%);
        content: '';
        background-color: ${colAmber};
        height: calc(100% - 0.25rem);
        max-height: 3rem;
        z-index: -1;
        border-radius: 8px;
        animation: ${slideInBackgroundColor} 0.75s forwards ease-in-out;
      }
      &.green {
        &:before {
          background-color: ${colEmerald};
          animation-delay: 0.75s;
        }
      }
    }
  }
  @media (min-width: ${screenWidthSmall}) {
    margin-top: 4rem;
    max-width: 370px;
    h2 {
      font-size: 3.5rem;
      line-height: 5rem;
      span {
        &:before {
          max-height: 4.5rem;
        }
      }
    }
  }
  @media (min-width: ${screenWidthMedium}) {
    margin-top: 10rem;
  }
`;

export default Slogan;
