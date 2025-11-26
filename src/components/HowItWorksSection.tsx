import { Upload, Wand2, Download, Check } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "사진 업로드",
    description: "스마트폰이나 컴퓨터에서 셀카 또는 기존 사진을 업로드하세요. 정면 사진이면 OK!",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Wand2,
    step: "02",
    title: "AI 자동 처리",
    description: "AI가 배경 제거, 얼굴 보정, 규격 맞춤을 자동으로 진행합니다.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Check,
    step: "03",
    title: "옵션 선택",
    description: "사진 유형, 배경색, 보정 정도 등 원하는 옵션을 선택하세요.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: Download,
    step: "04",
    title: "다운로드",
    description: "완성된 고품질 증명사진을 다운로드하세요. 인쇄용 파일도 함께 제공됩니다.",
    color: "from-green-500 to-emerald-500"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <span className="gradient-text">4단계</span>로 간편하게
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            복잡한 과정 없이 누구나 쉽게 전문가 수준의 증명사진을 만들 수 있습니다.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  {/* Step number */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Step indicator */}
                  <span className="text-sm font-bold text-gray-300 mb-2 block">
                    STEP {step.step}
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
