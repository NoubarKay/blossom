import { LoginForm } from "@/components/general/LoginForm";
import Logo from "@/components/general/Logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="grid grid-cols-2 h-screen w-screen flex-row overflow-hidden p-2">
      <div className="p-10 pb-0 min-h-full flex flex-col justify-between">
        <Logo />
        <div>
          <div className="mb-10">
            <h2 className="text-4xl font-bold">Get Started Now!</h2>
            <p className="text-sm font-normal">
              Enter your credentials to sign in to your dashboard!
            </p>
          </div>
          <LoginForm />
          <p className="text-sm mt-2">
            Don&apos;t have an account?{" "}
            <Link className="text-lime-600 hover:underline" href={"/sign-up"}>
              Sign Up!
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="text-xs text-muted-foreground">
            2024 Blossom | All rights reserved
          </p>
        </div>
      </div>
      <div>
        <div className="h-full w-full rounded-xl overflow-hidden relative">
          <Image
            src={
              "https://images.unsplash.com/photo-1508144753681-9986d4df99b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            style={{ objectFit: "cover" }}
            fill
            alt="Login image"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
