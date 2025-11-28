"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

const photoTypes = [
  {
    title: "여권사진",
    size: "3.5 x 4.5 cm",
    description: "대한민국 여권 규격에 맞는 사진",
    features: ["흰색 배경", "정면 응시", "무표정"],
    popular: true,
    image: "/images/samples/passport-sample.svg"
  },
  {
    title: "증명사진",
    size: "3 x 4 cm",
    description: "이력서, 자격증, 수험표용 표준 증명사진",
    features: ["다양한 배경색", "자연스러운 표정", "정장 합성 가능"],
    popular: false,
    image: "/images/samples/id-photo-sample.svg"
  },
  {
    title: "비자사진",
    size: "5 x 5 cm",
    description: "미국, 캐나다 등 비자 신청용 사진",
    features: ["국가별 규격", "흰색/밝은 배경", "귀 노출"],
    popular: false,
    image: "/images/samples/visa-photo-sample.svg"
  },
  {
    title: "주민등록증",
    size: "3.5 x 4.5 cm",
    description: "주민등록증 발급/재발급용 사진",
    features: ["흰색 배경", "6개월 이내 촬영", "무표정"],
    popular: false,
    image: "/images/samples/sample-result-1.svg"
  },
  {
    title: "운전면허증",
    size: "3 x 4 cm",
    description: "운전면허증 발급용 규격 사진",
    features: ["컬러 사진", "정면 응시", "6개월 이내"],
    popular: false,
    image: "/images/samples/sample-result-2.svg"
  },
  {
    title: "취업용 사진",
    size: "맞춤 사이즈",
    description: "기업 지원서, LinkedIn 프로필용",
    features: ["정장 합성", "밝은 표정", "프로페셔널"],
    popular: false,
    image: "/images/samples/profile-sample.svg"
  }
];

export default function PhotoTypesSection() {
  return (
    <section className="py-24 bg-white relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%231a1a2e\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a962]/10 to-[#e8d5a3]/10 rounded-full text-[#c9a962] text-sm font-medium mb-6 border border-[#c9a962]/20">
            <Star className="w-4 h-4 fill-current" />
            다양한 규격 지원
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4 tracking-tight">
            모든 종류의 <span className="bg-gradient-to-r from-[#c9a962] to-[#9a7b3c] bg-clip-text text-transparent">증명사진</span>을 지원합니다
          </h2>
          <p className="text-lg text-[#1a1a2e]/60 max-w-2xl mx-auto">
            여권부터 취업용 사진까지, 필요한 모든 규격의 증명사진을 만들어보세요.
          </p>
        </div>

        {/* Photo Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoTypes.map((type, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl ${
                type.popular
                  ? "bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] border-2 border-[#c9a962]/30"
                  : "bg-white border-2 border-[#1a1a2e]/5 hover:border-[#c9a962]/30"
              }`}
            >
              {type.popular && (
                <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] text-[#1a1a2e] text-xs font-semibold rounded-full shadow-lg">
                  BEST
                </div>
              )}

              <div className="mb-5">
                <div className={`w-24 h-28 rounded-xl mx-auto overflow-hidden shadow-lg relative ring-4 ${
                  type.popular ? 'ring-[#c9a962]/30' : 'ring-[#1a1a2e]/5'
                }`}>
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className={`text-xl font-semibold mb-1 text-center ${
                type.popular ? 'text-white' : 'text-[#1a1a2e]'
              }`}>
                {type.title}
              </h3>
              <p className={`text-sm font-medium mb-3 text-center ${
                type.popular ? 'text-[#c9a962]' : 'text-[#c9a962]'
              }`}>
                {type.size}
              </p>
              <p className={`text-sm mb-5 text-center ${
                type.popular ? 'text-white/70' : 'text-[#1a1a2e]/60'
              }`}>
                {type.description}
              </p>

              <div className="space-y-2 mb-6">
                {type.features.map((feature, idx) => (
                  <div key={idx} className={`flex items-center gap-2 text-sm ${
                    type.popular ? 'text-white/80' : 'text-[#1a1a2e]/70'
                  }`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      type.popular ? 'bg-[#c9a962]/20' : 'bg-[#c9a962]/10'
                    }`}>
                      <svg className="w-3 h-3 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/studio?type=${type.title}`}
                className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  type.popular
                    ? "bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] text-[#1a1a2e] hover:shadow-lg hover:shadow-[#c9a962]/30"
                    : "bg-[#1a1a2e] text-white hover:bg-[#2d2d44] group-hover:bg-gradient-to-r group-hover:from-[#c9a962] group-hover:to-[#e8d5a3] group-hover:text-[#1a1a2e]"
                }`}
              >
                만들기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/20 to-transparent"></div>
    </section>
  );
}
