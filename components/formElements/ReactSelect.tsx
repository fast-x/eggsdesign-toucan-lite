import React from 'react';
import styled from 'styled-components';

import classNames from 'classnames';
import { rgba } from 'polished';
import { inputFieldStyles, inputLabelStyles } from '../../styles/styles';
import { colLava, tokens } from '../../styles/variables';
import CreatableSelect from 'react-select/creatable';

type Props = {
  id?: string;
  label: string;
  options: { _id?: string; value: string; label: string }[] | undefined;
  onChange: (arg0: any) => void; // Dirty, but I did not get this to work TODO
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  hideLabel?: boolean;
  className?: string;
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#011627',
    padding: '0.5rem 1rem',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem',
    backgroundColor: 'transparent',
    color: '#011627',
    borderRadius: 10,
  }),
  menuList: (base: any) => ({
    ...base,
    maxHeight: '170px',
  }),
};

export default function ReactSelect({
  id,
  label,
  options,
  onChange,
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
  placeholder,
  hideLabel = false,
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
    <Wrapper className={wrapperClassNames} disabled={disabled}>
      <CreatableSelect
        options={options}
        isMulti
        name="tags"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="custom-react-select"
        styles={customStyles}
        classNamePrefix="custom-react-select"
      />
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
      {hasError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
}

const ExtraLabel = styled.span``;

const Wrapper = styled.div<{ disabled: boolean }>`
  position: relative;
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  div {
    position: relative;
  }

  > div:first-of-type > div:first-of-type {
    ${inputFieldStyles};
  }

  .custom-react-select__placeholder {
    color: ${tokens.colors.indigo['700'].value};
  }

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
    ${inputFieldStyles};

    & div & {
      margin: 0;
    }
  }

  label {
    ${inputLabelStyles};
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
