"use client";

import { useState, useRef, useCallback } from "react";
import { PhotoSpec, BackgroundOption } from "@/types";
import { ZoomIn, ZoomOut, RotateCw, Move, Maximize2 } from "lucide-react";

interface ImagePreviewProps {
  originalImage: string | null;
  processedImage: string | null;
  selectedSpec: PhotoSpec | null;
  selectedBackground: BackgroundOption | null;
  showComparison?: boolean;
}

export default function ImagePreview({
  originalImage,
  processedImage,
  selectedSpec,
  selectedBackground,
  showComparison = true
}: ImagePreviewProps) {
  const [comparePosition, setComparePosition] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'result' | 'compare' | 'original'>('result');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setComparePosition(Math.min(Math.max(x, 0), 100));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setComparePosition(Math.min(Math.max(x, 0), 100));
  }, []);

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

  const imageToShow = processedImage || originalImage;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">미리보기</h2>

        {/* View Mode Toggle */}
        {showComparison && processedImage && (
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('result')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                viewMode === 'result' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              결과
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                viewMode === 'compare' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              비교
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                viewMode === 'original' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              원본
            </button>
          </div>
        )}
      </div>

      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden mx-auto"
        style={{
          aspectRatio: getAspectRatio(),
          maxWidth: '400px',
          ...getBackgroundStyle()
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {imageToShow ? (
          <>
            {/* Result or Original View */}
            {(viewMode === 'result' || viewMode === 'original') && (
              <img
                src={viewMode === 'original' ? originalImage! : imageToShow}
                alt={viewMode === 'original' ? 'Original' : 'Preview'}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${zoom})` }}
              />
            )}

            {/* Comparison View */}
            {viewMode === 'compare' && originalImage && processedImage && (
              <>
                {/* Processed Image (Background) */}
                <img
                  src={processedImage}
                  alt="Processed"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Original Image (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${comparePosition}%` }}
                >
                  <img
                    src={originalImage}
                    alt="Original"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: `${100 / (comparePosition / 100)}%`, maxWidth: 'none' }}
                  />
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
                  style={{ left: `${comparePosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <Move className="w-4 h-4 text-gray-600" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 rounded text-xs text-white">
                  원본
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded text-xs text-white">
                  보정
                </div>
              </>
            )}

            {/* Spec Guidelines Overlay */}
            {selectedSpec && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Center guide */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30 -translate-x-1/2"></div>

                {/* Face area guide */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 border-2 border-dashed border-white/40 rounded-full"
                  style={{
                    top: `${selectedSpec.headTopMargin * 100}%`,
                    width: '45%',
                    height: `${selectedSpec.faceRatio * 80}%`,
                  }}
                ></div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-sm">사진을 업로드하세요</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setZoom(Math.max(1, zoom - 0.25))}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          disabled={zoom <= 1}
        >
          <ZoomOut className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => setZoom(Math.min(3, zoom + 0.25))}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          disabled={zoom >= 3}
        >
          <ZoomIn className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <RotateCw className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => setShowFullscreen(true)}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Maximize2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Zoom Level */}
      <div className="mt-2 text-center text-sm text-gray-500">
        {Math.round(zoom * 100)}%
      </div>

      {/* Spec Info */}
      {selectedSpec && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">규격</span>
            <span className="font-medium">{selectedSpec.name} ({selectedSpec.width}x{selectedSpec.height} {selectedSpec.unit})</span>
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {showFullscreen && imageToShow && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <img
            src={imageToShow}
            alt="Fullscreen Preview"
            className="max-w-full max-h-full object-contain"
          />
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
