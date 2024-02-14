"use client"

import { findUserByEmail, registerWithCredential } from '@/actions/authActions';
import { signUpSchema } from '@/lib/zod/schema';
import { TSignUpSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "sonner";

const RegisterForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<TSignUpSchema> = async data => {
    // TODO: submit to server
    // ...
    const res = await findUserByEmail(data.email)

    if (res === true) {
      toast.info(`User Already exist for ${data.email}`)
      return
    }

    const resp = await registerWithCredential(data)
    if (resp?.msg) toast.success(`Email verification send to ${data.email}`)
    else toast.error("Error during registration, sorry try later")
  }


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