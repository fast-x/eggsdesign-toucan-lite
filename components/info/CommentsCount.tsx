import React from 'react';
import styled from 'styled-components';
import { tokens } from '../../styles/variables';
import { Chat } from '@phosphor-icons/react';

type Props = {
  count: number;
};

const CommentsCount = ({ count }: Props) => {
  return (
    <Wrapper>
      <Chat size={16}  weight="bold" />
      <span>{count}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ::before {
    content: '•';
    color: ${tokens.colors.indigo['400'].value};
    font-size: 2rem;
    line-height: 1rem;
    padding: 0 .4rem 0 .4rem;
    margin-top: -.125rem;
  }
  display: flex;
  margin: 0;
  border-radius: 0;
  color: ${tokens.colors.indigo['700'].value};

  span {
    margin-left: .4rem;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 400;
  }
`;

export default CommentsCount;
