"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const controlNavbar = () => {
    const currentScroll = window.scrollY;

    setIsScrolled(currentScroll > 10); 

    
    if (currentScroll < lastScrollY) {
      setShow(true);
    } else {
      setShow(false);
    }

    setLastScrollY(currentScroll);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        show ? "translate-y-0 bg-white shadow-md" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center px-6 py-4 transition-colors duration-300">
        <img
          src={isScrolled ? "/site-logo.webp" : "/site-logo.webp"}
          alt="Suitmedia Logo"
          className="h-8 transition-all duration-300"
        />
        <div className="space-x-4">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-orange-600 font-bold" : "text-gray-600"
            }`}
          >
            Work
          </Link>
          <Link
            href="/ideas"
            className={`${
              pathname === "/ideas"
                ? "text-orange-600 font-bold"
                : "text-gray-600"
            }`}
          >
            About
          </Link>
          <Link
            href="/ideas"
            className={`${
              pathname === "/ideas"
                ? "text-orange-600 font-bold"
                : "text-gray-600"
            }`}
          >
            Service
          </Link>
          <Link
            href="/ideas"
            className={`${
              pathname === "/ideas"
                ? "text-orange-600 font-bold"
                : "text-gray-600"
            }`}
          >
            Ideas
          </Link>
          <Link
            href="/ideas"
            className={`${
              pathname === "/ideas"
                ? "text-orange-600 font-bold"
                : "text-gray-600"
            }`}
          >
            Carrers
          </Link>
          <Link
            href="/ideas"
            className={`${
              pathname === "/ideas"
                ? "text-orange-600 font-bold"
                : "text-gray-600"
            }`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
