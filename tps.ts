"use client"

import { findUserByEmail, registerWithCredential } from '@/actions/authActions';
import { registerSchema } from '@/lib/zod/schema';
import { TRegisterSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "sonner";

 // Define the RegisterForm component
const RegisterForm = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<TRegisterSchema> = async (data) => {
    try {
      // Check if user already exists
      const userExists = await findUserByEmail(data.email);

      if (userExists) {
        toast.info(`User already exists for ${data.email}`);
        return;
      }

      // Register the user with provided credentials
      const registrationResponse = await registerWithCredential(data);

      if (registrationResponse?.msg) {
        // Display success message and reset the form
        toast.success(`Email verification sent to ${data.email}`);
        reset();
      } else {
        // Display error message for registration failure
        toast.error("Error during registration, please try again later");
      }
    } catch (error) {
      // Handle network errors or unexpected errors from the API calls
      console.error("API call error:", error);
      toast.error("An unexpected error occurred, please try again later");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">

      <input
        {...register("name")}
        type="name"
        placeholder="Name"
        className="px-4 py-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500">{`${errors.name.message}`}</p>
      )}

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

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
        className="px-4 py-2 rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm