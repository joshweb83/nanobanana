"use client";

import { useState, useCallback, useEffect } from "react";
import { Check, ChevronRight, ChevronLeft, RefreshCw, Sparkles, Crop } from "lucide-react";
import { PhotoSpec, BackgroundOption, OutfitOption, PrintLayout } from "@/types";
import { photoSpecs } from "@/lib/photoSpecs";
import { backgroundOptions } from "@/lib/backgrounds";
import { printLayouts, getCompatibleLayouts, getRecommendedLayout } from "@/lib/printLayouts";
import { getDefaultRetouchSettings } from "@/lib/retouchOptions";

import UploadStep from "./components/UploadStep";
import CropEditor from "./components/CropEditor";
import PhotoSpecSelector from "./components/PhotoSpecSelector";
import BackgroundSelector from "./components/BackgroundSelector";
import OutfitSelector from "./components/OutfitSelector";
import RetouchPanel from "./components/RetouchPanel";
import DraggablePreview, { CropData } from "./components/DraggablePreview";
import ValidationPanel from "./components/ValidationPanel";
import PrintLayoutSelector from "./components/PrintLayoutSelector";
import ResultStep from "./components/ResultStep";

type Step = "upload" | "crop" | "options" | "result";

export default function StudioPage() {
  // Step management
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [isProcessing, setIsProcessing] = useState(false);

  // Image state
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  // Crop data for draggable preview
  const [cropData, setCropData] = useState<CropData>({ x: 0, y: 0, zoom: 1 });

  // Selection state
  const [selectedSpec, setSelectedSpec] = useState<PhotoSpec | null>(photoSpecs[0]);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundOption | null>(backgroundOptions[0]);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitOption | null>(null);
  const [selectedPrintLayout, setSelectedPrintLayout] = useState<PrintLayout | null>(printLayouts[0]);
  const [retouchSettings, setRetouchSettings] = useState<Record<string, number>>(getDefaultRetouchSettings());

  // Options tab
  const [activeTab, setActiveTab] = useState<'spec' | 'background' | 'outfit' | 'retouch' | 'print'>('spec');

  // 규격 변경시 호환되는 인쇄 배치로 자동 변경
  useEffect(() => {
    if (selectedSpec) {
      const compatibleLayouts = getCompatibleLayouts(selectedSpec);
      // 현재 선택된 레이아웃이 호환되지 않으면 권장 레이아웃으로 변경
      if (selectedPrintLayout && !compatibleLayouts.find(l => l.id === selectedPrintLayout.id)) {
        setSelectedPrintLayout(getRecommendedLayout(selectedSpec));
      }
    }
  }, [selectedSpec, selectedPrintLayout]);

  const handleImageUpload = useCallback((imageData: string) => {
    setOriginalImage(imageData);
    setCurrentStep("crop");
  }, []);

  const handleCropComplete = useCallback((croppedImageData: string) => {
    setCroppedImage(croppedImageData);
    setCurrentStep("options");
  }, []);

  const handleCropCancel = useCallback(() => {
    setCurrentStep("upload");
    setOriginalImage(null);
  }, []);

  const handleSkipCrop = useCallback(() => {
    setCroppedImage(originalImage);
    setCurrentStep("options");
  }, [originalImage]);

  const handleReCrop = useCallback(() => {
    setCurrentStep("crop");
  }, []);

  const processImage = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setProcessedImage(croppedImage || originalImage);
    setIsProcessing(false);
    setCurrentStep("result");
  };

  const resetStudio = () => {
    setCurrentStep("upload");
    setOriginalImage(null);
    setCroppedImage(null);
    setProcessedImage(null);
    setCropData({ x: 0, y: 0, zoom: 1 });
    setSelectedSpec(photoSpecs[0]);
    setSelectedBackground(backgroundOptions[0]);
    setSelectedOutfit(null);
    setSelectedPrintLayout(printLayouts[0]);
    setRetouchSettings(getDefaultRetouchSettings());
    setActiveTab('spec');
  };

  // 드래그 프리뷰에서 크롭 변경 처리
  const handleCropDataChange = useCallback((newCropData: CropData) => {
    setCropData(newCropData);
  }, []);

  const steps = [
    { id: "upload", label: "사진 업로드", num: 1 },
    { id: "crop", label: "크롭 조정", num: 2 },
    { id: "options", label: "옵션 선택", num: 3 },
    { id: "result", label: "결과 확인", num: 4 },
  ];

  const optionTabs = [
    { id: 'spec', label: '규격' },
    { id: 'background', label: '배경' },
    { id: 'outfit', label: '복장' },
    { id: 'retouch', label: '보정' },
    { id: 'print', label: '인쇄' },
  ];

  const getStepStatus = (stepId: string) => {
    const stepOrder = ["upload", "crop", "options", "result"];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  // 현재 사용할 이미지 (크롭된 이미지 우선)
  const currentImage = croppedImage || originalImage;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((item, index) => {
              const status = getStepStatus(item.id);
              return (
                <div key={item.id} className="flex items-center">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium text-xs sm:text-sm transition-all ${
                        status === "current"
                          ? "gradient-bg text-white shadow-lg shadow-indigo-500/30"
                          : status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {status === "completed" ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        item.num
                      )}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium hidden md:block ${
                        status === "current" ? "text-indigo-600" :
                        status === "completed" ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 mx-1 sm:mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upload Step */}
        {currentStep === "upload" && (
          <UploadStep onImageUpload={handleImageUpload} />
        )}

        {/* Crop Step */}
        {currentStep === "crop" && originalImage && (
          <div className="max-w-3xl mx-auto space-y-4">
            <CropEditor
              image={originalImage}
              selectedSpec={selectedSpec}
              onCropComplete={handleCropComplete}
              onCancel={handleCropCancel}
            />

            {/* Skip Crop Option */}
            <div className="text-center">
              <button
                onClick={handleSkipCrop}
                className="text-sm text-gray-500 hover:text-indigo-600 underline"
              >
                크롭 없이 원본 그대로 사용하기
              </button>
            </div>
          </div>
        )}

        {/* Options Step */}
        {currentStep === "options" && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Preview & Validation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Draggable Preview - 드래그로 크롭 위치 조정 가능 */}
              {currentImage && (
                <DraggablePreview
                  image={currentImage}
                  selectedSpec={selectedSpec}
                  selectedBackground={selectedBackground}
                  onCropChange={handleCropDataChange}
                  initialCrop={cropData}
                />
              )}

              <ValidationPanel
                selectedSpec={selectedSpec}
                hasImage={!!currentImage}
              />

              {/* Crop Editor 바로가기 버튼 */}
              <button
                onClick={handleReCrop}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Crop className="w-4 h-4" />
                정밀 크롭 에디터 열기
              </button>
            </div>

            {/* Right: Options */}
            <div className="lg:col-span-3 space-y-6">
              {/* Option Tabs */}
              <div className="bg-white rounded-2xl shadow-xl p-2">
                <div className="flex gap-1 overflow-x-auto">
                  {optionTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? "gradient-bg text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'spec' && (
                  <PhotoSpecSelector
                    selectedSpec={selectedSpec}
                    onSelect={setSelectedSpec}
                  />
                )}
                {activeTab === 'background' && (
                  <BackgroundSelector
                    selectedBackground={selectedBackground}
                    onSelect={setSelectedBackground}
                  />
                )}
                {activeTab === 'outfit' && (
                  <OutfitSelector
                    selectedOutfit={selectedOutfit}
                    onSelect={setSelectedOutfit}
                  />
                )}
                {activeTab === 'retouch' && (
                  <RetouchPanel
                    settings={retouchSettings}
                    onSettingsChange={setRetouchSettings}
                  />
                )}
                {activeTab === 'print' && (
                  <PrintLayoutSelector
                    selectedLayout={selectedPrintLayout}
                    onSelect={setSelectedPrintLayout}
                    selectedSpec={selectedSpec}
                  />
                )}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">선택 요약</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">규격</span>
                    <span className="font-medium text-gray-900 text-xs">{selectedSpec?.name || '-'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">배경</span>
                    <span className="font-medium text-gray-900 text-xs">{selectedBackground?.name || '-'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">복장</span>
                    <span className="font-medium text-gray-900 text-xs">{selectedOutfit?.name || '원본'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">인쇄</span>
                    <span className="font-medium text-gray-900 text-xs">{selectedPrintLayout?.name || '-'}</span>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <span className="text-indigo-600 block mb-1">크롭</span>
                    <span className="font-medium text-indigo-700 text-xs">
                      {cropData.x !== 0 || cropData.y !== 0 || cropData.zoom !== 1
                        ? `조정됨 (${Math.round(cropData.zoom * 100)}%)`
                        : '기본'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={processImage}
                disabled={isProcessing}
                className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    AI가 사진을 처리하고 있습니다...
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
        )}

        {/* Result Step */}
        {currentStep === "result" && (
          <ResultStep
            processedImage={processedImage}
            selectedSpec={selectedSpec}
            selectedBackground={selectedBackground}
            selectedOutfit={selectedOutfit}
            selectedPrintLayout={selectedPrintLayout}
            onReset={resetStudio}
            onEdit={() => setCurrentStep("options")}
          />
        )}
      </div>
    </div>
  );
}
