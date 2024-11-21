import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';

import {
  colAmber,
  colEmerald,
  colDarkBlue,
  colLava,
  colSlate,
  colBlack,
  colWhite,
  colGreen,
  colGrey,
  colLightGrey,
  colMint,
  colWarmGrey,
  colLightMint,
  colLightBlue,
} from '../../styles/variables';

const DevColors: NextPage = () => {
  const colorData = [
    {
      color: colBlack,
      name: 'Black',
    },
    {
      color: colWhite,
      name: 'White',
    },
    {
      color: colGrey,
      name: 'Grey',
    },
    {
      color: colWarmGrey,
      name: 'Warm grey',
    },
    {
      color: colLightGrey,
      name: 'Light grey',
    },
    {
      color: colEmerald,
      name: 'Emerald',
    },
    {
      color: colLava,
      name: 'Lava',
    },
    {
      color: colAmber,
      name: 'Amber',
    },
    {
      color: colGreen,
      name: 'Green',
    },
    {
      color: colDarkBlue,
      name: 'Dark blue',
    },
    {
      color: colSlate,
      name: 'Slate',
    },
    {
      color: colMint,
      name: 'Mint',
      border: true,
    },
    { color: colLightMint, name: 'Light mint' },
    {
      color: colLightBlue,
      name: 'Light blue',
    },
  ];

  return (
    <>
      <h2>Colors</h2>
      <Colors>
        {colorData.map((item, index) => {
          return (
            <ColorWrapper key={`color-${index}-${item.color}`}>
              <div>
                <Color style={{ backgroundColor: item.color }} className={`${item.border && 'has-border'}`} />
                <span>{item.name}</span>
                <span>{item.color}</span>
              </div>
            </ColorWrapper>
          );
        })}
      </Colors>
    </>
  );
};
const Colors = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;
const ColorWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: 3rem;

  > div {
    width: 13rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    span {
      display: block;
      margin-bottom: 0.5rem;
      width: 100%;

      &:last-of-type {
        text-transform: uppercase;
      }
    }
  }
`;

const Color = styled.div`
  margin-bottom: 0.5rem;
  width: 100%;
  height: 5rem;
  background-color: #888;
  &.has-border {
    border: 1px solid ${colBlack};
  }
`;

export default DevColors;
