import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { colBlack, colEmerald, colGrey, colLightGrey, colWhite, screenWidthSmall } from '../../styles/variables';
import JumpToTop from '../clickables/JumpToTop';
import { CenterContent } from '../index';
import Leaves from './Leaves';

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Leaves />
      <CenterContent>
        <div className="left">
          <h2>Toucan Beta</h2>
          <p>
            The easiest, most engaging and fun platform for creative teams to share, discuss and develop creative work
            and ideas.
          </p>
        </div>
        <div className="right">
          <JumpToTop />
          <Link href="/about" title="About Toucan">
            About Toucan
          </Link>
        </div>
        <div className="bottom">
          <p>Made with ❤ from EGGS Design</p>
        </div>
      </CenterContent>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  position: relative;
  margin-top: 8rem;
  padding: 1rem 0;
  background-color: ${colWhite};
  color: ${colBlack};
  p {
    color: ${colGrey};
  }
  a {
    font-weight: 600;
    &:hover {
      color: ${colEmerald};
    }
  }
  > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr) auto;
    .bottom {
      padding: 1.5rem 0 0;
    }
    .right {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: flex-end;
    }
    .left {
      grid-area: 1 / 1 / 2 / 2;
    }
    .right {
      grid-area: 2 / 1 / 3 / 2;
    }
    .bottom {
      grid-area: 3 / 1 / 4 / 2;
      color: ${colGrey};
      border-top: 1px solid ${colLightGrey};
    }
    @media (min-width: ${screenWidthSmall}) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr auto;
      .left {
        grid-area: 1 / 1 / 2 / 2;
      }
      .right {
        grid-area: 1 / 2 / 2 / 3;
      }
      .bottom {
        grid-area: 2 / 1 / 3 / 3;
      }
    }
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default Footer;
