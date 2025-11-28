"use client";

import Link from "next/link";
import { Check, Sparkles, Crown } from "lucide-react";

const plans = [
  {
    name: "무료",
    price: "0",
    description: "기본 기능을 무료로 체험해보세요",
    features: [
      "1일 3장 생성",
      "기본 배경 제거",
      "표준 화질 다운로드",
      "워터마크 포함"
    ],
    cta: "무료로 시작",
    popular: false,
    href: "/studio"
  },
  {
    name: "프로",
    price: "9,900",
    period: "/월",
    description: "자주 사용하는 분들을 위한 플랜",
    features: [
      "무제한 사진 생성",
      "AI 고급 보정",
      "고화질 다운로드 (300 DPI)",
      "워터마크 없음",
      "모든 배경색 선택",
      "인쇄용 파일 제공",
      "우선 고객 지원"
    ],
    cta: "프로 시작하기",
    popular: true,
    href: "/studio?plan=pro"
  },
  {
    name: "1회권",
    price: "2,900",
    period: "/1회",
    description: "필요할 때 한 번만 사용하세요",
    features: [
      "1회 고품질 생성",
      "AI 고급 보정",
      "고화질 다운로드 (300 DPI)",
      "워터마크 없음",
      "모든 배경색 선택",
      "인쇄용 파일 제공"
    ],
    cta: "1회권 구매",
    popular: false,
    href: "/studio?plan=once"
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-[#f8f6f3] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#c9a962]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1a1a2e]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e]/5 rounded-full text-[#1a1a2e]/70 text-sm font-medium mb-6">
            <Crown className="w-4 h-4 text-[#c9a962]" />
            요금 안내
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4 tracking-tight">
            합리적인 <span className="bg-gradient-to-r from-[#c9a962] to-[#9a7b3c] bg-clip-text text-transparent">요금제</span>
          </h2>
          <p className="text-lg text-[#1a1a2e]/60 max-w-2xl mx-auto">
            사진관 방문 비용의 1/3 가격으로 더 좋은 품질의 증명사진을 얻으세요.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                plan.popular
                  ? "bg-gradient-to-b from-[#1a1a2e] to-[#2d2d44] text-white shadow-2xl scale-105 z-10 border border-[#c9a962]/30"
                  : "bg-white border-2 border-[#1a1a2e]/5 hover:border-[#c9a962]/30 hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] text-[#1a1a2e] text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  추천
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-xl font-semibold mb-3 ${plan.popular ? "text-white" : "text-[#1a1a2e]"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-[#1a1a2e]"}`}>
                    {plan.price === "0" ? "무료" : `₩${plan.price}`}
                  </span>
                  {plan.period && (
                    <span className={plan.popular ? "text-white/60" : "text-[#1a1a2e]/50"}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-3 ${plan.popular ? "text-white/70" : "text-[#1a1a2e]/50"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? "bg-[#c9a962]/20" : "bg-[#c9a962]/10"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-[#c9a962]" : "text-[#c9a962]"}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-white/80" : "text-[#1a1a2e]/70"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full py-3.5 rounded-xl font-semibold text-center transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] text-[#1a1a2e] hover:shadow-lg hover:shadow-[#c9a962]/30"
                    : "bg-[#1a1a2e] text-white hover:bg-[#2d2d44]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a962]/10 rounded-full">
            <svg className="w-5 h-5 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-[#1a1a2e]/70 text-sm font-medium">
              모든 유료 플랜은 7일 환불 보장이 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
