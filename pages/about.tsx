import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import styled from 'styled-components';
import Quarter1 from '../assest/icons/quarter-1.svg';
import Quarter2 from '../assest/icons/quarter-2.svg';
import Quarter4 from '../assest/icons/quarter-4.svg';
import GreenWave from '../assest/visuals/GreenWave';
import ToucanLogo from '../assest/visuals/ToucanLogo';
import { CenterContent } from '../components';
import Slogan from '../components/info/Slogan';
import Header from '../components/layout/Header';
import Layout from '../components/layout/Layout';
import { getProfileFromEmail } from '../scripts/api';
import { loginRedirectConfig } from '../scripts/helpers';
import { colLightMint, screenWidthSmall } from '../styles/variables';
import { UserProfile } from '../types';

interface Props {
  user: UserProfile;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session === null || !session.user?.email) {
    return loginRedirectConfig;
  }

  const userProfile = await getProfileFromEmail(session.user.email);
  console.log('userProfile:', userProfile);

  const props: Props = {
    user: {
      _id: userProfile._id,
      email: session.user.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      image: userProfile?.image || null,
    },
  };

  return { props };
};

const AboutPage: NextPage<Props> = ({ user }: Props) => {
  return (
    <Layout>
      <Header />
      <main>
        <PageWrapper>
          <section className="intro">
            <Slogan className="slogan" />
            <GreenWave />
            <ToucanLogo />
          </section>
          <section className="steps">
            <CenterContent>
              <ul>
                <li>
                  <span className="icon">
                    <Quarter4 />
                  </span>
                  <h2>Share with others</h2>
                  <p> An easy way to quickly upload finished projects or work in progress. </p>
                </li>
                <li>
                  <span className="icon">
                    <Quarter1 />
                  </span>
                  <h2>Stay up to date</h2>
                  <p>Know what your colleagues are currently working on or have delivered.</p>
                </li>
                <li>
                  <span className="icon">
                    <Quarter2 />
                  </span>
                  <h2>Feel inspired</h2>
                  <p>
                    An easy way to absorb your colleagues visuals. Find the inspiration you need in the work of your
                    team.
                  </p>
                </li>
              </ul>
            </CenterContent>
          </section>
          <section className="why">
            <CenterContent>
              <header>
                <ToucanLogo />
                <h2>But why Toucan?</h2>
              </header>
              <ol>
                <li>
                  <h3>Toucans are friendly, playful and intelligent birds</h3>
                  <p>Exactly how we think sharing should be; positive, fun but also fruitful.</p>
                </li>
                <li>
                  <h3>Toucans can also be a bit shy</h3>
                  <p>
                    We understand that you can feel shy sometimes when sharing your work. Therefore we want to be super
                    low-ley to share. No need to be shy.
                  </p>
                </li>
                <li>
                  <h3>Toucans are social birds</h3>
                  <p>
                    We believe your co-creatives can help you to thrive. Therefore we want to stimulate you to act like
                    a group and ask for input.
                  </p>
                </li>
                <li>
                  <h3>There are many different</h3>
                  <p>Just as there are many different kinds of creatives. Use the tool in your own way!</p>
                </li>
              </ol>
            </CenterContent>
          </section>
        </PageWrapper>
      </main>
    </Layout>
  );
};
const PageWrapper = styled.div`
  .intro {
    position: relative;
    min-height: 400px;
    .slogan {
      margin: 2rem auto;
    }
    @media (min-width: ${screenWidthSmall}) {
      min-height: 600px;
    }
    svg {
      display: block;
      position: absolute;
    }
    .toucan-logo {
      bottom: calc(5rem + 5vw);
      right: 65%;
      border: 1px solid red !important;
      width: 90px;
      height: 90px;
      z-index: 1;
    }
    .green-wave {
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: auto;
      z-index: 3;
    }
  }
  .steps {
    background-color: ${colLightMint};
    ul {
      list-style: none;
      padding: 2rem 0 1rem;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 0;
        gap: 1.5rem;
        margin: 0 auto;
        max-width: 230px;
        .icon {
          display: block;
          width: 42px;
          height: 42px;
          svg {
            width: 100%;
            display: block;
          }
        }
        p,
        h2 {
          text-align: center;
        }
      }
    }
    @media (min-width: ${screenWidthSmall}) {
      ul {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        li {
          width: 33%;
        }
      }
    }
  }
  .why {
    padding: 4rem 0 12rem;
    header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      h2 {
        margin: 0;
      }
    }
    ol {
      padding-left: 2.5rem;
      padding-right: 1rem;
      li {
        margin-bottom: 1.5rem;
        font-weight: bold;
        h3 {
          font-weight: bold;
        }
        p {
          font-weight: normal;
        }
      }
    }
    @media (min-width: ${screenWidthSmall}) {
      padding: 4rem 0 2rem;
    }
  }
`;

export default AboutPage;
