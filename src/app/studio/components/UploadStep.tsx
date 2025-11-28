"use client";

import { useCallback, useRef } from "react";
import { Upload, Camera, Image, AlertCircle, Sparkles } from "lucide-react";

interface UploadStepProps {
  onImageUpload: (imageData: string) => void;
}

export default function UploadStep({ onImageUpload }: UploadStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기가 10MB를 초과합니다.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기가 10MB를 초과합니다.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-[#c9a962]/10">
      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent rounded-full"></div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e]/5 rounded-full text-[#1a1a2e]/70 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4 text-[#c9a962]" />
          AI 증명사진
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">
          사진을 업로드하세요
        </h1>
        <p className="text-[#1a1a2e]/60">
          정면을 바라보는 밝은 조명의 사진이 가장 좋습니다
        </p>
      </div>

      <div
        className="border-2 border-dashed border-[#c9a962]/30 rounded-2xl p-12 text-center hover:border-[#c9a962] transition-all cursor-pointer bg-gradient-to-br from-[#f8f6f3] to-white hover:from-[#c9a962]/5 hover:to-white group"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-lg">
          <Upload className="w-10 h-10 text-[#c9a962]" />
        </div>
        <p className="text-lg font-medium text-[#1a1a2e] mb-2">
          클릭하거나 파일을 드래그하여 업로드
        </p>
        <p className="text-sm text-[#1a1a2e]/50">
          JPG, PNG, WEBP (최대 10MB)
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent flex-1"></div>
        <span className="text-[#1a1a2e]/40 text-sm">또는</span>
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent flex-1"></div>
      </div>

      <button className="mt-6 w-full py-4 border-2 border-[#1a1a2e]/10 rounded-xl font-medium text-[#1a1a2e]/70 hover:bg-[#1a1a2e]/5 hover:border-[#c9a962]/30 flex items-center justify-center gap-2 transition-all">
        <Camera className="w-5 h-5 text-[#c9a962]" />
        카메라로 촬영
      </button>

      {/* Sample Images */}
      <div className="mt-8">
        <p className="text-sm text-[#1a1a2e]/50 mb-3 text-center">샘플 이미지로 테스트해보기</p>
        <div className="flex justify-center gap-3">
          <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center hover:scale-105 transition-transform shadow-md">
            <Image className="w-6 h-6 text-[#c9a962]" />
          </button>
          <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center hover:scale-105 transition-transform shadow-md">
            <Image className="w-6 h-6 text-[#c9a962]" />
          </button>
          <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center hover:scale-105 transition-transform shadow-md">
            <Image className="w-6 h-6 text-[#c9a962]" />
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#c9a962]/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-[#c9a962]" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">좋은 사진 TIP</h3>
            <ul className="text-sm text-white/70 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c9a962] rounded-full"></span>
                정면을 바라보며 자연스러운 표정
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c9a962] rounded-full"></span>
                밝고 균일한 조명 (창가 자연광 추천)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c9a962] rounded-full"></span>
                모자, 선글라스 착용 X
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c9a962] rounded-full"></span>
                단색 배경 추천 (흰 벽 등)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c9a962] rounded-full"></span>
                상반신이 포함된 사진
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
