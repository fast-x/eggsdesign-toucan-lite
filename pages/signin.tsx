import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

export default function Signin() {
  console.log('8 called in signin.tsx page');
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [prevStatus, setPrevStatus] = useState<'authenticated' | 'loading' | 'unauthenticated' | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    // Log when status changes
    if (status !== prevStatus) {
      console.log(`Status changed from ${prevStatus} to ${status}`);
      setPrevStatus(status); // This now correctly handles all status types
    }

    if (status === 'authenticated') {
      console.log('User is authenticated');
      console.log('Session:', session); // Log the session object
      console.log('User details:', session?.user); // Log specific user details
      router.push('/'); // Redirect to home page
    } else if (status === 'unauthenticated') {
      console.log('User is unauthenticated');
      signIn('azure-ad', { callbackUrl: '/' }).catch((err) => {
        console.error('Sign-in error:', err);
        console.log('Error details:', err);
      });
    }
  }, [status, session, router]);

  return <div></div>;
}
