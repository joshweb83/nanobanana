import Link from "next/link";
import { ArrowRight, Camera, Star, Shield, Lock, Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#2d2d44] to-[#1a1a2e]"></div>

      {/* Gold Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a962]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9a962]/10 rounded-full blur-3xl"></div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a962\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c9a962]/20 backdrop-blur-sm rounded-full text-[#c9a962] text-sm font-medium mb-8 border border-[#c9a962]/30">
          <Star className="w-4 h-4 fill-current" />
          10만+ 사용자가 선택한 서비스
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
          지금 바로
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] bg-clip-text text-transparent"> 시작하세요</span>
        </h2>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          사진관에 갈 필요 없이 집에서 편하게
          <br className="hidden sm:block" />
          전문가 수준의 증명사진을 만들어보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/studio"
            className="group relative overflow-hidden bg-gradient-to-r from-[#c9a962] to-[#e8d5a3] text-[#1a1a2e] px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#c9a962]/30 flex items-center justify-center gap-3"
          >
            <Camera className="w-5 h-5" />
            무료로 사진 만들기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-white/50 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm">
            <Lock className="w-4 h-4 text-[#c9a962]" />
            <span>안전한 결제</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-[#c9a962]" />
            <span>개인정보 보호</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm">
            <Heart className="w-4 h-4 text-[#c9a962]" />
            <span>7일 환불 보장</span>
          </div>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent"></div>
    </section>
  );
}
