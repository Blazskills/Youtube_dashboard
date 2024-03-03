"use client";

import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Currency,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PersonStanding,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React, { Children, useState } from "react";
import { Button, buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { playlists, subscriptions } from "@/data/sidebar";
import { useSidebarContext } from "@/context/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

export const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  //   console.log(isLargeOpen);
  //   console.log(isSmallOpen);
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden p-4 flex flex-col ml-1 transition-[hidden] delay-[45000] ease-in-out bg-red-200/10 rounded-lg ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        }  ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>

        <LargeSidebarSection title={"Hi"}>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={PersonStanding}
            title="Staff"
            url="/staff"
          />
          <LargeSidebarItem
            IconOrImgUrl={Wallet}
            title="Salary"
            url="/staff/salary"
          />
        </LargeSidebarSection>
        {/* <span className="divide-x"></span> */}
        <hr />

        <LargeSidebarSection title={"Videos"} visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={playlist.icon}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title="Explore" visibleItemCount={2}>
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

function SmallSidebarItem({ Icon, title, url }) {
  return (
    <Link
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
      href={url}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </Link>
  );
}

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

// function LargeSidebarItem({ Icon, title, url, isActive = false }) {
//   <Link
//     href={url}
//     className={twMerge(
//       buttonStyles({ variant: "ghost" }),
//       `w-full flex items-center rounded-lg gap-4 p-3 ${
//         isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
//       }`
//     )}
//   >
//     <Icon className="w-6 h-6" />
//     <div className="whitespace-nowrap overflow-hidden text-ellipsis">
//       {title}
//     </div>
//   </Link>;
// }

function LargeSidebarItem({ IconOrImgUrl, title, url, isActive = false }) {
  return (
    <Link
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <Image
          alt=""
          width={100}
          height={100}
          src={IconOrImgUrl}
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  );
}
