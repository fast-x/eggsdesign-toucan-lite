import type { GetStaticProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CenterContent } from '../components';
import Header from '../components/layout/Header';
import Layout from '../components/layout/Layout';
import PostList from '../components/posts/PostList';
import AuthContext from '../contexts/AuthContext';
import { getAllPosts, getAllTags } from '../scripts/api';
import { Post, TagByUser, User } from '../types';

interface Props {
  posts: Post[];
  tags: TagByUser[];
}

const Home: NextPage<Props> = ({ posts, tags }) => {
  const [fetchedPosts] = useState(posts);
  const { setUser } = useContext(AuthContext);
  const { data: session, status } = useSession();
  const [user, setUserState] = useState<User | null>(null);

  const setUserAuth = useCallback(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUserState({
          ...session.user,
          email: session.user.email ?? '',
          // @ts-ignore
          image: session.user.image ?? null,
        });
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    setUserAuth();
  }, [setUserAuth]);

  return (
    <>
      <Layout>
        <Header tags={tags} />
        <main>
          <CenterContent>
            {status === 'authenticated' ? <p>Welcome, {session?.user?.email}!</p> : <p>You are not logged in.</p>}
            <section>{fetchedPosts && <PostList posts={fetchedPosts} />}</section>
          </CenterContent>
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const tags = await getAllTags();
    const posts = await getAllPosts();

    return {
      props: {
        posts,
        tags,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);

    return {
      notFound: true,
    };
  }
};

export default Home;
