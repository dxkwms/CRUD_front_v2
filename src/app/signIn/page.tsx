"use client";

import { SignInForm } from "@/components/signin/SignInForm";

export default function SignInPage() {
  return (
    <div
      className="bg-local bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url(/img/loginBackground.jpg)` }}
    >
      <SignInForm />
    </div>
  );
}
