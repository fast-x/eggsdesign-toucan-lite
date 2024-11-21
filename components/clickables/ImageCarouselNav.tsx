import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { colDarkBlue, colSlate, colWhite, snappy } from '../../styles/variables';
import { buttonResetStyles } from '../../styles/styles';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

type Props = {
  images: any[];
  imageIndex: number;
  setImageIndex: (newIndex: number) => void;
  backgroundColor?: string;
  className?: string;
};

const ImageCarouselNav: React.FC<Props> = ({
  images,
  imageIndex,
  setImageIndex,
  backgroundColor,
  className,
}: Props) => {
  return (
    <Wrapper className={className} backgroundColor={backgroundColor}>
      <button
        disabled={!(imageIndex - 1 >= 0)}
        onClick={() => imageIndex - 1 >= 0 && setImageIndex(imageIndex - 1)}
        title="Previous slide"
        className="prev">
        <CaretLeft size={16} weight="bold" />
      </button>
      <ul>
        {images.map((item, index) => {
          return (
            <li key={`${item._key}-${index}`}>
              <button
                onClick={() => setImageIndex(index)}
                title={`Go to slide number ${index + 1}`}
                className={`${imageIndex === index && 'active'}`}>
                <span />
              </button>
            </li>
          );
        })}
      </ul>
      <button
        disabled={!(imageIndex + 1 < images.length)}
        onClick={() => imageIndex + 1 < images.length && setImageIndex(imageIndex + 1)}
        title="Next slide"
        className="next">
        <CaretRight size={16} weight="bold" />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.nav<{ backgroundColor?: string }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem 0;
  background-color: ${(props) => props.backgroundColor || rgba(colWhite, 0.6)};
  button {
    transition: background-color ${snappy};
  }
  .next,
  .prev {
    ${buttonResetStyles};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    background-color: transparent;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    &:hover:not([disabled]) {
      background-color: ${colWhite};
    }
    svg {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
    }
    &:disabled {
      svg {
        path {
        }
      }
    }
  }
  ul {
    display: flex;
    gap: 0.25rem;
    list-style: none;
    li {
      button {
        ${buttonResetStyles};
        background-color: transparent;
        padding: 0.3rem;
        span {
          display: block;
          border-radius: 20px;
          width: 10px;
          height: 10px;
          background-color: transparent;
          border: 1px solid ${colDarkBlue};
        }
        &.active {
          span {
            background-color: ${colDarkBlue};
          }
        }
        &:hover {
          span {
            background-color: ${colSlate};
          }
        }
      }
    }
  }
`;

export default ImageCarouselNav;
