"use client";

import { formatDuration } from "@/utils/formatDuration";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export const VideoGridItem = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <Link href={`/watch?v=${id}`} className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt=""
          width={50}
          height={50}
          // TODO:Transition learning
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          src={videoUrl}
          ref={videoRef}
          muted
          playsInline
          // TODO:Transition learning
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
        />
      </Link>

      <div className="flex gap-2">
        <Link href={`/@${channel.id}`} className="flex-shrink-0">
          <Image
            alt=""
            height={100}
            width={100}
            className="w-12 h-12 rounded-full"
            src={channel.profileUrl}
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/watch?v=${id}`} className="font-bold">
            {title}
          </Link>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
