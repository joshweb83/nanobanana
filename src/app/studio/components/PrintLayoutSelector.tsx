"use client";

import { PrintLayout } from "@/types";
import { printLayouts } from "@/lib/printLayouts";
import { Check, Lock, Grid, FileImage } from "lucide-react";

interface PrintLayoutSelectorProps {
  selectedLayout: PrintLayout | null;
  onSelect: (layout: PrintLayout) => void;
}

export default function PrintLayoutSelector({ selectedLayout, onSelect }: PrintLayoutSelectorProps) {
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">인쇄 배치</h2>
        <span className="text-sm text-gray-500">출력용 배치 선택</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {printLayouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => !layout.premium && onSelect(layout)}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              selectedLayout?.id === layout.id
                ? "border-indigo-500 bg-indigo-50"
                : layout.premium
                ? "border-gray-200 opacity-60"
                : "border-gray-200 hover:border-indigo-300"
            }`}
          >
            {/* Preview */}
            <div className="w-full aspect-square flex items-center justify-center mb-3">
              {layout.id === 'single' ? (
                <div className="w-12 h-16 bg-indigo-100 rounded-lg flex items-center justify-center border border-indigo-200">
                  <FileImage className="w-6 h-6 text-indigo-400" />
                </div>
              ) : (
                <div className="w-full max-w-[80px]">
                  {renderLayoutPreview(layout)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center">
              <p className="font-medium text-gray-900 text-sm">{layout.name}</p>
              <p className="text-xs text-gray-500">{layout.paperSize}</p>
            </div>

            {/* Selection Check */}
            {selectedLayout?.id === layout.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Premium Lock */}
            {layout.premium && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
                <div className="bg-white px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">Pro</span>
                </div>
              </div>
            )}
          </button>
        ))}
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
