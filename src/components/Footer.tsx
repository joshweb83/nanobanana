import Link from "next/link";
import { Camera, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f1a] text-white relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] rounded-xl flex items-center justify-center border border-[#c9a962]/30 group-hover:border-[#c9a962]/50 transition-colors">
                <Camera className="w-6 h-6 text-[#c9a962]" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">나노사진관</span>
                <span className="block text-[10px] text-[#c9a962] tracking-wider uppercase">Premium Studio</span>
              </div>
            </Link>
            <p className="text-white/50 mb-6 max-w-md leading-relaxed">
              AI 기술로 전문 사진관 수준의 고품질 증명사진과 여권사진을 간편하게 만들어보세요.
              언제 어디서나 완벽한 사진을 얻을 수 있습니다.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#1a1a2e] border border-[#c9a962]/20 rounded-lg flex items-center justify-center hover:bg-[#c9a962]/10 hover:border-[#c9a962]/40 transition-colors">
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a1a2e] border border-[#c9a962]/20 rounded-lg flex items-center justify-center hover:bg-[#c9a962]/10 hover:border-[#c9a962]/40 transition-colors">
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-[#c9a962]">빠른 링크</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/studio" className="text-white/50 hover:text-[#c9a962] transition-colors">
                  스튜디오
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-white/50 hover:text-[#c9a962] transition-colors">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white/50 hover:text-[#c9a962] transition-colors">
                  요금제
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-white/50 hover:text-[#c9a962] transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-6 text-[#c9a962]">문의</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/50">
                <div className="w-8 h-8 bg-[#1a1a2e] border border-[#c9a962]/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#c9a962]" />
                </div>
                <span>support@nanophoto.ai</span>
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <div className="w-8 h-8 bg-[#1a1a2e] border border-[#c9a962]/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#c9a962]" />
                </div>
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <div className="w-8 h-8 bg-[#1a1a2e] border border-[#c9a962]/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#c9a962]" />
                </div>
                <span>서울특별시 강남구</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#c9a962]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2024 나노사진관. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-white/40 hover:text-[#c9a962] transition-colors">
              이용약관
            </Link>
            <Link href="#" className="text-white/40 hover:text-[#c9a962] transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
