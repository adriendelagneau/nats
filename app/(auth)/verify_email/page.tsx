import React, { useEffect, useState } from 'react';
import { verifyEmail } from '@/actions/authActions';
import { redirect } from 'next/navigation';

const VerifyPage: React.FC<{ searchParams: string }> = ({ searchParams }) => {
  const [verificationState, setVerificationState] = useState<'initial' | 'success' | 'error'>('initial');

  useEffect(() => {
    const verifyToken = async () => {
      if (searchParams) {
        try {
          // Start the verification, set state to 'initial'
          setVerificationState('initial');
          
          const res = await verifyEmail(searchParams);

          // If verification is successful, set state to 'success'
          setVerificationState('success');

          //redirect to /login with setTimeout
          setTimeout(() => {
            // Redirect to login page after a delay
            redirect('/login')
          }, 3000); // Adjust the delay as needed

          console.log(res?.msg);
        } catch (error) {
          // If verification fails, set state to 'error'
          setVerificationState('error');
          console.error('Error verifying email:', error);
        }
      } else {
        // Token not found, set state to 'error'
        setVerificationState('error');
        console.error('Token not found in search params');
      }
    };

    verifyToken();
  }, [searchParams]);

  return (
    <div>
      {verificationState === 'initial' && <p>Verification in progress...</p>}
      {verificationState === 'success' && <p>Verification successful!</p>}
      {verificationState === 'error' && <p>Error verifying email.</p>}
    </div>
  );
};

export default VerifyPage;
