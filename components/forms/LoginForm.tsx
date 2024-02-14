"use client"

import { loginSchema } from '@/lib/zod/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "sonner";
//import GoogleButton from './GoogleButton';
import { TLoginSchema } from '@/types';

const LoginForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    try {
      // Use the signIn function to authenticate with credentials
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (response?.ok) {
   
        // Redirect to the dashboard or any other page on successful authentication
        toast.success("Login success")
        window.location.pathname ='/';
      } else {
        // Handle authentication error
        console.error(response?.error);
        toast.error('Credentials do not match!');
      }
    } catch (error) {
      // Handle any other unexpected errors
      console.error(error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">

      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="px-4 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}


      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>

    
    </form>
  <p>or</p>
  {/* <GoogleButton /> */}
    </>
  )
}

export default LoginForm