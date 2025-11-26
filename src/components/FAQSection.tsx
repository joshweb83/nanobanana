"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "어떤 사진을 업로드해야 하나요?",
    answer: "정면을 바라보는 밝은 조명의 사진이면 됩니다. 셀카도 괜찮습니다! AI가 자동으로 배경을 제거하고 규격에 맞게 조정합니다. 모자나 선글라스는 벗은 상태가 좋습니다."
  },
  {
    question: "생성된 사진이 공식 문서에 사용 가능한가요?",
    answer: "네, 가능합니다! 나노사진관에서 생성한 사진은 여권, 비자, 주민등록증 등 공식 문서 규격에 맞게 제작됩니다. 다만, 제출처의 최종 승인은 해당 기관의 판단에 따릅니다."
  },
  {
    question: "사진 데이터는 어떻게 처리되나요?",
    answer: "고객님의 개인정보 보호를 최우선으로 합니다. 업로드된 사진은 처리 완료 후 24시간 이내에 서버에서 완전히 삭제됩니다. 저희는 사진 데이터를 저장하거나 제3자와 공유하지 않습니다."
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer: "모든 유료 서비스는 구매 후 7일 이내 환불이 가능합니다. 결과물이 만족스럽지 않으시다면 고객센터로 연락 주시면 100% 환불해 드립니다."
  },
  {
    question: "인쇄용 파일도 제공되나요?",
    answer: "네, 프로 플랜과 1회권 이용 시 300 DPI 고해상도 인쇄용 파일을 제공합니다. 일반 사진관에서 바로 인쇄할 수 있는 규격으로 제공됩니다."
  },
  {
    question: "배경색을 변경할 수 있나요?",
    answer: "물론입니다! 흰색, 파란색, 회색 등 다양한 배경색 중에서 선택할 수 있습니다. 특히 여권사진의 경우 규정에 맞는 배경색을 자동으로 추천해 드립니다."
  },
  {
    question: "외국 비자용 사진도 만들 수 있나요?",
    answer: "네, 미국, 캐나다, 영국, 일본, 중국 등 주요 국가의 비자/여권 사진 규격을 모두 지원합니다. 각 국가별 세부 규정에 맞춰 자동으로 조정됩니다."
  },
  {
    question: "스마트폰으로도 사용할 수 있나요?",
    answer: "네, 웹 브라우저만 있으면 스마트폰, 태블릿, PC 어디서든 사용 가능합니다. 별도 앱 설치가 필요 없습니다."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            자주 묻는 <span className="gradient-text">질문</span>
          </h2>
          <p className="text-lg text-gray-600">
            궁금하신 점이 있으신가요? 여기서 답을 찾아보세요.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            원하는 답을 찾지 못하셨나요?
          </p>
          <a
            href="mailto:support@nanophoto.ai"
            className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
          >
            고객센터에 문의하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
