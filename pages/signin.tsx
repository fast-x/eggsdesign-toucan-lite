import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

export default function Signin() {
  const router = useRouter();
  const { status } = useSession();
  const { setUser } = useAuthContext();

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     console.log('No JWT');
  //     console.log(status);
  //     void signIn(undefined, { callbackUrl: '/' });
  //   } else if (status === 'authenticated') {
  //     void router.push('/');
  //   }
  // }, [status]);

  // TEST 1
  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     console.log('No JWT');

  //     console.log('2 - TEST - add error msg in signin');
  //     void signIn('azure-ad', { callbackUrl: '/' }).catch((err) => console.error('Sign-in error:', err));
  //   } else if (status === 'authenticated') {
  //     void router.push('/');
  //   }
  // }, [status]);

  // TEST 2
  useEffect(() => {
    if (status === 'authenticated') {
      // Fetch user data here if necessary or directly set the user
      // Example:
      // const userData = await fetchUserData();
      // setUser(userData);
      router.push('/');
      console.log('No JWT');
      signIn('azure-ad', { callbackUrl: '/' }).catch((err) => {
        console.error('Sign-in error:', err);
        // Optionally set error in state and show in UI
      });
    }
  }, [status, router, setUser]);

  return <div></div>;
}
