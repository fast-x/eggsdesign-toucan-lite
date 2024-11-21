import styled from 'styled-components';
import React from 'react';
import { colBlack, colGrey, dirInnerArrowWidth, dirOuterArrowWidth, snappy } from '../styles/variables';
import { SpeechBubbleDirection } from '../@types';
import classNames from 'classnames';
import { bouncyText } from '../styles/styles';

type Props = {
  children: React.ReactElement | string;
  direction?: SpeechBubbleDirection;
  extraLabel?: string;
  hasBounce?: boolean;
  className?: string;
  solidBorder?: boolean;
};

const SpeechBubble: React.FC<Props> = ({
  children,
  direction = SpeechBubbleDirection.LEFT,
  extraLabel,
  hasBounce = false,
  className,
  solidBorder,
}: Props) => {
  const wrapperClassNames = classNames({
    [`dir-${direction}`]: direction,
    [`${className}`]: className,
  });
  return (
    <Wrapper className={wrapperClassNames} solidBorder={solidBorder}>
      {extraLabel && <span className={`extra-label ${hasBounce && 'has-bounce'}`}>{extraLabel}</span>}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ solidBorder?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 1rem;
  border: 1px ${({ solidBorder = false }) => (solidBorder ? 'solid' : 'dashed')} ${colGrey};
  border-radius: 15px;
  background-color: #fff;
  color: ${colGrey};
  transition: background-color ${snappy}, color ${snappy};
  .extra-label {
    position: absolute;
    top: -1.25rem;
    font-weight: 600;
    color: ${colBlack};
    font-size: 0.75rem;
    &.has-bounce {
      animation: ${bouncyText} 0.5s linear forwards;
    }
  }
  p {
    margin-bottom: 0;
  }
  svg {
    width: 1.25rem;
    path {
      fill: ${colGrey};
    }
  }
  button {
    svg path {
      fill: currentColor;
    }
  }
  &:before,
  &:after {
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
    content: '';
    border-style: ${({ solidBorder = false }) => (solidBorder ? 'solid' : 'dashed')};
  }
  &:before {
    z-index: 1;
  }
  &:after {
    z-index: 2;
  }
  &.dir-top {
    margin-top: 2rem;
    &:before,
    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
    &:before {
      top: -${dirOuterArrowWidth};
      border-width: 0 calc(${dirOuterArrowWidth} / 2) ${dirOuterArrowWidth} calc(${dirOuterArrowWidth} / 2);
      border-color: transparent transparent ${colGrey} transparent;
    }
    &:after {
      top: -${dirInnerArrowWidth};
      border-width: 0 calc(${dirInnerArrowWidth} / 2) ${dirInnerArrowWidth} calc(${dirInnerArrowWidth} / 2);
      border-color: transparent transparent #fff transparent;
    }
  }
  &.dir-left {
    margin-left: 1rem;
    &:before,
    &:after {
      top: 50%;
      transform: translateY(-50%);
    }
    &:before {
      left: -${dirOuterArrowWidth};
      border-width: 0 ${dirOuterArrowWidth} ${dirOuterArrowWidth} 0;
      border-color: transparent ${colGrey} transparent transparent;
    }
    &:after {
      left: -${dirInnerArrowWidth};
      border-width: 0 ${dirInnerArrowWidth} ${dirInnerArrowWidth} 0;
      border-color: transparent #fff transparent transparent;
    }
  }
  &.dir-right {
    margin-right: 2rem;
    &:before,
    &:after {
      top: 50%;
      transform: translateY(-50%);
    }
    &:before {
      right: -${dirOuterArrowWidth};
      border-width: ${dirOuterArrowWidth} ${dirOuterArrowWidth} 0 0;
      border-color: ${colGrey} transparent transparent transparent;
    }
    &:after {
      right: -${dirInnerArrowWidth};
      border-width: ${dirInnerArrowWidth} ${dirInnerArrowWidth} 0 0;
      border-color: #fff transparent transparent transparent;
    }
  }
  &.dir-bottom {
    &:before {
      bottom: -0.55em;
      content: '';
      background-color: #fff;
      border-top: none;
      border-left: none;
      border-bottom: 1px dashed ${colGrey};
      border-right: 1px dashed ${colGrey};
      position: absolute;
      // left: 110px;
      width: ${dirOuterArrowWidth};
      height: ${dirOuterArrowWidth};
      transform: rotate(45deg);
    }
    &:after {
      display: none;
    }
    /*
    &:before {
      bottom: -${dirOuterArrowWidth};
      border-width: ${dirOuterArrowWidth} ${dirOuterArrowWidth} 0 ${dirOuterArrowWidth};
      border-color: ${colGrey} transparent transparent transparent;
      border-style: dotted;
    }
    &:after {
      bottom: -${dirInnerArrowWidth};
      border-width: ${dirInnerArrowWidth} ${dirInnerArrowWidth} 0 ${dirInnerArrowWidth};
      border-color: #fff transparent transparent transparent;
      border-style: dotted;
    }
    */
  }
`;

export default SpeechBubble;
