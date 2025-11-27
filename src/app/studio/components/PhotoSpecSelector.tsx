"use client";

import { useState } from "react";
import { PhotoSpec } from "@/types";
import { photoSpecs, getSpecsByCategory } from "@/lib/photoSpecs";
import { Globe, FileText, User, Check, Info } from "lucide-react";

interface PhotoSpecSelectorProps {
  selectedSpec: PhotoSpec | null;
  onSelect: (spec: PhotoSpec) => void;
}

type Category = 'domestic' | 'international' | 'profile';

const categories: { id: Category; name: string; icon: React.ReactNode }[] = [
  { id: 'domestic', name: '국내 증명사진', icon: <FileText className="w-4 h-4" /> },
  { id: 'international', name: '해외 비자/여권', icon: <Globe className="w-4 h-4" /> },
  { id: 'profile', name: '프로필 사진', icon: <User className="w-4 h-4" /> },
];

export default function PhotoSpecSelector({ selectedSpec, onSelect }: PhotoSpecSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('domestic');
  const [showRequirements, setShowRequirements] = useState<string | null>(null);

  const filteredSpecs = getSpecsByCategory(activeCategory);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">사진 규격 선택</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "gradient-bg text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Spec Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
        {filteredSpecs.map((spec) => (
          <div key={spec.id} className="relative">
            <button
              onClick={() => onSelect(spec)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedSpec?.id === spec.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{spec.name}</span>
                    {spec.country && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {spec.country}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-indigo-600 font-medium mt-1">
                    {spec.width} x {spec.height} {spec.unit}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{spec.description}</div>
                </div>
                {selectedSpec?.id === spec.id && (
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Requirements toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRequirements(showRequirements === spec.id ? null : spec.id);
                }}
                className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                규격 요구사항 보기
              </button>

              {/* Requirements dropdown */}
              {showRequirements === spec.id && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <ul className="text-xs text-gray-600 space-y-1">
                    {spec.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Selected Spec Summary */}
      {selectedSpec && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-indigo-600 font-medium">선택된 규격:</span>
              <span className="ml-2 font-semibold text-gray-900">{selectedSpec.name}</span>
            </div>
            <div className="text-sm text-gray-600">
              {selectedSpec.width} x {selectedSpec.height} {selectedSpec.unit} | {selectedSpec.dpi} DPI
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
