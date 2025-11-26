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
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Wand2,
    title: "AI 자동 보정",
    description: "얼굴 인식, 배경 제거, 피부 보정까지 AI가 자동으로 전문가 수준의 보정을 진행합니다.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Zap,
    title: "30초 만에 완성",
    description: "복잡한 과정 없이 사진 업로드 한 번으로 고품질 증명사진이 즉시 완성됩니다.",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Shield,
    title: "개인정보 보호",
    description: "업로드된 사진은 처리 후 즉시 삭제됩니다. 개인정보를 안전하게 보호합니다.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Palette,
    title: "배경색 선택",
    description: "흰색, 파란색, 회색 등 필요한 배경색을 자유롭게 선택할 수 있습니다.",
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: Download,
    title: "다양한 포맷 제공",
    description: "디지털 파일과 인쇄용 고해상도 파일을 모두 제공합니다.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: FileCheck,
    title: "규격 자동 조정",
    description: "선택한 사진 유형에 맞게 크기와 비율이 자동으로 조정됩니다.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Globe,
    title: "전 세계 규격 지원",
    description: "한국뿐 아니라 미국, 일본, 유럽 등 전 세계 여권/비자 규격을 지원합니다.",
    color: "bg-teal-100 text-teal-600"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            왜 <span className="gradient-text">나노사진관</span>인가요?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            최첨단 AI 기술과 사용자 친화적인 인터페이스로
            누구나 쉽게 전문가 수준의 증명사진을 만들 수 있습니다.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
