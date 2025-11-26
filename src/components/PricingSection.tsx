"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

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
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            합리적인 <span className="gradient-text">요금제</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            사진관 방문 비용의 1/3 가격으로 더 좋은 품질의 증명사진을 얻으세요.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-2xl scale-105 z-10"
                  : "bg-white border-2 border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  추천
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.price === "0" ? "무료" : `₩${plan.price}`}
                  </span>
                  {plan.period && (
                    <span className={plan.popular ? "text-indigo-200" : "text-gray-500"}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-2 ${plan.popular ? "text-indigo-200" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? "bg-white/20" : "bg-green-100"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-white" : "text-green-600"}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-indigo-100" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full py-3 rounded-xl font-semibold text-center ${
                  plan.popular
                    ? "bg-white text-indigo-600 hover:bg-gray-100"
                    : "gradient-bg text-white hover:opacity-90"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            모든 유료 플랜은 7일 환불 보장이 적용됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
