import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { ButtonColor, ButtonVariant } from '../../@types';
import Button from '../clickables/Button';
import CloseIcon from '../../assest/icons/close.svg';
import DeleteIcon from '../../assest/icons/delete.svg';

const DevButtons: NextPage = () => {
  return (
    <>
      <h2>Buttons</h2>
      <Buttons>
        <div>
          <Button>Button primary emerald</Button>
        </div>
        <div>
          <Button variant={ButtonVariant.SECONDARY}>Button secondary emerald</Button>
        </div>
        <div>
          <Button color={ButtonColor.DARKBLUE}>Button primary dark blue</Button>
        </div>
        <div>
          <Button variant={ButtonVariant.SECONDARY} color={ButtonColor.DARKBLUE}>
            Button secondary dark blue
          </Button>
        </div>
        <div>
          <Button color={ButtonColor.AMBER}>Button primary amber</Button>
        </div>
        <div>
          <Button variant={ButtonVariant.SECONDARY} color={ButtonColor.AMBER}>
            Button secondary amber
          </Button>
        </div>
        <div>
          <Button color={ButtonColor.LAVA}>Button primary lava</Button>
        </div>
        <div>
          <Button variant={ButtonVariant.SECONDARY} color={ButtonColor.LAVA}>
            Button secondary lava
          </Button>
        </div>
        <div>
          <Button color={ButtonColor.WHITE}>Button primary white</Button>
        </div>
        <div>
          <Button color={ButtonColor.SLATE}>Button primary slate</Button>
        </div>
        <div>
          <Button color={ButtonColor.SLATE} variant={ButtonVariant.SECONDARY}>
            Button secondary slate
          </Button>
        </div>
        <div>
          <Button disabled>Button disabled</Button>
        </div>
        <div>
          <Button variant={ButtonVariant.SECONDARY} disabled>
            Button secondary disabled
          </Button>
        </div>
        <div>
          <Button variant={ButtonVariant.SECONDARY} color={ButtonColor.AMBER} title="Close this" icon>
            <DeleteIcon />
          </Button>
        </div>
        <div>
          <Button variant={ButtonVariant.SECONDARY} color={ButtonColor.LAVA} title="Close this" icon>
            <CloseIcon />
          </Button>
        </div>
        <div>
          <Button variant={ButtonVariant.TEXT} title="Text button, no background">
            Normal text button
          </Button>
        </div>
        <div>
          <Button color={ButtonColor.AMBER} title="Close this" icon>
            <CloseIcon />
          </Button>
        </div>
        <div>
          <Button color={ButtonColor.LAVA} title="Close this" icon>
            <CloseIcon />
          </Button>
        </div>
        <div>
          <Button color={ButtonColor.INDIGO} title="Close this" icon>
            <DeleteIcon />
          </Button>
        </div>
      </Buttons>
    </>
  );
};
const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export default DevButtons;
