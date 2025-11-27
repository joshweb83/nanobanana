"use client";

import { useState } from "react";
import { OutfitOption } from "@/types";
import { outfitOptions, getOutfitsByGender, getOutfitsByCategory } from "@/lib/outfits";
import { Check, Lock, User, Shirt } from "lucide-react";

interface OutfitSelectorProps {
  selectedOutfit: OutfitOption | null;
  onSelect: (outfit: OutfitOption | null) => void;
}

type Gender = 'male' | 'female';
type OutfitCategory = 'formal' | 'business' | 'casual' | 'uniform' | 'student';

const categories: { id: OutfitCategory | 'all'; name: string }[] = [
  { id: 'all', name: '전체' },
  { id: 'formal', name: '정장' },
  { id: 'business', name: '비즈니스' },
  { id: 'casual', name: '캐주얼' },
  { id: 'uniform', name: '유니폼' },
  { id: 'student', name: '학생' },
];

export default function OutfitSelector({ selectedOutfit, onSelect }: OutfitSelectorProps) {
  const [gender, setGender] = useState<Gender>('male');
  const [activeCategory, setActiveCategory] = useState<OutfitCategory | 'all'>('all');

  const genderOutfits = getOutfitsByGender(gender);
  const filteredOutfits = activeCategory === 'all'
    ? genderOutfits
    : genderOutfits.filter(o => o.category === activeCategory);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">복장 선택</h2>
        <button
          onClick={() => onSelect(null)}
          className={`text-sm px-3 py-1 rounded-lg transition-all ${
            selectedOutfit === null
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          원본 유지
        </button>
      </div>

      {/* Gender Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setGender('male')}
          className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            gender === 'male'
              ? "bg-blue-100 text-blue-700 border-2 border-blue-200"
              : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
          }`}
        >
          <User className="w-4 h-4" />
          남성
        </button>
        <button
          onClick={() => setGender('female')}
          className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            gender === 'female'
              ? "bg-pink-100 text-pink-700 border-2 border-pink-200"
              : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
          }`}
        >
          <User className="w-4 h-4" />
          여성
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Outfit Grid */}
      <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
        {filteredOutfits.map((outfit) => (
          <button
            key={outfit.id}
            onClick={() => !outfit.premium && onSelect(outfit)}
            className={`relative rounded-xl border-2 overflow-hidden transition-all ${
              selectedOutfit?.id === outfit.id
                ? "border-indigo-500 ring-2 ring-indigo-200"
                : outfit.premium
                ? "border-gray-200 opacity-60"
                : "border-gray-200 hover:border-indigo-300"
            }`}
          >
            {/* Outfit Preview */}
            <div className="aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <Shirt className="w-8 h-8 text-gray-400" />
                {outfit.colors && (
                  <div className="flex gap-1">
                    {outfit.colors.slice(0, 3).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Outfit Name */}
            <div className="p-2 bg-white">
              <p className="text-xs font-medium text-gray-700 truncate">{outfit.name}</p>
            </div>

            {/* Selection Indicator */}
            {selectedOutfit?.id === outfit.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Premium Lock */}
            {outfit.premium && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3 text-gray-600" />
                  <span className="text-xs text-gray-600">Pro</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Outfit */}
      {selectedOutfit && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-xl flex items-center gap-3">
          <div className="w-12 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <Shirt className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-900">{selectedOutfit.name}</span>
            <span className="text-xs text-gray-500 block capitalize">
              {selectedOutfit.category === 'formal' ? '정장' :
               selectedOutfit.category === 'business' ? '비즈니스' :
               selectedOutfit.category === 'casual' ? '캐주얼' :
               selectedOutfit.category === 'uniform' ? '유니폼' : '학생복'}
            </span>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="text-sm text-red-500 hover:text-red-600"
          >
            제거
          </button>
        </div>
      )}
    </div>
  );
}
