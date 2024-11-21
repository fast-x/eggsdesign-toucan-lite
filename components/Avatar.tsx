import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { colBlack, snappy } from '../styles/variables';
import { Image as ImageType, Ref } from '../types';

type Props = {
  image: Ref<ImageType>;
  name?: string;
  size?: number;
  title?: string;
  isPostPage?: boolean;
  isProfilePage?: boolean;
  link?: boolean;
  id?: string;
  isCenter?: boolean;
  userTitle?: string;
  className?: string;
};

const Avatar: React.FC<Props> = ({
  name = '',
  image,
  size = 48,
  title,
  isPostPage = false,
  isProfilePage = false,
  link = false,
  id,
  isCenter = false,
  userTitle,
  className,
}) => {
  const wrapperClassNames = classNames({
    [`is-profile-page`]: isProfilePage,
    [`is-post-page`]: isPostPage,
    [`is-center`]: isCenter,
    [`${className}`]: className,
  });
  return (
    <Wrapper className={wrapperClassNames} height={size}>
      {link ? (
        <Link href={`/profile/${id}`} legacyBehavior>
          <a>
            <div className="image-container" style={{ height: size, width: size }}>
              {image && (
                <Image
                  src={`${image.asset.url}?h=${size * 2}`}
                  height={48}
                  width={48}
                  alt={`Avatar ${name && `for ${name}`}`}
                  layout={'responsive'}
                />
              )}
            </div>
            <div>
              {title && <h2 className="title">{title}</h2>}
              {name && <span className="name">{name}</span>}
              {userTitle && <span className="user-title">{userTitle}</span>}
            </div>
          </a>
        </Link>
      ) : (
        <div className="image-container" style={{ height: size, width: size }}>
          {image && (
            <>
              <Image
                src={`${image.asset.url}?h=${size * 2}`}
                height={48}
                width={48}
                alt={`Avatar ${name && `for ${name}`}`}
                layout={'responsive'}
              />
              <div>
                {title && <h2 className="title">{title}</h2>}
                {name && <span className="name">{name}</span>}
                {userTitle && <span className="user-title">{userTitle}</span>}
              </div>
            </>
          )}
        </div>
      )}
    </Wrapper>
  );
};

// TODO make images fill both height and width on small screens. Was "broken" after I switched to Next Image
const Wrapper = styled.section<{ height?: number }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  a {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    text-decoration: none;

    .name {
      &::before {
        content: '';
        margin-top: -0.125rem;
        display: block;
        height: 0;
      }
    }
  }

  .image-container {
    border-radius: 50%;
    overflow: hidden;
    min-height: ${(props) => props.height && `${props.height}px`};
    min-width: ${(props) => props.height && `${props.height}px`};
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: filter ${snappy};
    }
  }
  .name {
    color: #49537a;
    font-weight: 400;
    font-size: 1rem;
  }
  .user-title {
    display: block;
  }
  &.is-profile-page {
    flex-direction: column;
    text-align: center;
    .name {
      color: ${colBlack};
      font-size: 2rem;
      font-weight: 600;
    }
  }
  &.is-center {
    flex-direction: column;
    text-align: center;
  }
`;

export default Avatar;
