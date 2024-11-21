import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ToucanLogo from '../../assest/visuals/ToucanLogo';
import AuthContext from '../../contexts/AuthContext';
import { buttonResetStyles } from '../../styles/styles';
import { bezier, tokens } from '../../styles/variables';
import { TagByUser } from '../../types';
import Avatar from '../Avatar';
import Button from '../clickables/Button';
import SimpleSearch from '../formElements/SimpleSearch';
import CreatePost from './CreatePost';
import ProfileMenu from './ProfileMenu';

interface Props {
  tags?: TagByUser[];
}

const Header: React.FC<Props> = ({ tags }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleWindowClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (profileMenuOpen) {
      window.addEventListener('click', handleWindowClick);
    }
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [profileMenuOpen]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  }

  //          {user && <UploadArea className="upload-area" user={user} allTags={tags} />}

  return (
    <>
      <Wrapper>
        <div className="header-left">
          <h1>Toucan</h1>
          <Link href="/" legacyBehavior>
            <a title="Go back to homepage" className="homepage-link">
              <ToucanLogo />
            </a>
          </Link>
        </div>
        {tags && <SimpleSearch className="search" onChange={handleSearch} />}
        <div className="header-right">
          {user && <CreatePost className="upload-area" user={user} allTags={tags} />}
          {user ? (
            <div className="profile-menu">
              <button className="toggle-profile-menu" onClick={toggleProfileMenu} title="Toggle profile menu">
                <Avatar className="avatar" size={40} image={user.image} />
              </button>
              <ProfileMenu open={profileMenuOpen} user={user} />
            </div>
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  gap: 1rem;
  padding: 0 2rem;
  height: 5rem;
  background-color: ${tokens.colors.white.value};
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .search {
    display: none;
    .hide-label {
      margin-bottom: 0;
    }
  }
  .profile-menu {
    margin-left: auto;
    .toggle-profile-menu {
      ${buttonResetStyles};
      background-color: transparent;
      .image-container {
        transition: transform ${bezier};
        transform: scale(1);
      }
      &:hover {
        text-decoration: underline;
        .image-container {
          transform: scale(1.2);
        }
      }
    }
    @media (max-width: 767px) {
      .toggle-profile-menu {
        .avatar {
          gap: 0;
        }
        .name {
          display: none;
        }
      }
    }
  }

  .create-post {
    background-color: ${tokens.colors.indigo[700].value}!important;
    border: none;
    color: white !important;
    height: 48px;
    border-radius: 3rem;
    &:hover {
      background-color: ${tokens.colors.indigo[800].value}!important;
    }
  }

  h1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    text-indent: -8000px;
    font-weight: 600;
    justify-self: flex-end;
    font-size: 2rem;
  }
`;

export default Header;
