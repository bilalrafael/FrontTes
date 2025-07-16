"use client";

import { useEffect, useState } from "react";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: "url('/suitmedia bg.webp')",
          transform: `translateY(${offsetY * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
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
