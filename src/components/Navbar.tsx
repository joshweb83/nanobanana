"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Camera, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "홈" },
    { href: "/studio", label: "스튜디오" },
    { href: "#features", label: "서비스" },
    { href: "#pricing", label: "요금제" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-[rgba(201,169,98,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl">
                <Camera className="w-6 h-6 text-[#c9a962]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c9a962] rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">나노사진관</span>
              <span className="text-[10px] text-[#c9a962] font-medium tracking-wider uppercase">Premium Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[#1a1a2e]/70 hover:text-[#1a1a2e] font-medium text-sm tracking-wide group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/studio"
              className="group relative overflow-hidden bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c9a962]" />
                무료로 시작하기
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center text-[#1a1a2e] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Sparkles className="w-4 h-4 mr-2" />
                무료로 시작하기
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#1a1a2e]/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#1a1a2e]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1a1a2e]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(201,169,98,0.15)]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-[#1a1a2e]/5 font-medium py-3 px-4 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/studio"
                className="mt-2 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] text-white px-6 py-3 rounded-full font-medium text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4 text-[#c9a962]" />
                무료로 시작하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
