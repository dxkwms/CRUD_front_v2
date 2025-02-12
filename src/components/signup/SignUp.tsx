"use client";

import {SignUpForm} from "@/components/signup/SignUpForm";

export const SignUp = () => {
    return (
        <div
            className="bg-local bg-cover bg-center h-screen w-full"
            style={{ backgroundImage: `url(/pic/loginBackground.jpg)` }}
        >
            <SignUpForm />
        </div>
    );
};
