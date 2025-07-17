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
    setShow(currentScroll < lastScrollY);
    setLastScrollY(currentScroll);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  const navItems = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Service", href: "/services" },
    { label: "Ideas", href: "/ideas" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        backgroundColor: "#ff6803ce",
        boxShadow: show ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <nav className="container mx-auto flex justify-between items-center px-6 py-4 transition-colors duration-300">
        <img
          src={isScrolled ? "/site-logo-white.png" : "/site-logo.webp"} // Ganti sesuai kondisi
          alt="Suitmedia Logo"
          className="h-8 transition-all duration-300"
        />
        <div className="space-x-4 flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`pb-1 transition-all duration-200 ${
                pathname === item.href
                  ? "text-white font-bold border-b-2 border-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
