"use client";

import { useCallback, useRef } from "react";
import { Upload, Camera, Image, AlertCircle } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          사진을 업로드하세요
        </h1>
        <p className="text-gray-600">
          정면을 바라보는 밝은 조명의 사진이 가장 좋습니다
        </p>
      </div>

      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer bg-gray-50 hover:bg-indigo-50/30"
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
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-10 h-10 text-indigo-600" />
        </div>
        <p className="text-lg font-medium text-gray-700 mb-2">
          클릭하거나 파일을 드래그하여 업로드
        </p>
        <p className="text-sm text-gray-400">
          JPG, PNG, WEBP (최대 10MB)
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-gray-400 text-sm">또는</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <button className="mt-6 w-full py-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
        <Camera className="w-5 h-5" />
        카메라로 촬영
      </button>

      {/* Sample Images */}
      <div className="mt-8">
        <p className="text-sm text-gray-500 mb-3 text-center">샘플 이미지로 테스트해보기</p>
        <div className="flex justify-center gap-3">
          <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center hover:opacity-80 transition-opacity">
            <Image className="w-6 h-6 text-gray-500" />
          </button>
          <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center hover:opacity-80 transition-opacity">
            <Image className="w-6 h-6 text-gray-500" />
          </button>
          <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center hover:opacity-80 transition-opacity">
            <Image className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-indigo-900 mb-2">좋은 사진 TIP</h3>
            <ul className="text-sm text-indigo-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                정면을 바라보며 자연스러운 표정
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                밝고 균일한 조명 (창가 자연광 추천)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                모자, 선글라스 착용 X
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                단색 배경 추천 (흰 벽 등)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                상반신이 포함된 사진
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
