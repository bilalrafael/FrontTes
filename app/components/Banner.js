"use client";

import { useEffect, useState } from "react";
import { fetchIdeas } from "../utils/api";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadImage = async () => {
  try {
    const response = await fetchIdeas({ page: 1, size: 1, sort: "-published_at" });
    const idea = response.data?.[0];
    const imageUrl = idea?.medium_image?.[0]?.url;

    console.log("Banner image URL:", imageUrl);

    if (imageUrl) {
      setBgImage(imageUrl);
    } else {
      console.warn("Gambar medium_image tidak ditemukan.");
    }
  } catch (error) {
    console.error("Failed to fetch image for banner:", error);
  }
};


    loadImage();
  }, []);

  return (
    <section className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: `url(${bgImage || "/suitmedia bg.webp"})`,
          transform: `translateY(${offsetY * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 text-center z-10">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        >
          Ideas
        </h1>
        <p style={{ transform: `translateY(${offsetY * 0.3}px)` }}>
          Where all our great things begin
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 z-0 overflow-hidden">
        <div className="w-full h-full bg-white -skew-y-6 transform origin-top-right" />
      </div>
    </section>
  );
};

export default Banner;
