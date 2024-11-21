import styled from 'styled-components';
import React from 'react';
import { screenWidthSmall } from '../../styles/variables';
import PostCard from './PostCard';
import { Post } from '../../types';

type Props = {
  posts: Post[];
  title?: string;
};

const PostList: React.FC<Props> = ({ posts, title }: Props) => {
  if (posts.length == 0) {
    return (
      <div>
        <h3>No posts found. Please add some!</h3>
      </div>
    );
  }

  return (
    <Wrapper>
      {/*tags && tags.length > 2 && (
        <TagsFilter>
          <p>Latest tags:</p> <Tags tags={tags.slice(0, 3)} />
        </TagsFilter>
      )*/}
      {title && <h2 className="post-list-title">{title}</h2>}
      <Posts>
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Posts>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .post-list-title {
    margin-top: 4rem;
  }
`;

const TagsFilter = styled.div``;

const Posts = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(344px, 1fr));
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem;
  gap: 1.5rem;

  @media screen and (min-width: ${screenWidthSmall}) {
    flex-direction: unset;
    flex-wrap: wrap;
    padding: 1.5rem;
  }

  @media screen and (min-width: 1200px) {
  }
`;

export default PostList;
