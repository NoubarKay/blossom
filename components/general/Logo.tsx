"use client";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="relative">
      <Link href={"/"}>
        <h1 className="font-bold text-2xl leading-none relative">
          GenCRM
          <span className="absolute bottom-0 mx-2 text-xs font-normal bg-accent p-1 rounded-sm">
            0.0.1
          </span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
