"use client";

import Link from "next/link";
import React, { useState } from "react";

import logo from "../../../../public/images/webtube.png";
import Image from "next/image";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import { Button } from "./Button";
import { useSidebarContext } from "@/context/SidebarContext";

export const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { toggle, isSmallOpen, isLargeOpen } = useSidebarContext();
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div className={`${isSmallOpen? "hidden" : ""}`}>
        <PageHeaderFirstSection hidden={showFullWidthSearch}  />
      </div>
      <form
        className={`  gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => {
              setShowFullWidthSearch(false);
            }}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

export function PageHeaderFirstSection({ hidden = false }) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={` gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <Link href="#">
        <Image
          src={logo}
          priority
          alt="logo"
          className="max-md:w-5/6"
        />
      </Link>
    </div>
  );
}
