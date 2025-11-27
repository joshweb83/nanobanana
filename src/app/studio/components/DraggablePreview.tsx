"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PhotoSpec, BackgroundOption } from "@/types";
import { Move, ZoomIn, ZoomOut, RotateCcw, Target, Maximize2 } from "lucide-react";

interface DraggablePreviewProps {
  image: string;
  selectedSpec: PhotoSpec | null;
  selectedBackground: BackgroundOption | null;
  onCropChange: (cropData: CropData) => void;
  initialCrop?: CropData;
}

export interface CropData {
  x: number; // -100 to 100 (percentage offset from center)
  y: number; // -100 to 100 (percentage offset from center)
  zoom: number; // 1 to 3
}

export default function DraggablePreview({
  image,
  selectedSpec,
  selectedBackground,
  onCropChange,
  initialCrop
}: DraggablePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const [crop, setCrop] = useState<CropData>(initialCrop || { x: 0, y: 0, zoom: 1 });
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // 이미지 로드 시 크기 저장
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
      img.src = image;
    }
  }, [image]);

  // 규격 변경 시 자동 최적화 (얼굴 중심 크롭)
  useEffect(() => {
    if (selectedSpec && imageSize.width > 0) {
      const specAspect = selectedSpec.width / selectedSpec.height;
      const imageAspect = imageSize.width / imageSize.height;

      // 자동 줌 계산: 얼굴 비율에 맞게
      let autoZoom = 1;

      // 이미지가 세로로 길면 가로 기준, 가로로 길면 세로 기준으로 줌
      if (imageAspect > specAspect) {
        // 이미지가 더 넓음 - 세로 기준
        autoZoom = 1;
      } else {
        // 이미지가 더 좁음 - 가로 기준
        autoZoom = specAspect / imageAspect;
      }

      // faceRatio에 따라 추가 줌 조정 (얼굴이 커야 하면 더 확대)
      const faceZoom = 1 + (selectedSpec.faceRatio - 0.5) * 0.5;
      autoZoom = Math.min(Math.max(autoZoom * faceZoom, 1), 2.5);

      // headTopMargin에 따라 y 오프셋 조정 (머리 위 여백)
      const autoY = -(selectedSpec.headTopMargin * 100) + 10;

      const newCrop = {
        x: 0,
        y: Math.max(-50, Math.min(autoY, 50)),
        zoom: autoZoom
      };

      setCrop(newCrop);
      onCropChange(newCrop);
    }
  }, [selectedSpec, imageSize, onCropChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - lastPosition.current.x) / rect.width) * 100;
    const deltaY = ((e.clientY - lastPosition.current.y) / rect.height) * 100;

    lastPosition.current = { x: e.clientX, y: e.clientY };

    setCrop(prev => {
      // 줌에 따라 이동 범위 제한
      const maxOffset = (prev.zoom - 1) * 50;
      const newCrop = {
        ...prev,
        x: Math.max(-maxOffset, Math.min(prev.x + deltaX, maxOffset)),
        y: Math.max(-maxOffset, Math.min(prev.y + deltaY, maxOffset))
      };
      onCropChange(newCrop);
      return newCrop;
    });
  }, [onCropChange]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    const touch = e.touches[0];
    lastPosition.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((touch.clientX - lastPosition.current.x) / rect.width) * 100;
    const deltaY = ((touch.clientY - lastPosition.current.y) / rect.height) * 100;

    lastPosition.current = { x: touch.clientX, y: touch.clientY };

    setCrop(prev => {
      const maxOffset = (prev.zoom - 1) * 50;
      const newCrop = {
        ...prev,
        x: Math.max(-maxOffset, Math.min(prev.x + deltaX, maxOffset)),
        y: Math.max(-maxOffset, Math.min(prev.y + deltaY, maxOffset))
      };
      onCropChange(newCrop);
      return newCrop;
    });
  }, [onCropChange]);

  const handleZoom = useCallback((delta: number) => {
    setCrop(prev => {
      const newZoom = Math.max(1, Math.min(prev.zoom + delta, 3));
      // 줌 변경 시 오프셋도 조정
      const maxOffset = (newZoom - 1) * 50;
      const newCrop = {
        x: Math.max(-maxOffset, Math.min(prev.x, maxOffset)),
        y: Math.max(-maxOffset, Math.min(prev.y, maxOffset)),
        zoom: newZoom
      };
      onCropChange(newCrop);
      return newCrop;
    });
  }, [onCropChange]);

  const handleReset = useCallback(() => {
    const newCrop = { x: 0, y: 0, zoom: 1 };
    setCrop(newCrop);
    onCropChange(newCrop);
  }, [onCropChange]);

  const handleAutoOptimize = useCallback(() => {
    if (!selectedSpec) return;

    // 얼굴 중심으로 자동 최적화
    const faceZoom = 1 + (selectedSpec.faceRatio - 0.5) * 0.8;
    const autoY = -(selectedSpec.headTopMargin * 80);

    const newCrop = {
      x: 0,
      y: Math.max(-50, Math.min(autoY, 50)),
      zoom: Math.min(Math.max(faceZoom, 1), 2.5)
    };

    setCrop(newCrop);
    onCropChange(newCrop);
  }, [selectedSpec, onCropChange]);

  const getBackgroundStyle = () => {
    if (!selectedBackground) return { backgroundColor: '#FFFFFF' };
    if (selectedBackground.type === 'solid') {
      return { backgroundColor: selectedBackground.value };
    }
    return { background: selectedBackground.value };
  };

  const getAspectRatio = () => {
    if (!selectedSpec) return '3/4';
    return `${selectedSpec.width}/${selectedSpec.height}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">미리보기</h2>
        <div className="flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
          <Move className="w-3 h-3" />
          드래그하여 위치 조정
        </div>
      </div>

      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden mx-auto cursor-move select-none"
        style={{
          aspectRatio: getAspectRatio(),
          maxWidth: '400px',
          ...getBackgroundStyle()
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {image && (
          <>
            <img
              ref={imageRef}
              src={image}
              alt="Preview"
              className="absolute w-full h-full object-cover transition-transform duration-75"
              style={{
                transform: `scale(${crop.zoom}) translate(${crop.x / crop.zoom}%, ${crop.y / crop.zoom}%)`,
                transformOrigin: 'center center'
              }}
              draggable={false}
            />

            {/* Face Guide Overlay */}
            {selectedSpec && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Center vertical line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30 -translate-x-1/2"></div>

                {/* Face area guide (oval) */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 border-2 border-dashed border-white/50 rounded-full transition-all"
                  style={{
                    top: `${selectedSpec.headTopMargin * 100}%`,
                    width: '45%',
                    height: `${selectedSpec.faceRatio * 75}%`,
                  }}
                >
                  {/* Face center marker */}
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Top margin indicator */}
                <div
                  className="absolute left-0 right-0 border-b border-dashed border-yellow-400/50"
                  style={{ top: `${selectedSpec.headTopMargin * 100}%` }}
                ></div>
              </div>
            )}

            {/* Drag indicator (visible while dragging) */}
            {isDragging.current && (
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <Move className="w-8 h-8 text-white/80" />
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => handleZoom(-0.25)}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
          disabled={crop.zoom <= 1}
          title="축소"
        >
          <ZoomOut className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => handleZoom(0.25)}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
          disabled={crop.zoom >= 3}
          title="확대"
        >
          <ZoomIn className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleAutoOptimize}
          className="p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
          title="자동 최적화"
        >
          <Target className="w-5 h-5 text-indigo-600" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          title="초기화"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => setShowFullscreen(true)}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          title="전체화면"
        >
          <Maximize2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Zoom Level */}
      <div className="mt-2 text-center text-sm text-gray-500">
        {Math.round(crop.zoom * 100)}%
        {crop.x !== 0 || crop.y !== 0 ? (
          <span className="text-indigo-500 ml-2">위치 조정됨</span>
        ) : null}
      </div>

      {/* Spec Info */}
      {selectedSpec && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">규격</span>
            <span className="font-medium">{selectedSpec.name} ({selectedSpec.width}x{selectedSpec.height} {selectedSpec.unit})</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-500">얼굴 비율</span>
            <span className="font-medium">{Math.round(selectedSpec.faceRatio * 100)}%</span>
          </div>
        </div>
      )}

      {/* Guide Text */}
      <div className="mt-3 text-xs text-center text-gray-400">
        점선 원 안에 얼굴이 들어오도록 위치를 조정하세요
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && image && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              aspectRatio: getAspectRatio(),
              maxWidth: '90vw',
              maxHeight: '90vh',
              ...getBackgroundStyle()
            }}
          >
            <img
              src={image}
              alt="Fullscreen Preview"
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${crop.zoom}) translate(${crop.x / crop.zoom}%, ${crop.y / crop.zoom}%)`
              }}
            />
          </div>
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
