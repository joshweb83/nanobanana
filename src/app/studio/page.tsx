"use client";

import { useState, useCallback } from "react";
import { Check, ChevronRight, ChevronLeft, RefreshCw, Sparkles } from "lucide-react";
import { PhotoSpec, BackgroundOption, OutfitOption, PrintLayout } from "@/types";
import { photoSpecs } from "@/lib/photoSpecs";
import { backgroundOptions } from "@/lib/backgrounds";
import { printLayouts } from "@/lib/printLayouts";
import { getDefaultRetouchSettings } from "@/lib/retouchOptions";

import UploadStep from "./components/UploadStep";
import PhotoSpecSelector from "./components/PhotoSpecSelector";
import BackgroundSelector from "./components/BackgroundSelector";
import OutfitSelector from "./components/OutfitSelector";
import RetouchPanel from "./components/RetouchPanel";
import ImagePreview from "./components/ImagePreview";
import ValidationPanel from "./components/ValidationPanel";
import PrintLayoutSelector from "./components/PrintLayoutSelector";
import ResultStep from "./components/ResultStep";

type Step = "upload" | "options" | "result";

export default function StudioPage() {
  // Step management
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [isProcessing, setIsProcessing] = useState(false);

  // Image state
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  // Selection state
  const [selectedSpec, setSelectedSpec] = useState<PhotoSpec | null>(photoSpecs[0]);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundOption | null>(backgroundOptions[0]);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitOption | null>(null);
  const [selectedPrintLayout, setSelectedPrintLayout] = useState<PrintLayout | null>(printLayouts[0]);
  const [retouchSettings, setRetouchSettings] = useState<Record<string, number>>(getDefaultRetouchSettings());

  // Options tab
  const [activeTab, setActiveTab] = useState<'spec' | 'background' | 'outfit' | 'retouch' | 'print'>('spec');

  const handleImageUpload = useCallback((imageData: string) => {
    setOriginalImage(imageData);
    setCurrentStep("options");
  }, []);

  const processImage = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setProcessedImage(originalImage);
    setIsProcessing(false);
    setCurrentStep("result");
  };

  const resetStudio = () => {
    setCurrentStep("upload");
    setOriginalImage(null);
    setProcessedImage(null);
    setSelectedSpec(photoSpecs[0]);
    setSelectedBackground(backgroundOptions[0]);
    setSelectedOutfit(null);
    setSelectedPrintLayout(printLayouts[0]);
    setRetouchSettings(getDefaultRetouchSettings());
    setActiveTab('spec');
  };

  const steps = [
    { id: "upload", label: "사진 업로드", num: 1 },
    { id: "options", label: "옵션 선택", num: 2 },
    { id: "result", label: "결과 확인", num: 3 },
  ];

  const optionTabs = [
    { id: 'spec', label: '규격' },
    { id: 'background', label: '배경' },
    { id: 'outfit', label: '복장' },
    { id: 'retouch', label: '보정' },
    { id: 'print', label: '인쇄' },
  ];

  const getStepStatus = (stepId: string) => {
    const stepOrder = ["upload", "options", "result"];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {steps.map((item, index) => {
              const status = getStepStatus(item.id);
              return (
                <div key={item.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                        status === "current"
                          ? "gradient-bg text-white shadow-lg shadow-indigo-500/30"
                          : status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {status === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        item.num
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:block ${
                        status === "current" ? "text-indigo-600" :
                        status === "completed" ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gray-300 mx-2 sm:mx-4" />
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

        {/* Options Step */}
        {currentStep === "options" && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Preview & Validation */}
            <div className="lg:col-span-2 space-y-6">
              <ImagePreview
                originalImage={originalImage}
                processedImage={processedImage}
                selectedSpec={selectedSpec}
                selectedBackground={selectedBackground}
                showComparison={false}
              />
              <ValidationPanel
                selectedSpec={selectedSpec}
                hasImage={!!originalImage}
              />
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
                  />
                )}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">선택 요약</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">규격</span>
                    <span className="font-medium text-gray-900">{selectedSpec?.name || '-'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">배경</span>
                    <span className="font-medium text-gray-900">{selectedBackground?.name || '-'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">복장</span>
                    <span className="font-medium text-gray-900">{selectedOutfit?.name || '원본 유지'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">인쇄</span>
                    <span className="font-medium text-gray-900">{selectedPrintLayout?.name || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={resetStudio}
                  className="flex-1 py-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  처음으로
                </button>
                <button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="flex-[2] gradient-bg text-white py-4 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 disabled:opacity-70"
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
