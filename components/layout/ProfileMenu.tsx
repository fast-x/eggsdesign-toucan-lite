import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ButtonVariant } from '../../@types';
import { tokens } from '../../styles/variables';
import { UserProfile } from '../../types';
import Button from '../clickables/Button';

type Props = {
  open: boolean;
  user: UserProfile;
};

const ProfileMenu: React.FC<Props> = ({ open }: Props) => {
  return (
    <Wrapper className={`${open && 'open'}`}>
      <ul>
        <li>
          <Link href="/profile/me" legacyBehavior>
            <a title="Go to your profile page">View profile</a>
          </Link>
        </li>
        <li>
          <Button onClick={() => signOut()} className="log-out" variant={ButtonVariant.TEXT}>
            Sign out
          </Button>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 1.5rem;
  z-index: 20;
  visibility: hidden;
  max-height: 0;
  overflow: hidden;
  background-color: white;
  padding: 0.75rem;
  border: 1px solid rgba(1, 22, 39, 0.12);
  box-shadow:
    0px -1px 4px rgba(0, 0, 0, 0.05),
    0px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 12px 0px 12px 12px;
  ul {
    padding-bottom: 0;
    list-style-type: none;
    li {
      text-align: right;
      margin-bottom: 0.5rem;
      button {
        float: right;
        margin: 0;
        padding: 0;
      }
      .btn--text {
        text-decoration: none;
        padding-left: 0;
        font-weight: normal;
      }
      a {
        text-decoration: none;
        color: ${tokens.colors.indigo[900].value};
        &:hover {
          color: ${tokens.colors.indigo[700].value};
        }
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  &.open {
    visibility: visible;
    max-height: unset;
  }
`;

export default ProfileMenu;
