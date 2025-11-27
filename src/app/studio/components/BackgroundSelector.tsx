"use client";

import { useState } from "react";
import { BackgroundOption } from "@/types";
import { backgroundOptions, getBackgroundsByType } from "@/lib/backgrounds";
import { Check, Lock, Palette } from "lucide-react";

interface BackgroundSelectorProps {
  selectedBackground: BackgroundOption | null;
  onSelect: (background: BackgroundOption) => void;
}

type BackgroundType = 'solid' | 'gradient' | 'studio';

const types: { id: BackgroundType; name: string }[] = [
  { id: 'solid', name: '단색' },
  { id: 'gradient', name: '그라데이션' },
  { id: 'studio', name: '스튜디오' },
];

export default function BackgroundSelector({ selectedBackground, onSelect }: BackgroundSelectorProps) {
  const [activeType, setActiveType] = useState<BackgroundType>('solid');
  const [customColor, setCustomColor] = useState('#FFFFFF');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const filteredBackgrounds = getBackgroundsByType(activeType);

  const getBackgroundStyle = (bg: BackgroundOption) => {
    if (bg.type === 'solid') {
      return { backgroundColor: bg.value };
    }
    return { background: bg.value };
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">배경 선택</h2>

      {/* Type Tabs */}
      <div className="flex gap-2 mb-4">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeType === type.id
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* Background Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-4">
        {filteredBackgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => !bg.premium && onSelect(bg)}
            className={`relative aspect-square rounded-xl border-2 transition-all overflow-hidden ${
              selectedBackground?.id === bg.id
                ? "border-indigo-500 ring-2 ring-indigo-200"
                : bg.premium
                ? "border-gray-200 opacity-60"
                : "border-gray-200 hover:border-indigo-300"
            }`}
            style={getBackgroundStyle(bg)}
            title={bg.name}
          >
            {selectedBackground?.id === bg.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
            {bg.premium && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Lock className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}

        {/* Custom Color Picker */}
        {activeType === 'solid' && (
          <button
            onClick={() => setShowCustomPicker(!showCustomPicker)}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-indigo-300 hover:bg-gray-50"
          >
            <Palette className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">커스텀</span>
          </button>
        )}
      </div>

      {/* Custom Color Picker Panel */}
      {showCustomPicker && activeType === 'solid' && (
        <div className="p-4 bg-gray-50 rounded-xl mb-4">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
            />
            <div className="flex-1">
              <label className="text-sm text-gray-600 block mb-1">색상 코드</label>
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="#FFFFFF"
              />
            </div>
            <button
              onClick={() => {
                onSelect({
                  id: 'custom',
                  name: '커스텀',
                  type: 'solid',
                  value: customColor,
                  preview: '',
                  premium: true
                });
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              적용
            </button>
          </div>
        </div>
      )}

      {/* Background Names */}
      <div className="flex flex-wrap gap-2">
        {filteredBackgrounds.slice(0, 6).map((bg) => (
          <span
            key={bg.id}
            className={`text-xs px-2 py-1 rounded-full ${
              selectedBackground?.id === bg.id
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {bg.name}
          </span>
        ))}
      </div>

      {/* Selected Background */}
      {selectedBackground && (
        <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg border border-gray-200"
            style={getBackgroundStyle(selectedBackground)}
          ></div>
          <div>
            <span className="text-sm font-medium text-gray-900">{selectedBackground.name}</span>
            <span className="text-xs text-gray-500 block">{selectedBackground.type === 'solid' ? '단색' : selectedBackground.type === 'gradient' ? '그라데이션' : '스튜디오'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
