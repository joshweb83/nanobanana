"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const photoTypes = [
  {
    title: "여권사진",
    size: "3.5 x 4.5 cm",
    description: "대한민국 여권 규격에 맞는 사진",
    features: ["흰색 배경", "정면 응시", "무표정"],
    popular: true
  },
  {
    title: "증명사진",
    size: "3 x 4 cm",
    description: "이력서, 자격증, 수험표용 표준 증명사진",
    features: ["다양한 배경색", "자연스러운 표정", "정장 합성 가능"],
    popular: false
  },
  {
    title: "비자사진",
    size: "5 x 5 cm",
    description: "미국, 캐나다 등 비자 신청용 사진",
    features: ["국가별 규격", "흰색/밝은 배경", "귀 노출"],
    popular: false
  },
  {
    title: "주민등록증",
    size: "3.5 x 4.5 cm",
    description: "주민등록증 발급/재발급용 사진",
    features: ["흰색 배경", "6개월 이내 촬영", "무표정"],
    popular: false
  },
  {
    title: "운전면허증",
    size: "3 x 4 cm",
    description: "운전면허증 발급용 규격 사진",
    features: ["컬러 사진", "정면 응시", "6개월 이내"],
    popular: false
  },
  {
    title: "취업용 사진",
    size: "맞춤 사이즈",
    description: "기업 지원서, LinkedIn 프로필용",
    features: ["정장 합성", "밝은 표정", "프로페셔널"],
    popular: false
  }
];

export default function PhotoTypesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            모든 종류의 <span className="gradient-text">증명사진</span>을 지원합니다
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            여권부터 취업용 사진까지, 필요한 모든 규격의 증명사진을 만들어보세요.
          </p>
        </div>

        {/* Photo Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photoTypes.map((type, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                type.popular
                  ? "border-indigo-500 bg-indigo-50/50"
                  : "border-gray-200 bg-white hover:border-indigo-300"
              }`}
            >
              {type.popular && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-500 text-white text-xs font-medium rounded-full">
                  인기
                </div>
              )}

              <div className="mb-4">
                <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                {type.title}
              </h3>
              <p className="text-sm text-indigo-600 font-medium mb-2 text-center">
                {type.size}
              </p>
              <p className="text-gray-600 text-sm mb-4 text-center">
                {type.description}
              </p>

              <div className="space-y-2">
                {type.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/studio?type=${type.title}`}
                className={`mt-6 w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                  type.popular
                    ? "gradient-bg text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                만들기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
