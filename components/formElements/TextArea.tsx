import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import classNames from 'classnames';
import { inputFieldStyles, inputLabelStyles } from '../../styles/styles';
import { colBlack, colLava } from '../../styles/variables';

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  id?: string;
  label: string;
  disabled?: boolean;
  rows?: number;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  hideLabel?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  value?: string | undefined;
  maxLength?: number;
  className?: string;
};

export default function TextArea({
  id,
  label,
  required = false,
  disabled = false,
  rows = 5,
  hasError = false,
  errorMessage,
  placeholder,
  hideLabel = false,
  onChange,
  onFocus,
  onBlur,
  value,
  maxLength,
  className,
}: Props): JSX.Element {
  const wrapperClassNames = classNames({
    ['has-error']: hasError,
    ['has-error-message']: hasError && errorMessage,
    ['is-required']: required,
    ['hide-label']: hideLabel,
    [`${className}`]: className,
  });

  return (
    <Wrapper className={wrapperClassNames} disabled={disabled} hideLabel={hideLabel} rows={rows}>
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
      <textarea
        id={id}
        name={id}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {maxLength && <span className="max-char">Max characters: {maxLength}</span>}
      {hasError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ disabled: boolean; hideLabel: boolean; rows: number }>`
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
  &.hide-label {
    label {
      margin-bottom: 0;
      max-height: 0;
      overflow: hidden;
    }
  }

  textarea {
    ${inputFieldStyles};
    box-sizing: content-box;
    padding: ${({ hideLabel }) => (hideLabel ? '0.5rem 1rem' : '2.5rem 1rem 0.5rem 1rem')};
    max-height: ${({ rows }) => `${rows * 1.5}rem`};
    transition: all 0.15s ease-out;
    resize: none;
  }
  .max-char {
    display: inline-block;
    margin-top: 0.5rem;
  }

  label {
    ${inputLabelStyles};
    color: ${(props) => (props.disabled ? 'grey' : colBlack)};
  }
`;

const ErrorMessage = styled.span`
  color: ${colLava};
`;
