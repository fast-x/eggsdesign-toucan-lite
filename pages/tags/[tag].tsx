import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useCallback, useContext, useEffect } from 'react';
import { CenterContent } from '../../components';
import Header from '../../components/layout/Header';
import Layout from '../../components/layout/Layout';
import PostList from '../../components/posts/PostList';
import AuthContext from '../../contexts/AuthContext';
import { getAllPostsByTag, getAllTags, getProfileFromEmail } from '../../scripts/api';
import { Post, TagByUser, User } from '../../types';

interface Props {
  user: User;
  posts: Post[];
  tag: string | string[] | undefined;
  tags: TagByUser[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session === null || !session.user?.email) {
    return {
      props: { user: null, projects: null },
      redirect: {
        destination: '/signin', // TODO: Change this to '/log-in' when that page has been styled
        permanent: false,
      },
    };
  }
  const userProfile = await getProfileFromEmail(session.user.email);
  const posts = await getAllPostsByTag(context.query.tag as string);
  const tags = await getAllTags();

  const props: Props = {
    user: {
      ...userProfile._id,
      email: session.user.email,
      // image: userProfile.image ?? null,
      image: userProfile?.image || null,
    },
    posts,
    tags,
    tag: context.query.tag,
  };

  return { props };
};

const Tag: NextPage<Props> = ({ user, posts, tag, tags }) => {
  const { setUser } = useContext(AuthContext);
  const setUserAuth = useCallback(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    setUserAuth();
  }, [setUserAuth]);

  return (
    <Layout>
      <Header tags={tags} />
      <main>
        <CenterContent>
          <PostList posts={posts} title={`All posts with #${tag}`} />
        </CenterContent>
      </main>
    </Layout>
  );
};

export default Tag;
