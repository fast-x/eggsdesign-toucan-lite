// import { Cards } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { lazy } from 'react';
import styled from 'styled-components';
import { bezier } from '../../styles/variables';
import { Post as PostType } from '../../types';
import Avatar from '../Avatar';
import CommentsCount from '../info/CommentsCount';
const Cards = lazy(() =>
  import('@phosphor-icons/react').then((module) => ({
    default: module.Cards,
  })),
);

type Props = {
  post: PostType;
};

const PostCard: React.FC<Props> = ({ post }: Props) => {
  const { images } = post;
  const image = images?.[0];
  return (
    <Post>
      <Link href={`/posts/${post._id}`} legacyBehavior>
        <a>
          <PostImageWrapper>
            {images.length > 1 && (
              <span className="more-images-icon" title="This post has several images">
                <Cards size={28} color="white" weight="fill" />
              </span>
            )}
            {image?.asset && (
              <Image
                className="post-image"
                src={`${image.asset.url}?w=880&h=560&fit=crop&crop=center`}
                width={880}
                height={560}
                alt=""
              />
            )}
          </PostImageWrapper>
          <TitleRow>
            <h3>{post.title}</h3>
          </TitleRow>
        </a>
      </Link>

      <section className="text-content">
        <Avatar
          size={20}
          image={post.author.image}
          name={`${post.author.firstName} ${post.author.lastName}`}
          link
          id={post.author._id}
        />
        {post.comments && post.comments.length && post.comments.length > 0 ? (
          <CommentsCount count={post.comments.length} />
        ) : null}
      </section>
    </Post>
  );
};

const Post = styled.li`
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .more-images-icon {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.125rem 1.125rem 3rem 3rem;
    z-index: 10;
    svg {
      filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.7));
    }
  }
  img {
    transition: transform ${bezier};
  }
  > a {
    display: block;
    text-decoration: none;
    &:hover {
      h3 {
        color: #225877;
      }
      img {
        transform: scale(1.1);
      }
    }
  }
  section.text-content {
    position: relative;
    display: flex;
    align-items: center;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #092f45;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .author {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const PostImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 0.8rem;
  margin-bottom: 0.4rem;
  background-color: white;
  > span {
    display: block !important;
  }
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  h3 {
    flex: 1 0 auto;
  }
`;

export default PostCard;
