import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import classNames from 'classnames';
import { rgba } from 'polished';
import { bodyText, inputFieldStyles, inputLabelStyles } from '../../styles/styles';
import { colBlack, colLava, tokens } from '../../styles/variables';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  hideLabel?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | undefined;
  icon?: React.ReactElement;
  className?: string;
};

export default function TextInput({
  id,
  label,
  type = 'text',
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
  placeholder,
  hideLabel = false,
  onChange,
  value,
  icon,
  className,
  ...rest
}: Props): JSX.Element {
  const wrapperClassNames = classNames({
    ['has-error']: hasError,
    ['has-error-message']: hasError && errorMessage,
    ['is-required']: required,
    ['hide-label']: hideLabel,
    [`${className}`]: className,
  });
  return (
    <Wrapper className={wrapperClassNames} disabled={disabled} hideLabel={hideLabel}>
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
      <input
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        type={type}
        onChange={onChange}
        {...rest}
      />
      {icon && <span className="input-icon">{icon}</span>}
      {hasError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
}

const ExtraLabel = styled.span``;

const Wrapper = styled.div<{ disabled: boolean; hideLabel: boolean }>`
  position: relative;
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;

  &.is-required {
    label {
      span:first-child:after {
        content: ' *';
        color: ${colLava};
      }
    }
  }
  &.has-error {
    input {
      border-color: ${colLava};
    }
  }
  &.has-error-message {
    input {
      margin-bottom: 0.5rem;
    }
  }

  input {
    ${bodyText};
    ${inputFieldStyles};
    padding: ${(props) => (props.hideLabel ? '0.5rem 1rem' : '2.5rem 1rem 0.5rem 1rem')};
    &::placeholder {
      color: ${tokens.colors.indigo['700'].value};
    }
    &:hover {
      border: 1px solid #94a2d6;
    }
    &:focus:not([disabled]) {
      border: 1px solid ${tokens.colors.indigo[300].value};
      outline: none;
      background-color: white;
    }
  }

  label {
    ${bodyText};
    ${inputLabelStyles};
    color: ${(props) => (props.disabled ? 'grey' : colBlack)};
    font-weight: 600;
    position: absolute;
    top: 0.75rem;
    left: 1rem;
  }

  &.hide-label {
    label {
      margin-bottom: 0;
      max-height: 0;
      overflow: hidden;
    }
  }
  &.has-extra-label {
    label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      ${ExtraLabel} {
        color: ${rgba('#fff', 0.6)};
      }
    }
  }
`;

const ErrorMessage = styled.span`
  color: ${colLava};
`;
