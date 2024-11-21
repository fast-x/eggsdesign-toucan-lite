import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import SpeechBubble from '../SpeechBubble';
import { SpeechBubbleDirection } from '../../@types';

const DevSpeechBubbles: NextPage = () => {
  return (
    <>
      <h2>Colors</h2>
      <Bubbles>
        <SpeechBubble>Im&apos;a bubble. Put whatever you want in here!</SpeechBubble>
        <SpeechBubble direction={SpeechBubbleDirection.RIGHT}>
          Im&apos;a another bubble. My arrow can go the other way too! AWESOME
        </SpeechBubble>
        <SpeechBubble direction={SpeechBubbleDirection.TOP}>It can even to straight up, pew!</SpeechBubble>
      </Bubbles>
    </>
  );
};
const Bubbles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;
export default DevSpeechBubbles;
