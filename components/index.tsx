import { colGrey, screenWidthLarge, screenWidthMedium, screenWidthSmall } from '../styles/variables';
import styled from 'styled-components';

export const CenterContent = styled.div<{ newMaxWidth?: string }>`
  margin: 0 auto;
  //padding: 0 1.5rem;
  background-color: #F2F3FA;

  //max-width: ${(props) => (props.newMaxWidth ? props.newMaxWidth : screenWidthLarge)};
  
  @media screen and (min-width: ${screenWidthSmall}) {
  }
  @media screen and (min-width: ${screenWidthMedium}) {
  }
`;

export const Note = styled.p`
  font-size: 0.875rem;
  color: ${colGrey};
`;
