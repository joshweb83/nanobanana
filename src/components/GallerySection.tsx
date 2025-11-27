"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight, Sparkles } from "lucide-react";

const samples = [
  {
    id: 1,
    title: "여권사진",
    before: "/images/samples/sample-original-1.svg",
    after: "/images/samples/sample-result-1.svg",
    type: "남성 / 정장"
  },
  {
    id: 2,
    title: "취업용 사진",
    before: "/images/samples/sample-original-2.svg",
    after: "/images/samples/sample-result-2.svg",
    type: "여성 / 정장"
  },
  {
    id: 3,
    title: "증명사진",
    before: "/images/samples/sample-original-1.svg",
    after: "/images/samples/id-photo-sample.svg",
    type: "남성 / 파란배경"
  },
  {
    id: 4,
    title: "비자사진",
    before: "/images/samples/sample-original-2.svg",
    after: "/images/samples/visa-photo-sample.svg",
    type: "여성 / 흰배경"
  }
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            실제 변환 예시
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Before & After <span className="gradient-text">갤러리</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI가 어떻게 일반 사진을 전문 증명사진으로 변환하는지 직접 확인해보세요.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Preview */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-6">
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

              {/* Image Container */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-gray-100">
                {/* Before Image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    showAfter ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <Image
                    src={samples[activeIndex].before}
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
                    src={samples[activeIndex].after}
                    alt="After"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{samples[activeIndex].title}</p>
                  <p className="text-sm text-gray-500">{samples[activeIndex].type}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  showAfter
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {showAfter ? "완료" : "원본"}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">다른 예시 보기</h3>
            <div className="grid grid-cols-2 gap-4">
              {samples.map((sample, index) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setShowAfter(true);
                  }}
                  className={`group relative rounded-2xl overflow-hidden border-2 transition-all ${
                    activeIndex === index
                      ? "border-indigo-500 ring-2 ring-indigo-200"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={sample.after}
                      alt={sample.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <p className="text-sm font-medium text-white drop-shadow-lg">{sample.title}</p>
                    <p className="text-xs text-white/80 drop-shadow-lg">{sample.type}</p>
                  </div>
                  {activeIndex === index && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-indigo-50 rounded-xl">
                <p className="text-2xl font-bold text-indigo-600">30초</p>
                <p className="text-sm text-gray-600">평균 처리시간</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">99%</p>
                <p className="text-sm text-gray-600">만족도</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-600">10만+</p>
                <p className="text-sm text-gray-600">생성된 사진</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
