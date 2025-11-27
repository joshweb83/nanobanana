"use client";

import { useState } from "react";
import { retouchOptions, getRetouchByCategory, getDefaultRetouchSettings } from "@/lib/retouchOptions";
import { RetouchOption } from "@/types";
import { Lock, RotateCcw, Sparkles, User, Scissors, Sun } from "lucide-react";

interface RetouchPanelProps {
  settings: Record<string, number>;
  onSettingsChange: (settings: Record<string, number>) => void;
}

type RetouchCategory = 'skin' | 'face' | 'hair' | 'overall';

const categories: { id: RetouchCategory; name: string; icon: React.ReactNode }[] = [
  { id: 'skin', name: '피부', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'face', name: '얼굴', icon: <User className="w-4 h-4" /> },
  { id: 'hair', name: '헤어', icon: <Scissors className="w-4 h-4" /> },
  { id: 'overall', name: '전체', icon: <Sun className="w-4 h-4" /> },
];

export default function RetouchPanel({ settings, onSettingsChange }: RetouchPanelProps) {
  const [activeCategory, setActiveCategory] = useState<RetouchCategory>('skin');

  const handleSliderChange = (optionId: string, value: number) => {
    onSettingsChange({
      ...settings,
      [optionId]: value
    });
  };

  const handleReset = () => {
    onSettingsChange(getDefaultRetouchSettings());
  };

  const handleResetCategory = (category: RetouchCategory) => {
    const defaults = getDefaultRetouchSettings();
    const categoryOptions = getRetouchByCategory(category);
    const newSettings = { ...settings };
    categoryOptions.forEach(opt => {
      newSettings[opt.id] = defaults[opt.id];
    });
    onSettingsChange(newSettings);
  };

  const filteredOptions = getRetouchByCategory(activeCategory);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">보정 옵션</h2>
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          전체 초기화
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Retouch Options */}
      <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
        {filteredOptions.map((option) => (
          <div key={option.id} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">{option.name}</span>
                {option.premium && (
                  <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    Pro
                  </span>
                )}
              </div>
              <span className="text-sm text-indigo-600 font-medium">
                {settings[option.id] ?? option.default}
                {option.id.includes('brightness') || option.id.includes('contrast') || option.id.includes('volume') ? '' : '%'}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-2">{option.description}</p>

            <div className={`relative ${option.premium ? 'opacity-50' : ''}`}>
              <input
                type="range"
                min={option.min}
                max={option.max}
                step={option.step}
                value={settings[option.id] ?? option.default}
                onChange={(e) => !option.premium && handleSliderChange(option.id, Number(e.target.value))}
                disabled={option.premium}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{option.min}</span>
                <span>{option.max}</span>
              </div>
            </div>

            {option.premium && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-600 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Pro 플랜에서 사용 가능
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-3">빠른 보정</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const newSettings = { ...settings };
              newSettings['skin-smooth'] = 70;
              newSettings['skin-tone'] = 50;
              newSettings['skin-brightness'] = 15;
              onSettingsChange(newSettings);
            }}
            className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg text-sm font-medium hover:bg-pink-100"
          >
            피부 화사하게
          </button>
          <button
            onClick={() => {
              const newSettings = { ...settings };
              newSettings['eye-bright'] = 50;
              newSettings['eye-redness'] = 80;
              onSettingsChange(newSettings);
            }}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100"
          >
            눈 또렷하게
          </button>
          <button
            onClick={() => {
              const newSettings = { ...settings };
              newSettings['hair-fix'] = 80;
              newSettings['hair-flyaway'] = 90;
              onSettingsChange(newSettings);
            }}
            className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100"
          >
            헤어 정돈
          </button>
          <button
            onClick={() => {
              const newSettings = { ...settings };
              newSettings['skin-smooth'] = 30;
              newSettings['skin-brightness'] = 5;
              newSettings['overall-sharpness'] = 15;
              onSettingsChange(newSettings);
            }}
            className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100"
          >
            자연스럽게
          </button>
        </div>
      </div>

      {/* Category Reset */}
      <div className="mt-4">
        <button
          onClick={() => handleResetCategory(activeCategory)}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          {categories.find(c => c.id === activeCategory)?.name} 옵션 초기화
        </button>
      </div>
    </div>
  );
}
