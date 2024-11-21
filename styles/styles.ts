import { css, keyframes } from 'styled-components';
import { bodyFont, colWhite, screenWidthSmall, inputBorderRadius, tokens } from './variables';

export const buttonResetStyles = css`
  border: none;
  -webkit-appearance: none;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  font-family: ${bodyFont};
`;

export const bodyText = css`
  font-size: 1rem; // 16px
  line-height: 1.625rem; // 26px;
  font-weight: 500;
  font-family: ${bodyFont};
  &::before {
    content: '';
    margin-top: -0.125rem;
    display: block;
    height: 0;
  }
`;

export const inputFieldStyles = css`
  font-family: ${bodyFont};
  font-size: 1rem;
  padding: 2.5rem 0.75rem 0.75rem 0.75rem;
  border-radius: ${inputBorderRadius};
  border: 1px solid ${tokens.colors.indigo['100'].value};
  background-color: ${tokens.colors.indigo['100'].value};
  transition: border 250ms, background-color 500ms;
  color: ${tokens.colors.blue['600'].value};
  &::placeholder {
    color: ${tokens.colors.indigo['700'].value};
  }
  &:focus:not([disabled]) {
    border: 1px solid ${tokens.colors.indigo[300].value};
    outline: none;
  }
`;

export const inputLabelStyles = css`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  font-family: ${bodyFont};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${tokens.colors.blue['600'].value};
`;

export const hiddenOnMobile = css`
  @media (max-width: 767px) {
    display: none;
    visibility: hidden;
    height: 0;
    overflow: hidden;
  }
`;

export const hiddenOnTablet = css`
  @media (max-width: 1023px) {
    display: none;
    visibility: hidden;
    height: 0;
    overflow: hidden;
  }
`;

export const hiddenOnDesktop = css`
  @media (min-width: ${screenWidthSmall}) {
    display: none;
    visibility: hidden;
    height: 0;
    overflow: hidden;
  }
`;

export const cardStyles = css`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${colWhite};
`;

export const slideInBackgroundColor = keyframes`
  from {
    width: 0;
  }
  to {
    width: calc(100% + 1rem);
  }
`;

export const bouncyText = keyframes` 
  0%{
    transform: translateY(0);
    opacity: 0;
  }
  30% {
    transform: translateY(-18px);
  }
  50% {
    transform: translateY(3px);
  }
  70% {
    transform: translateY(-15px);
  }
  80% {
    transform: translateY(2px);
    opacity: 1;
  }
  90% {
    transform: translateY(-9px);
  }
  100%{
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideInBeak = keyframes` 
  0% {
    transform: translateY(-40px);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
