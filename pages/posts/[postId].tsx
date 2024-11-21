import { ArrowLeft, ArrowsInSimple, ArrowsOutSimple } from '@phosphor-icons/react';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ButtonVariant } from '../../@types';
import Button from '../../components/clickables/Button';
import ImageCarouselNav from '../../components/clickables/ImageCarouselNav';
import Header from '../../components/layout/Header';
import Layout from '../../components/layout/Layout';
import PostInfo from '../../components/posts/PostInfo';
import AuthContext from '../../contexts/AuthContext';
import { getAllTags, getPostById, getPostsByAuthorId, getProfileFromEmail } from '../../scripts/api';
import { loginRedirectConfig } from '../../scripts/helpers';
import { screenWidthLarge } from '../../styles/variables';
import { Post as PostType, TagByUser, User } from '../../types';

interface Props {
  user: User;
  post: PostType;
  morePostsByUser: PostType[];
  tags: TagByUser[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session === null || !session.user?.email) {
    return loginRedirectConfig;
  }
  const userProfile = await getProfileFromEmail(session.user.email);
  const post = await getPostById(context.query.postId as string);
  const tags = await getAllTags();
  const morePostsByUser = await getPostsByAuthorId(post.author._id);

  const props: Props = {
    user: {
      ...userProfile,
      email: session.user.email,
      // image: userProfile.image ?? null,
      image: userProfile?.image || null,
    },
    post,
    morePostsByUser,
    tags,
  };
  return { props };
};

const Post: NextPage<Props> = ({ user, post, morePostsByUser, tags }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const { images } = post;
  const image = images?.[imageIndex];
  const [postInfoOpen, setPostInfoOpen] = useState<boolean>(true);
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const setUserAuth = useCallback(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    setUserAuth();
  }, [setUserAuth]);

  const togglePostInfo = () => {
    setPostInfoOpen(!postInfoOpen);
  };

  return (
    <Layout>
      <Header tags={tags} />
      <main>
        <PageWrapper className={`${postInfoOpen && 'post-info-open'}`}>
          <ImageCard className={`${postInfoOpen && 'post-info-open'}`}>
            <header>
              <Button variant={ButtonVariant.SECONDARY} icon onClick={() => router.back()} className="back-button">
                <ArrowLeft size={16} weight="bold" />
              </Button>
              <Button
                variant={ButtonVariant.SECONDARY}
                icon
                onClick={() => togglePostInfo()}
                className="open-info-button">
                {postInfoOpen ? (
                  <ArrowsOutSimple size={16} weight="bold" />
                ) : (
                  <ArrowsInSimple size={16} weight="bold" />
                )}
              </Button>
            </header>

            <ImageWrapper>
              {image && image?.asset?.url && (
                <div className="frame">
                  <img src={`${image.asset.url}?w=2000&h=2000`} alt="Post image" />
                </div>
              )}
              {images && images.length > 1 && (
                <ImageCarouselNav images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
              )}
            </ImageWrapper>
          </ImageCard>
          <PostInfo
            author={post.author}
            post={post}
            isOpen={postInfoOpen}
            closeCard={togglePostInfo}
            loggedInUser={user}
          />
        </PageWrapper>

        {/*morePostsByUser && (
            <PostList posts={morePostsByUser} title={`More by ${post.author.firstName} (${morePostsByUser?.length})`} />
          )*/}
      </main>
    </Layout>
  );
};

const PageWrapper = styled.div`
  @media (min-width: ${screenWidthLarge}) {
    display: flex;
    align-items: flex-start;
  }
`;
const ImageCard = styled.div`
  position: relative;

  header {
    padding: 1rem;
    position: absolute;
    z-index: 10;
    top: 0;
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .open-info-button {
      transition: right 0.25s ease;
      display: none;
    }
  }

  @media (max-width: 11199px) {
    .frame {
      background-color: #f2f3fa;
      height: calc(100vh - 80px);
      transition: max-height 0.2s ease;
    }
  }
  @media (max-width: ${screenWidthLarge}) {
    .frame {
      max-height: 60vh;
      transition: max-height 0.2s ease;
    }
    &.post-info-open {
      .open-info-button {
        right: 1rem;
      }
      .frame {
        max-height: 60vh;
      }
    }
  }
  @media (min-width: ${screenWidthLarge}) {
    margin: 0;
    width: 100%;
    transition: width 0.25s ease;
    &.post-info-open {
      width: calc(100%-576px);
    }
    header .open-info-button {
      display: flex;
    }
  }
`;

const ImageWrapper = styled.div`
  height: 100%;

  @media (min-width: ${screenWidthLarge}) {
    min-height: calc(100vh - 80px);
  }

  .frame {
    position: relative;
    display: flex;
    justify-items: center;
    img {
      display: block;
      height: auto;
      width: 100%;
      object-fit: contain;
    }
  }
`;

export default Post;
