'use client';

import { authenticate } from '@/app/lib/actions';

import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import "@/app/login/login.css";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div>
    <form action={dispatch} className="">
      <div className="">
        <h1 className={` mb-3 text-2xl`}>
          Log in
        </h1>
        <div className="w-full">
          <div>
            <div className="">
              <input
                className=""
                id="name"
                type="name"
                name="name"
                placeholder="Name"
                required
              />
              <div className="" />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                className=""
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={1}
              />
              <div className="" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className=""
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <div className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <div className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
