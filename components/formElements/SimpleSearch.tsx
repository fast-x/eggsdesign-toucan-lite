import styled from 'styled-components';
import React, { ChangeEvent } from 'react';
import TextInput from './TextInput';
import { screenWidthMedium } from '../../styles/variables';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const SimpleSearch: React.FC<Props> = ({ onChange, className }: Props) => {
  return (
    <Wrapper className={className}>
      <TextInput label="Search" hideLabel placeholder="Search posts" onChange={onChange} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 640px;

  input {
    height: 3rem;
    width: 400px;
    border-radius: 2rem;
    transition: width 0.2s;
    &:focus {
      width: 640px;
    }
  }

  @media (min-width: ${screenWidthMedium}) {
    max-width: unset;
  }
`;

export default SimpleSearch;
