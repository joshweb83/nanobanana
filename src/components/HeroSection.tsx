"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Clock, ArrowLeftRight } from "lucide-react";

export default function HeroSection() {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI 기반 고품질 사진 생성
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              전문 사진관 품질의
              <br />
              <span className="gradient-text">증명사진</span>을
              <br />
              집에서 간편하게
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              AI 기술로 여권사진, 이력서 사진, 비자 사진 등 모든 종류의
              증명사진을 전문가 수준으로 만들어 드립니다.
              사진관에 갈 필요 없이 스마트폰 하나로 완벽한 사진을 얻으세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                href="/studio"
                className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 animate-pulse-glow"
              >
                무료로 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 border border-gray-200 flex items-center justify-center"
              >
                자세히 알아보기
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>개인정보 100% 보호</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>30초 만에 완성</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>10만+ 사용자</span>
              </div>
            </div>
          </div>

          {/* Right Content - Before/After Preview */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-md">
              {/* Before/After Toggle */}
              <div className="flex justify-center gap-2 mb-4">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !showAfter
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    showAfter
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  After
                </button>
              </div>

              {/* Main preview card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 animate-float">
                <div className="aspect-[3/4] rounded-2xl mb-4 overflow-hidden relative">
                  {/* Before Image */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      showAfter ? "opacity-0" : "opacity-100"
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
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      showAfter ? "opacity-100" : "opacity-0"
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
                    <p className="font-semibold text-gray-900">
                      {showAfter ? "증명사진 완성" : "원본 사진"}
                    </p>
                    <p className="text-sm text-gray-500">3.5 x 4.5 cm</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      showAfter
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {showAfter ? "완료" : "원본"}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">AI 보정 완료</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">고화질 출력</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
