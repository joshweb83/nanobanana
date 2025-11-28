import {
  Camera,
  Wand2,
  Download,
  Shield,
  Zap,
  Palette,
  FileCheck,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "다양한 증명사진 규격",
    description: "여권, 비자, 이력서, 주민등록증 등 모든 공식 문서용 사진 규격을 지원합니다.",
    accent: "gold"
  },
  {
    icon: Wand2,
    title: "AI 자동 보정",
    description: "얼굴 인식, 배경 제거, 피부 보정까지 AI가 자동으로 전문가 수준의 보정을 진행합니다.",
    accent: "dark"
  },
  {
    icon: Zap,
    title: "30초 만에 완성",
    description: "복잡한 과정 없이 사진 업로드 한 번으로 고품질 증명사진이 즉시 완성됩니다.",
    accent: "gold"
  },
  {
    icon: Shield,
    title: "개인정보 보호",
    description: "업로드된 사진은 처리 후 즉시 삭제됩니다. 개인정보를 안전하게 보호합니다.",
    accent: "dark"
  },
  {
    icon: Palette,
    title: "배경색 선택",
    description: "흰색, 파란색, 회색 등 필요한 배경색을 자유롭게 선택할 수 있습니다.",
    accent: "gold"
  },
  {
    icon: Download,
    title: "다양한 포맷 제공",
    description: "디지털 파일과 인쇄용 고해상도 파일을 모두 제공합니다.",
    accent: "dark"
  },
  {
    icon: FileCheck,
    title: "규격 자동 조정",
    description: "선택한 사진 유형에 맞게 크기와 비율이 자동으로 조정됩니다.",
    accent: "gold"
  },
  {
    icon: Globe,
    title: "전 세계 규격 지원",
    description: "한국뿐 아니라 미국, 일본, 유럽 등 전 세계 여권/비자 규격을 지원합니다.",
    accent: "dark"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-[#f8f6f3] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#c9a962]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#1a1a2e]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e]/5 rounded-full text-[#1a1a2e]/70 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#c9a962] rounded-full"></span>
            프리미엄 서비스
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4 tracking-tight">
            왜 <span className="bg-gradient-to-r from-[#c9a962] to-[#9a7b3c] bg-clip-text text-transparent">나노사진관</span>인가요?
          </h2>
          <p className="text-lg text-[#1a1a2e]/60 max-w-2xl mx-auto">
            최첨단 AI 기술과 사용자 친화적인 인터페이스로
            누구나 쉽게 전문가 수준의 증명사진을 만들 수 있습니다.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-[#c9a962]/10 hover:border-[#c9a962]/30 relative overflow-hidden"
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  feature.accent === 'gold'
                    ? 'bg-gradient-to-br from-[#c9a962] to-[#e8d5a3]'
                    : 'bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44]'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.accent === 'gold' ? 'text-white' : 'text-[#c9a962]'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2 group-hover:text-[#c9a962] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#1a1a2e]/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#c9a962]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#c9a962]/50 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
