import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import React, { useCallback, useContext, useEffect } from 'react';
import { CenterContent } from '../components';
import Header from '../components/layout/Header';
import Layout from '../components/layout/Layout';
import PostList from '../components/posts/PostList';
import AuthContext from '../contexts/AuthContext';
import { getAllPosts, getAllTags, getProfileFromEmail } from '../scripts/api';
import { loginRedirectConfig } from '../scripts/helpers';
import { Post, TagByUser, User } from '../types';

interface Props {
  user: User;
  posts: Post[];
  tags: TagByUser[];
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  

  console.log('1 TEST - Session Response:', session);

  if (session === null || !session.user?.email) {
    return loginRedirectConfig;
  }

  try {
    const userProfile = await getProfileFromEmail(session.user.email);
    const tags = await getAllTags();
    const posts = await getAllPosts();

    return {
      props: {
        user: {
          ...userProfile,
          email: session.user.email,
          image: userProfile?.image || null,
        },
        posts,
        tags,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      notFound: true, // Return a 404 page in case of errors
    };
  }
};

const Home: NextPage<Props> = ({ user, posts, tags }) => {
  const [fetchedPosts] = React.useState(posts);
  const { setUser } = useContext(AuthContext);
  const setUserAuth = useCallback(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    setUserAuth();
  }, [setUserAuth]);

  return (
    <>
      <Layout>
        <Header tags={tags} />
        <main>
          <CenterContent>
            <section>{fetchedPosts && <PostList posts={fetchedPosts} />}</section>
          </CenterContent>
        </main>
      </Layout>
    </>
  );
};

export default Home;
