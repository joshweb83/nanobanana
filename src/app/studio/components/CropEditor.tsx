"use client";

import { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { PhotoSpec } from "@/types";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  Maximize,
  RefreshCw,
  Wand2,
  Check,
  X
} from "lucide-react";

interface CropEditorProps {
  image: string;
  selectedSpec: PhotoSpec | null;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

// 크롭된 이미지를 생성하는 유틸리티 함수
const createCroppedImage = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation: number = 0
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return canvas.toDataURL("image/jpeg", 0.95);
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export default function CropEditor({
  image,
  selectedSpec,
  onCropComplete,
  onCancel
}: CropEditorProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cropMode, setCropMode] = useState<'auto' | 'manual'>('auto');

  // 규격에 맞는 비율 계산
  const getAspectRatio = () => {
    if (!selectedSpec) return 3 / 4; // 기본 비율
    return selectedSpec.width / selectedSpec.height;
  };

  const onCropChange = useCallback((location: Point) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const onCropAreaComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 자동 크롭 (중앙 기준)
  const handleAutoCrop = useCallback(() => {
    setCropMode('auto');
    setCrop({ x: 0, y: 0 });
    setZoom(1.2); // 약간 확대하여 얼굴 중심
    setRotation(0);
  }, []);

  // 수동 크롭 모드
  const handleManualCrop = useCallback(() => {
    setCropMode('manual');
  }, []);

  // 회전
  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  // 초기화
  const handleReset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  }, []);

  // 크롭 적용
  const handleApplyCrop = async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedImage = await createCroppedImage(
        image,
        croppedAreaPixels,
        rotation
      );
      onCropComplete(croppedImage);
    } catch (error) {
      console.error("Crop failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">사진 크롭</h2>
          <p className="text-sm text-gray-500">
            {selectedSpec ? `${selectedSpec.name} (${selectedSpec.width}x${selectedSpec.height} ${selectedSpec.unit})` : '사진 영역을 조정하세요'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAutoCrop}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              cropMode === 'auto'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            자동
          </button>
          <button
            onClick={handleManualCrop}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              cropMode === 'manual'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Move className="w-4 h-4" />
            수동
          </button>
        </div>
      </div>

      {/* Crop Area */}
      <div className="relative h-[400px] sm:h-[500px] bg-gray-900">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={getAspectRatio()}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropAreaComplete}
          cropShape="rect"
          showGrid={true}
          style={{
            containerStyle: {
              backgroundColor: '#1a1a1a'
            },
            cropAreaStyle: {
              border: '2px solid #6366f1',
              borderRadius: '8px'
            }
          }}
        />

        {/* Crop Guide Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
            드래그하여 위치 조정
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        {/* Zoom Control */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">확대/축소</span>
            <span className="text-sm text-indigo-600">{Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setZoom(Math.max(1, zoom - 0.1))}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <ZoomOut className="w-4 h-4 text-gray-600" />
            </button>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <button
              onClick={() => setZoom(Math.min(3, zoom + 0.1))}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Rotation Control */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">회전</span>
            <span className="text-sm text-indigo-600">{rotation}°</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRotation(Math.max(-180, rotation - 90))}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <RotateCw className="w-4 h-4 text-gray-600 transform -scale-x-100" />
            </button>
            <input
              type="range"
              min={-180}
              max={180}
              step={1}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <button
              onClick={() => setRotation(Math.min(180, rotation + 90))}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <RotateCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleReset}
            className="flex-1 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            초기화
          </button>
          <button
            onClick={handleRotate}
            className="flex-1 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
          >
            <RotateCw className="w-4 h-4" />
            90° 회전
          </button>
          <button
            onClick={() => setZoom(1)}
            className="flex-1 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
          >
            <Maximize className="w-4 h-4" />
            맞추기
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-300 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            취소
          </button>
          <button
            onClick={handleApplyCrop}
            disabled={isProcessing}
            className="flex-[2] gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                처리 중...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                크롭 적용
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-indigo-50 border-t border-indigo-100">
        <p className="text-sm text-indigo-700">
          <span className="font-medium">TIP:</span> 증명사진은 얼굴이 사진의 70-80%를 차지해야 합니다.
          머리 위 여백을 적절히 남겨주세요.
        </p>
      </div>
    </div>
  );
}
