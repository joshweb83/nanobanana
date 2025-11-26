"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Camera,
  Download,
  RefreshCw,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ZoomIn,
  RotateCw,
  Trash2
} from "lucide-react";

type PhotoType = {
  id: string;
  name: string;
  size: string;
  ratio: string;
  description: string;
};

type BackgroundColor = {
  id: string;
  name: string;
  color: string;
  hex: string;
};

const photoTypes: PhotoType[] = [
  { id: "passport", name: "여권사진", size: "3.5 x 4.5 cm", ratio: "35:45", description: "대한민국 여권용" },
  { id: "id-photo", name: "증명사진", size: "3 x 4 cm", ratio: "3:4", description: "이력서, 자격증용" },
  { id: "visa-us", name: "미국 비자", size: "5 x 5 cm", ratio: "1:1", description: "미국 비자 신청용" },
  { id: "id-card", name: "주민등록증", size: "3.5 x 4.5 cm", ratio: "35:45", description: "주민등록증 발급용" },
  { id: "driver", name: "운전면허증", size: "3 x 4 cm", ratio: "3:4", description: "운전면허증용" },
  { id: "linkedin", name: "LinkedIn", size: "400 x 400 px", ratio: "1:1", description: "프로필 사진용" },
];

const backgroundColors: BackgroundColor[] = [
  { id: "white", name: "흰색", color: "bg-white", hex: "#FFFFFF" },
  { id: "light-blue", name: "연한 파랑", color: "bg-blue-100", hex: "#DBEAFE" },
  { id: "blue", name: "파랑", color: "bg-blue-500", hex: "#3B82F6" },
  { id: "gray", name: "회색", color: "bg-gray-200", hex: "#E5E7EB" },
  { id: "light-gray", name: "연한 회색", color: "bg-gray-100", hex: "#F3F4F6" },
];

type Step = "upload" | "options" | "result";

export default function StudioPage() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPhotoType, setSelectedPhotoType] = useState<PhotoType>(photoTypes[0]);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundColor>(backgroundColors[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [retouchLevel, setRetouchLevel] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setCurrentStep("options");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setCurrentStep("options");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const processImage = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setProcessedImage(uploadedImage);
      setIsProcessing(false);
      setCurrentStep("result");
    }, 2000);
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = `나노사진관_${selectedPhotoType.name}_${Date.now()}.png`;
      link.click();
    }
  };

  const resetStudio = () => {
    setCurrentStep("upload");
    setUploadedImage(null);
    setProcessedImage(null);
    setSelectedPhotoType(photoTypes[0]);
    setSelectedBackground(backgroundColors[0]);
    setRetouchLevel(50);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { step: "upload", label: "사진 업로드", num: 1 },
              { step: "options", label: "옵션 선택", num: 2 },
              { step: "result", label: "결과 확인", num: 3 },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                      currentStep === item.step
                        ? "gradient-bg text-white"
                        : ["options", "result"].indexOf(currentStep) > ["upload", "options", "result"].indexOf(item.step) ||
                          (currentStep === "result" && item.step !== "result")
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {["options", "result"].indexOf(currentStep) > ["upload", "options", "result"].indexOf(item.step) ||
                    (currentStep === "result" && item.step !== "result") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      item.num
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      currentStep === item.step ? "text-indigo-600" : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Step */}
        {currentStep === "upload" && (
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
              className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer"
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
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-gray-600 mb-2">
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

            <button className="mt-6 w-full py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" />
              카메라로 촬영
            </button>

            {/* Tips */}
            <div className="mt-8 bg-indigo-50 rounded-xl p-4">
              <h3 className="font-medium text-indigo-900 mb-2">좋은 사진 TIP</h3>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>- 정면을 바라보며 자연스러운 표정</li>
                <li>- 밝고 균일한 조명</li>
                <li>- 모자, 선글라스 X</li>
                <li>- 단색 배경 추천</li>
              </ul>
            </div>
          </div>
        )}

        {/* Options Step */}
        {currentStep === "options" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">미리보기</h2>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Overlay guide */}
                <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-lg pointer-events-none"></div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <ZoomIn className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <RotateCw className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  className="p-2 bg-gray-100 rounded-lg hover:bg-red-100"
                  onClick={resetStudio}
                >
                  <Trash2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-6">
              {/* Photo Type Selection */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">사진 유형</h2>
                <div className="grid grid-cols-2 gap-3">
                  {photoTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedPhotoType.id === type.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                      onClick={() => setSelectedPhotoType(type)}
                    >
                      <div className="font-medium text-gray-900">{type.name}</div>
                      <div className="text-sm text-indigo-600">{type.size}</div>
                      <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">배경색</h2>
                <div className="flex gap-3">
                  {backgroundColors.map((bg) => (
                    <button
                      key={bg.id}
                      className={`w-12 h-12 rounded-xl ${bg.color} border-2 transition-all ${
                        selectedBackground.id === bg.id
                          ? "border-indigo-500 ring-2 ring-indigo-200"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedBackground(bg)}
                      title={bg.name}
                    >
                      {selectedBackground.id === bg.id && (
                        <Check className="w-5 h-5 text-indigo-600 mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Retouch Level */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">보정 정도</h2>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={retouchLevel}
                    onChange={(e) => setRetouchLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>자연스럽게</span>
                    <span>{retouchLevel}%</span>
                    <span>많이 보정</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                  onClick={() => setCurrentStep("upload")}
                >
                  <ChevronLeft className="w-5 h-5" />
                  이전
                </button>
                <button
                  className="flex-1 gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
                  onClick={processImage}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      사진 생성하기
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result Step */}
        {currentStep === "result" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
                <Check className="w-4 h-4" />
                사진이 완성되었습니다!
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedPhotoType.name} 완성
              </h1>
              <p className="text-gray-600">
                고품질 {selectedPhotoType.size} 규격의 사진이 준비되었습니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Result Preview */}
              <div>
                <div
                  className={`aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ${selectedBackground.color} p-8`}
                >
                  {processedImage && (
                    <img
                      src={processedImage}
                      alt="Result"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </div>
              </div>

              {/* Download Options */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">사진 정보</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">사진 유형</span>
                      <span className="font-medium">{selectedPhotoType.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">크기</span>
                      <span className="font-medium">{selectedPhotoType.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">배경색</span>
                      <span className="font-medium">{selectedBackground.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">해상도</span>
                      <span className="font-medium">300 DPI</span>
                    </div>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="space-y-3">
                  <button
                    className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
                    onClick={handleDownload}
                  >
                    <Download className="w-5 h-5" />
                    디지털 파일 다운로드
                  </button>
                  <button className="w-full py-4 border-2 border-indigo-200 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    인쇄용 파일 다운로드 (Pro)
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200"
                    onClick={() => setCurrentStep("options")}
                  >
                    다시 편집
                  </button>
                  <button
                    className="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200"
                    onClick={resetStudio}
                  >
                    새 사진 만들기
                  </button>
                </div>

                {/* Promo */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">Pro 플랜 혜택</span>
                  </div>
                  <p className="text-sm text-indigo-100">
                    워터마크 없는 고화질 원본, 인쇄용 파일, 무제한 다운로드를 이용하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
