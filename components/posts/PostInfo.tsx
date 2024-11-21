import styled from 'styled-components';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { ButtonSize, ButtonVariant } from '../../@types';
import { formatDateString } from '../../scripts/helpers';
import Avatar from '../Avatar';
import Tags from '../Tags';
import Button from '../clickables/Button';
import { Trash } from '@phosphor-icons/react';

import { screenWidthLarge, tokens } from '../../styles/variables';
import { Post, User } from '../../types';
import Comments from '../comments/Comments';
import AuthContext from '../../contexts/AuthContext';

type Props = {
  author: User;
  post: Post;
  isOpen?: boolean;
  closeCard?: () => void;
  loggedInUser?: User;
  className?: string;
};

const PostInfo: React.FC<Props> = ({ author, post, isOpen, className }: Props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  async function deletePostWithId(id: string) {
    const message = 'Are you sure you want to delete this post?';
    const confirmed = confirm(message);

    if (confirmed) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      router.push('/profile/me').then();
    }
  }

  const wrapperClassNames = classNames({
    [`is-open`]: isOpen,
    [`${className}`]: className,
  });

  return (
    <Wrapper className={wrapperClassNames}>
      <header>
        <Avatar image={author.image} size={48} />
        <div className="text-content">
          <span>
            {post.author.firstName} {post.author.lastName}
          </span>
          <span>{formatDateString(post._createdAt)}</span>
        </div>
      </header>
      <h1>{post.title}</h1>
      {post.description && <p className="desc">{post.description}</p>}
      {post.tags && <Tags tags={post.tags} />}
      {user && post.author._id === user._id && (
        <Button
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          onClick={() => deletePostWithId(post._id)}
          className="delete-post">
          <>
            <Trash size={16} weight="bold" />
            Delete post
          </>
        </Button>
      )}
      {user && (
        <Comments
          postId={post._id}
          initialList={post.comments && post.comments.length ? post.comments : []}
          user={user}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  header {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    .text-content {
      display: flex;
      flex-direction: column;
      span::before {
        content: '';
        margin-top: -0.125rem;
        display: block;
        height: 0;
      }
      span:first-child {
        color: ${tokens.colors.indigo['800'].value};
        font-size: 1.25rem;
      }
      span:last-child {
        color: ${tokens.colors.indigo['600'].value};
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 1199px) {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease, padding-top 0.2s ease;
    &.is-open {
      max-height: none;
      overflow-y: auto;
    }
  }
  &.is-open {
    padding: 2.5rem;
  }
  h1 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #072637;
  }
  .desc {
    color: #6a6a6a;
    font-size: 1.125rem;
    font-weight: 300;
  }
  .delete-post {
    margin-left: auto;
    margin-top: auto;
  }
  @media (min-width: ${screenWidthLarge}) {
    width: 0;
    overflow: hidden;
    transition: width 0.2s ease, opacity 0.2s ease;
    opacity: 0;
    &.is-open {
      width: 576px;
      overflow: visible;
      overflow-y: scroll;
      opacity: 1;
      height: calc(100vh - 80px);
    }
  }
`;

export default PostInfo;
