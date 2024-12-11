import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Signin() {
  const router = useRouter();
  const { status } = useSession();

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     console.log('No JWT');
  //     console.log(status);
  //     void signIn(undefined, { callbackUrl: '/' });
  //   } else if (status === 'authenticated') {
  //     void router.push('/');
  //   }
  // }, [status]);

  // TEST
  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('No JWT');

      console.log('2 - TEST - add error msg in signin')
      void signIn('azure-ad', { callbackUrl: '/' }).catch((err) => console.error('Sign-in error:', err));
    } else if (status === 'authenticated') {
      void router.push('/');
    }
  }, [status]);

  return <div></div>;
}
