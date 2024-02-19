"use client"

import React, { useEffect } from 'react';
import { verifyEmail } from '@/actions/authActions'; 




const VerifyPage = ({ searchParams }: {searchParams: {token: string}}) => {

  const token = searchParams?.token;

  useEffect(() => {
    const verifyEmailAsync = async () => {
      if (token) {
        try {
          const res = await verifyEmail(token);
          console.log(res?.msg);
        } catch (error) {
          console.error('Error verifying email:', error);
        }
      } else {
        console.error('Token not found in search params');
      }
    };

    verifyEmailAsync();
  }, [token]);

  return <div>Verification in progress...</div>;
};

export default VerifyPage;
