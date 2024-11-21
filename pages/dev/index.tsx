import type { NextPage } from 'next';
import Link from 'next/link';
import { CenterContent } from '../../components';
import Buttons from '../../components/dev/Buttons';
import Colors from '../../components/dev/Colors';
import FormElements from '../../components/dev/FormElements';
import Icons from '../../components/dev/Icons';
import Loading from '../../components/dev/Loading';
import SpeechBubbles from '../../components/dev/SpeechBubbles';

const DevPage: NextPage = () => {
  return (
    <main style={{ marginBottom: '4rem' }}>
      <CenterContent>
        <h1>Components and assets</h1>
        <Link href="/" legacyBehavior>
          <a>Go back home</a>
        </Link>
        <Loading />
        <Icons />
        <FormElements />
        <Colors />
        <SpeechBubbles />
        <Buttons />
      </CenterContent>
    </main>
  );
};

export default DevPage;
