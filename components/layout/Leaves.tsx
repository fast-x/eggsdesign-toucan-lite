import styled from 'styled-components';
import React from 'react';
import Leaf2 from '../../assest/visuals/Leaf2';
import Leaf3 from '../../assest/visuals/Leaf3';
import Leaf4 from '../../assest/visuals/Leaf4';

const Leaves: React.FC = () => {
  return (
    <Wrapper>
      <Leaf className="leaf-2">
        <Leaf2 />
      </Leaf>
      <Leaf className="leaf-3">
        <Leaf3 />
      </Leaf>
      <Leaf className="leaf-4-2">
        <Leaf4 />
      </Leaf>
      <Leaf className="leaf-3-2">
        <Leaf3 />
      </Leaf>
      <Leaf className="leaf-2-a">
        <Leaf2 />
      </Leaf>
      <Leaf className="leaf-4">
        <Leaf4 />
      </Leaf>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: -19rem;
  left: 0;
  width: 100%;
  height: 20rem;
  z-index: -1;
`;

const Leaf = styled.div`
  position: absolute;
  svg {
    display: block;
    width: 100%;
  }
  &.leaf-3 {
    bottom: 0;
    left: 0;
  }
  &.leaf-2 {
    bottom: 1rem;
    left: 18%;
  }
  &.leaf-4-2 {
    bottom: 0;
    left: 35%;
    svg {
      height: 130px;
      path {
        stroke: #daefec;
      }
    }
  }
  &.leaf-3-2 {
    bottom: 0;
    right: 25%;
    transform: scaleX(-1) rotate(50deg);
    svg {
      width: 138px;
      height: 128px;
      path {
        stroke-width: 8;
        stroke: #3dbeb3;
      }
    }
  }
  &.leaf-2-a {
    bottom: 0;
    right: 12%;
    transform: rotate(-70deg);
    svg {
      path {
        stroke: #95d4ce;
      }
    }
  }

  &.leaf-4 {
    bottom: 0;
    right: 5%;
  }
`;

export default Leaves;
