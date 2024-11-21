import React from 'react';
import classNames from 'classnames';
import { ButtonColor, ButtonSize, ButtonVariant } from '../../@types';
import styled from 'styled-components';
import { buttonResetStyles } from '../../styles/styles';
import {
  colAmber,
  colBlack,
  colDarkBlue,
  colEmerald,
  colGrey,
  colLava,
  colLightGrey,
  colSlate,
  colWhite,
  snappy,
} from '../../styles/variables';
import { darken, lighten } from 'polished';
import { tokens } from '../../styles/variables';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactElement | string;
  type?: 'button' | 'submit';
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  id?: string;
  icon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  noBorder?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  type = 'button',
  size = 'medium',
  variant = ButtonVariant.PRIMARY,
  color = ButtonColor.INDIGO,
  disabled = false,
  id,
  icon = false,
  onClick,
  children,
  noBorder = false,
  className,
  ...props
}) => {
  const buttonClassNames = classNames({
    [`btn--primary`]: !variant,
    [`btn--${variant}`]: variant,
    [`btn--${color}`]: color,
    [`btn--${size}`]: size,
    [`btn--icon`]: icon,
    [`no-border`]: noBorder,
    [`${className}`]: className,
  });
  return (
    <ToucanButton type={type} onClick={onClick} {...props} disabled={disabled} className={buttonClassNames}>
      {children}
    </ToucanButton>
  );
};

const ToucanButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${buttonResetStyles};
  padding: 0.4rem 1rem 0.6rem 1rem;
  max-height: 3rem;
  border-radius: 8px;
  border: none;
  transition: all ${snappy};
  &.btn--secondary {
    background-color: #fff;
    border-width: 1px;
    border-style: solid;
  }
  &.btn--lava:not(.btn--secondary) {
    background-color: ${colLava};
    color: #fff;
    border-color: ${colLava};
    &:hover:not([disabled]) {
      background-color: ${darken(0.2, colLava)};
      border-color: ${darken(0.2, colLava)};
    }
  }
  &.btn--lava.btn--secondary {
    border-color: ${colLava};
    &:hover:not([disabled]) {
      background-color: ${lighten(0.45, colLava)};
    }
  }

  &.btn--amber:not(.btn--secondary) {
    background-color: ${colAmber};
    border-color: ${colAmber};
    &:hover:not([disabled]) {
      background-color: ${darken(0.1, colAmber)};
      border-color: ${darken(0.1, colAmber)};
    }
  }
  &.btn--amber.btn--secondary {
    border-color: ${colAmber};
    &:hover:not([disabled]) {
      background-color: ${lighten(0.4, colAmber)};
    }
  }
  &.btn--darkblue:not(.btn--secondary) {
    background-color: ${colDarkBlue};
    border-color: ${colDarkBlue};
    color: #fff;
    &:hover:not([disabled]) {
      background-color: ${lighten(0.2, colDarkBlue)};
      border-color: ${lighten(0.2, colDarkBlue)};
    }
  }
  &.btn--darkblue.btn--secondary {
    border-color: ${colDarkBlue};
    &:hover:not([disabled]) {
      background-color: ${lighten(0.85, colDarkBlue)};
    }
  }

  &.btn--slate:not(.btn--secondary) {
    background-color: ${colSlate};
    border-color: ${colSlate};
    color: #fff;
    &:hover:not([disabled]) {
      background-color: ${darken(0.1, colSlate)};
      border-color: ${darken(0.1, colSlate)};
    }
  }
  &.btn--slate.btn--secondary {
    border-color: ${colSlate};
    &:hover:not([disabled]) {
      background-color: ${lighten(0.7, colSlate)};
    }
  }
  &.btn--indigo:not(.btn--secondary, .btn--text) {
    background-color: ${tokens.colors.indigo[800].value};
    border-color: ${tokens.colors.indigo[800].value};
    color: ${tokens.colors.white.value};
    &:hover:not([disabled]) {
      background-color: ${tokens.colors.indigo[900].value};
      border-color: ${tokens.colors.indigo[900].value};
    }
  }
  &.btn--indigo.btn--secondary {
    border-color: ${tokens.colors.indigo[300].value};
    &:hover:not([disabled]) {
      background-color: ${tokens.colors.indigo[300].value};
    }
  }
  &.btn--emerald:not(.btn--secondary, .btn--text) {
    background-color: ${colEmerald};
    border-color: ${colEmerald};
    color: ${colDarkBlue};
    &:hover:not([disabled]) {
      background-color: ${darken(0.1, colEmerald)};
      border-color: ${darken(0.1, colEmerald)};
    }
  }
  &.btn--emerald.btn--secondary {
    border-color: ${colEmerald};
    color: ${tokens.colors.indigo[700].value};
    &:hover:not([disabled]) {
      background-color: ${tokens.colors.indigo[300].value};
    }
  }
  &.btn--white:not(.btn--secondary) {
    background-color: ${colWhite};
    border-color: ${colWhite};
    color: ${colBlack};
    &:hover:not([disabled]) {
      background-color: ${lighten(0.9, '#000')};
      border-color: ${lighten(0.9, '#000')};
    }
  }
  &.btn--grey:not(.btn--secondary) {
    background-color: ${colGrey};
    border-color: ${colGrey};
    color: ${colBlack};
    &:hover:not([disabled]) {
      background-color: ${darken(0.1, colGrey)};
      border-color: ${darken(0.1, colGrey)};
    }
  }
  &.btn--grey.btn--secondary {
    border-color: ${colGrey};
    color: ${colGrey};
    &:hover:not([disabled]) {
      background-color: ${lighten(0.4, colGrey)};
    }
  }
  &.btn--primary:not(.btn--secondary):disabled {
    background-color: ${colGrey} !important;
    color: ${colLightGrey} !important;
    border-color: ${colGrey} !important;
  }
  &.btn--small {
    padding: 0.15rem 1rem 0.4rem 1rem;
  }
  &.btn--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  &.btn--text {
    text-decoration: underline;
    background: none;
    border: none;
    &:hover:not([disabled]) {
      color: ${colEmerald};
    }
    cursor: pointer;
  }
  &.no-border {
    border-color: transparent !important;
  }
  svg {
    display: block;
    margin: 0;
    width: 20px;
    height: 20px;
    path {
      //fill: currentColor;
      stroke: currentColor;
    }
  }
  &:disabled {
    border-color: ${colLightGrey} !important;
  }
`;

export default Button;
