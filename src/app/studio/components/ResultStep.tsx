"use client";

import { PhotoSpec, BackgroundOption, OutfitOption, PrintLayout } from "@/types";
import { Check, Download, Share2, RefreshCw, Sparkles, Printer, FileImage, Lock } from "lucide-react";

interface ResultStepProps {
  processedImage: string | null;
  selectedSpec: PhotoSpec | null;
  selectedBackground: BackgroundOption | null;
  selectedOutfit: OutfitOption | null;
  selectedPrintLayout: PrintLayout | null;
  onReset: () => void;
  onEdit: () => void;
}

export default function ResultStep({
  processedImage,
  selectedSpec,
  selectedBackground,
  selectedOutfit,
  selectedPrintLayout,
  onReset,
  onEdit
}: ResultStepProps) {
  const handleDownload = (type: 'web' | 'print' | 'layout') => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;

    let filename = `나노사진관_${selectedSpec?.name || '증명사진'}`;
    if (type === 'web') {
      filename += '_웹용';
    } else if (type === 'print') {
      filename += '_인쇄용_300DPI';
    } else if (type === 'layout') {
      filename += `_${selectedPrintLayout?.name || '배치'}`;
    }
    filename += `_${Date.now()}.png`;

    link.download = filename;
    link.click();
  };

  const handleShare = async () => {
    if (!processedImage) return;

    if (navigator.share) {
      try {
        const blob = await fetch(processedImage).then(r => r.blob());
        const file = new File([blob], 'photo.png', { type: 'image/png' });
        await navigator.share({
          title: '나노사진관 증명사진',
          files: [file]
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  const getBackgroundStyle = () => {
    if (!selectedBackground) return { backgroundColor: '#FFFFFF' };
    if (selectedBackground.type === 'solid') {
      return { backgroundColor: selectedBackground.value };
    }
    return { background: selectedBackground.value };
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
          <Check className="w-4 h-4" />
          사진이 완성되었습니다!
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {selectedSpec?.name || '증명사진'} 완성
        </h1>
        <p className="text-gray-600">
          고품질 {selectedSpec ? `${selectedSpec.width}x${selectedSpec.height} ${selectedSpec.unit}` : ''} 규격의 사진이 준비되었습니다
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview */}
        <div>
          <div
            className="rounded-2xl overflow-hidden shadow-lg p-6"
            style={getBackgroundStyle()}
          >
            {processedImage && (
              <img
                src={processedImage}
                alt="Result"
                className="w-full rounded-xl"
                style={{ aspectRatio: selectedSpec ? `${selectedSpec.width}/${selectedSpec.height}` : '3/4' }}
              />
            )}
          </div>

          {/* Print Layout Preview */}
          {selectedPrintLayout && selectedPrintLayout.id !== 'single' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-2">인쇄 배치 미리보기</p>
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateRows: `repeat(${selectedPrintLayout.rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${selectedPrintLayout.cols}, 1fr)`,
                    aspectRatio: selectedPrintLayout.paperSize === 'A4' ? '210/297' : '4/6'
                  }}
                >
                  {Array.from({ length: selectedPrintLayout.count }).map((_, i) => (
                    <div key={i} className="bg-indigo-100 rounded-sm overflow-hidden">
                      {processedImage && (
                        <img src={processedImage} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{selectedPrintLayout.paperSize} 용지, {selectedPrintLayout.count}장</p>
            </div>
          )}
        </div>

        {/* Info & Download */}
        <div className="space-y-6">
          {/* Photo Info */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">사진 정보</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">사진 유형</span>
                <span className="font-medium">{selectedSpec?.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">크기</span>
                <span className="font-medium">
                  {selectedSpec ? `${selectedSpec.width} x ${selectedSpec.height} ${selectedSpec.unit}` : '-'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">배경색</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded border border-gray-300"
                    style={getBackgroundStyle()}
                  ></div>
                  <span className="font-medium">{selectedBackground?.name || '-'}</span>
                </div>
              </div>
              {selectedOutfit && (
                <div className="flex justify-between">
                  <span className="text-gray-500">복장</span>
                  <span className="font-medium">{selectedOutfit.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">해상도</span>
                <span className="font-medium">{selectedSpec?.dpi || 300} DPI</span>
              </div>
              {selectedPrintLayout && (
                <div className="flex justify-between">
                  <span className="text-gray-500">인쇄 배치</span>
                  <span className="font-medium">{selectedPrintLayout.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleDownload('web')}
              className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              <Download className="w-5 h-5" />
              웹용 다운로드 (72 DPI)
            </button>

            <button
              onClick={() => handleDownload('print')}
              className="w-full py-4 border-2 border-indigo-200 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              인쇄용 다운로드 (300 DPI)
              <span className="text-xs bg-indigo-100 px-2 py-0.5 rounded-full">Pro</span>
            </button>

            {selectedPrintLayout && selectedPrintLayout.id !== 'single' && (
              <button
                onClick={() => handleDownload('layout')}
                className="w-full py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <FileImage className="w-5 h-5" />
                배치 파일 다운로드
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Pro</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="w-full py-3 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              공유하기
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200"
            >
              다시 편집
            </button>
            <button
              onClick={onReset}
              className="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              새 사진
            </button>
          </div>

          {/* Pro Promo */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Pro 플랜 혜택</span>
            </div>
            <ul className="text-sm text-indigo-100 space-y-1.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                워터마크 없는 고화질 원본
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                300 DPI 인쇄용 파일
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                모든 복장 & 배경 옵션
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                30일 재다운로드
              </li>
            </ul>
            <button className="mt-4 w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Pro 시작하기 - ₩9,900/월
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
