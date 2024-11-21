import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import TextInput from '../formElements/TextInput';
import TextArea from '../formElements/TextArea';

const DevFormElements: NextPage = () => {
  return (
    <>
      <h2>Form elements</h2>
      <Inputs>
        <TextInput label="Title (required)" id="add-post-title" required />
        <TextInput label="Description" id="add-post-description" />
        <TextInput label="Project dreams" id="add-post-title2" placeholder="This is a placeholder" />
        <TextArea label="Add more text" id="add-post-text-area" />
        <TextArea
          label="Add more text"
          placeholder="You can write sooo much here"
          id="add-post-text-area"
          maxLength={40}
        />
      </Inputs>
    </>
  );
};
const Inputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export default DevFormElements;
