"use client";

import { PrintLayout, PhotoSpec } from "@/types";
import { printLayouts, getCompatibleLayouts } from "@/lib/printLayouts";
import { Check, Lock, Grid, FileImage, AlertCircle } from "lucide-react";

interface PrintLayoutSelectorProps {
  selectedLayout: PrintLayout | null;
  onSelect: (layout: PrintLayout) => void;
  selectedSpec?: PhotoSpec | null;
}

export default function PrintLayoutSelector({ selectedLayout, onSelect, selectedSpec }: PrintLayoutSelectorProps) {
  // 선택된 규격에 맞는 레이아웃만 필터링
  const compatibleLayouts = getCompatibleLayouts(selectedSpec || null);
  const incompatibleLayoutIds = printLayouts
    .filter(l => !compatibleLayouts.find(c => c.id === l.id))
    .map(l => l.id);

  const renderLayoutPreview = (layout: PrintLayout) => {
    const cells = [];
    for (let i = 0; i < layout.rows * layout.cols; i++) {
      cells.push(
        <div
          key={i}
          className="bg-indigo-200 rounded-sm flex items-center justify-center"
        >
          <div className="w-2 h-2.5 bg-indigo-400 rounded-full"></div>
        </div>
      );
    }
    return (
      <div
        className={`grid gap-0.5 p-1 bg-white rounded-lg border border-gray-300`}
        style={{
          gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
          aspectRatio: layout.paperSize === 'A4' ? '210/297' : layout.paperSize === '5x7 inch' ? '5/7' : '4/6'
        }}
      >
        {cells}
      </div>
    );
  };

  const isIncompatible = (layoutId: string) => incompatibleLayoutIds.includes(layoutId);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">인쇄 배치</h2>
        <span className="text-sm text-gray-500">출력용 배치 선택</span>
      </div>

      {/* 규격 기반 필터링 안내 */}
      {selectedSpec && incompatibleLayoutIds.length > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            <span className="font-medium">{selectedSpec.name}</span> ({selectedSpec.width}x{selectedSpec.height}{selectedSpec.unit}) 규격에 맞는 배치만 활성화됩니다.
            사진 크기가 용지에 맞지 않는 배치는 비활성화됩니다.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {printLayouts.map((layout) => {
          const incompatible = isIncompatible(layout.id);
          const disabled = layout.premium || incompatible;

          return (
            <button
              key={layout.id}
              onClick={() => !disabled && onSelect(layout)}
              disabled={disabled}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedLayout?.id === layout.id
                  ? "border-indigo-500 bg-indigo-50"
                  : incompatible
                  ? "border-gray-200 opacity-40 cursor-not-allowed"
                  : layout.premium
                  ? "border-gray-200 opacity-60"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              {/* Preview */}
              <div className="w-full aspect-square flex items-center justify-center mb-3">
                {layout.id === 'single' ? (
                  <div className={`w-12 h-16 rounded-lg flex items-center justify-center border ${
                    incompatible ? 'bg-gray-100 border-gray-200' : 'bg-indigo-100 border-indigo-200'
                  }`}>
                    <FileImage className={`w-6 h-6 ${incompatible ? 'text-gray-300' : 'text-indigo-400'}`} />
                  </div>
                ) : (
                  <div className="w-full max-w-[80px]">
                    {renderLayoutPreview(layout)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center">
                <p className={`font-medium text-sm ${incompatible ? 'text-gray-400' : 'text-gray-900'}`}>
                  {layout.name}
                </p>
                <p className="text-xs text-gray-500">{layout.paperSize}</p>
              </div>

              {/* Selection Check */}
              {selectedLayout?.id === layout.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Incompatible Overlay */}
              {incompatible && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl">
                  <div className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">크기 초과</span>
                  </div>
                </div>
              )}

              {/* Premium Lock */}
              {layout.premium && !incompatible && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
                  <div className="bg-white px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">Pro</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Layout Info */}
      {selectedLayout && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-4">
            <Grid className="w-8 h-8 text-indigo-600" />
            <div>
              <p className="font-medium text-gray-900">{selectedLayout.name}</p>
              <p className="text-sm text-gray-600">
                {selectedLayout.paperSize} 용지에 {selectedLayout.count}장 배치
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Print Tips */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-700">TIP:</span> 인쇄소나 사진관에서 출력 시 선택한 용지 크기에 맞게 출력해주세요.
          300 DPI 고해상도로 제공됩니다.
        </p>
      </div>
    </div>
  );
}
