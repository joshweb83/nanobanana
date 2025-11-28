"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Clock, ArrowLeftRight, Award, Star } from "lucide-react";

export default function HeroSection() {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fafafa] via-white to-[#f8f6f3]">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#c9a962]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1a1a2e]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#c9a962]/5 to-transparent rounded-full"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231a1a2e\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] rounded-full text-white text-sm font-medium mb-8 shadow-lg">
              <Star className="w-4 h-4 text-[#c9a962] fill-[#c9a962]" />
              <span>프리미엄 AI 사진 스튜디오</span>
              <div className="w-px h-4 bg-white/20"></div>
              <span className="text-[#c9a962]">NEW</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-tight mb-6 tracking-tight">
              전문 스튜디오 품질의
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-[#c9a962] to-[#9a7b3c] bg-clip-text text-transparent">프리미엄 증명사진</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 3 150 3 298 10" stroke="url(#gold-gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c9a962"/>
                      <stop offset="100%" stopColor="#e8d5a3"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              <span className="text-[#1a1a2e]/80">집에서 간편하게</span>
            </h1>

            <p className="text-lg text-[#1a1a2e]/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              최첨단 AI 기술로 여권사진, 이력서 사진, 비자 사진 등
              모든 종류의 증명사진을 <span className="text-[#c9a962] font-semibold">전문가 수준</span>으로 만들어 드립니다.
              더 이상 사진관에 갈 필요 없이, 스마트폰 하나로 완벽한 사진을 얻으세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                href="/studio"
                className="group relative overflow-hidden bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-[#c9a962]" />
                <span>무료로 시작하기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="absolute inset-0 flex items-center justify-center gap-3 text-[#1a1a2e] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <Sparkles className="w-5 h-5" />
                  <span>무료로 시작하기</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <Link
                href="#features"
                className="bg-white text-[#1a1a2e] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a1a2e]/5 border border-[#1a1a2e]/10 flex items-center justify-center shadow-sm hover:shadow-md"
              >
                자세히 알아보기
              </Link>
            </div>

            {/* Trust badges - Premium Style */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-[#c9a962]/20">
                <Shield className="w-5 h-5 text-[#1a1a2e]" />
                <span className="text-sm font-medium text-[#1a1a2e]/70">개인정보 100% 보호</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-[#c9a962]/20">
                <Clock className="w-5 h-5 text-[#c9a962]" />
                <span className="text-sm font-medium text-[#1a1a2e]/70">30초 만에 완성</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-[#c9a962]/20">
                <Award className="w-5 h-5 text-[#c9a962]" />
                <span className="text-sm font-medium text-[#1a1a2e]/70">10만+ 사용자</span>
              </div>
            </div>
          </div>

          {/* Right Content - Before/After Preview */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-md">
              {/* Before/After Toggle - Premium Style */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    !showAfter
                      ? "bg-[#1a1a2e] text-white shadow-lg"
                      : "bg-white text-[#1a1a2e]/60 hover:bg-[#1a1a2e]/5 border border-[#1a1a2e]/10"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="p-2.5 bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] rounded-full text-[#1a1a2e] hover:shadow-lg transition-shadow"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    showAfter
                      ? "bg-gradient-to-r from-[#c9a962] to-[#9a7b3c] text-white shadow-lg"
                      : "bg-white text-[#1a1a2e]/60 hover:bg-[#1a1a2e]/5 border border-[#1a1a2e]/10"
                  }`}
                >
                  After
                </button>
              </div>

              {/* Main preview card - Premium Style */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-[#c9a962]/10 animate-float">
                {/* Gold accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent rounded-full"></div>

                <div className="aspect-[3/4] rounded-2xl mb-4 overflow-hidden relative bg-gradient-to-br from-[#f8f6f3] to-[#e8e8ec]">
                  {/* Before Image */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      showAfter ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  >
                    <Image
                      src="/images/samples/sample-original-1.svg"
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* After Image */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      showAfter ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    <Image
                      src="/images/samples/sample-result-1.svg"
                      alt="After"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-[#1a1a2e]">
                      {showAfter ? "증명사진 완성" : "원본 사진"}
                    </p>
                    <p className="text-sm text-[#1a1a2e]/50">3.5 x 4.5 cm · 300 DPI</p>
                  </div>
                  <div
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      showAfter
                        ? "bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] text-[#1a1a2e]"
                        : "bg-[#1a1a2e]/5 text-[#1a1a2e]/60"
                    }`}
                  >
                    {showAfter ? "✨ 완료" : "원본"}
                  </div>
                </div>
              </div>

              {/* Floating elements - Premium Style */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-[#c9a962]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#c9a962] to-[#e8d5a3] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#1a1a2e]">AI 보정 완료</span>
                    <p className="text-xs text-[#1a1a2e]/50">자연스러운 피부톤</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[#c9a962]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#1a1a2e]">고화질 출력</span>
                    <p className="text-xs text-[#1a1a2e]/50">300 DPI 인쇄 품질</p>
                  </div>
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border-2 border-dashed border-[#c9a962]/20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent"></div>
    </section>
  );
}
