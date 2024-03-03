import React from "react";
import { VideoGridItem } from "./VideoGridItem";
import { videos } from "@/data/home";

export const VideoGrid = () => {
  return (
    // <div className="grid gap-4 grid-cols-[repeat(auto-fill, minmax(300px,1fr))]">
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {videos.map((video) => (
        <VideoGridItem key={video.id} {...video} />
      ))}
    </div>
  );
};
