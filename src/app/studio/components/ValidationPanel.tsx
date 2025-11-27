"use client";

import { PhotoSpec } from "@/types";
import { Check, X, AlertTriangle, Info } from "lucide-react";

interface ValidationResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

interface ValidationPanelProps {
  selectedSpec: PhotoSpec | null;
  hasImage: boolean;
}

export default function ValidationPanel({ selectedSpec, hasImage }: ValidationPanelProps) {
  // Simulated validation results (in real app, this would come from AI analysis)
  const getValidationResults = (): ValidationResult[] => {
    if (!hasImage) {
      return [];
    }

    // Mock validation results
    return [
      {
        id: 'face-size',
        name: '얼굴 크기',
        status: 'pass',
        message: '규격에 맞는 얼굴 비율입니다'
      },
      {
        id: 'head-position',
        name: '머리 위치',
        status: 'pass',
        message: '머리 위 여백이 적절합니다'
      },
      {
        id: 'face-direction',
        name: '얼굴 방향',
        status: 'pass',
        message: '정면을 바라보고 있습니다'
      },
      {
        id: 'eye-open',
        name: '눈 상태',
        status: 'pass',
        message: '눈이 자연스럽게 뜬 상태입니다'
      },
      {
        id: 'background',
        name: '배경',
        status: 'pass',
        message: 'AI가 배경을 처리합니다'
      },
      {
        id: 'lighting',
        name: '조명',
        status: 'warning',
        message: '조명이 다소 어두울 수 있습니다'
      },
      {
        id: 'shoulders',
        name: '어깨 포함',
        status: 'pass',
        message: '상반신이 적절하게 포함되어 있습니다'
      },
      {
        id: 'accessories',
        name: '액세서리',
        status: 'pass',
        message: '부적절한 액세서리가 감지되지 않았습니다'
      }
    ];
  };

  const validationResults = getValidationResults();
  const passCount = validationResults.filter(r => r.status === 'pass').length;
  const failCount = validationResults.filter(r => r.status === 'fail').length;
  const warningCount = validationResults.filter(r => r.status === 'warning').length;

  const getStatusIcon = (status: ValidationResult['status']) => {
    switch (status) {
      case 'pass':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'fail':
        return <X className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    }
  };

  const getStatusColor = (status: ValidationResult['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200';
      case 'fail':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
    }
  };

  const overallStatus = failCount > 0 ? 'fail' : warningCount > 0 ? 'warning' : 'pass';

  if (!hasImage) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">규격 검증</h2>
        <div className="text-center py-8 text-gray-400">
          <Info className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>사진을 업로드하면 자동으로 검증합니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">규격 검증</h2>
        {selectedSpec && (
          <span className="text-sm text-gray-500">{selectedSpec.name}</span>
        )}
      </div>

      {/* Overall Status */}
      <div className={`p-4 rounded-xl mb-4 ${
        overallStatus === 'pass' ? 'bg-green-50 border border-green-200' :
        overallStatus === 'fail' ? 'bg-red-50 border border-red-200' :
        'bg-amber-50 border border-amber-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            overallStatus === 'pass' ? 'bg-green-100' :
            overallStatus === 'fail' ? 'bg-red-100' :
            'bg-amber-100'
          }`}>
            {overallStatus === 'pass' ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : overallStatus === 'fail' ? (
              <X className="w-6 h-6 text-red-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            )}
          </div>
          <div>
            <p className={`font-semibold ${
              overallStatus === 'pass' ? 'text-green-700' :
              overallStatus === 'fail' ? 'text-red-700' :
              'text-amber-700'
            }`}>
              {overallStatus === 'pass' ? '모든 규격을 충족합니다' :
               overallStatus === 'fail' ? '수정이 필요한 항목이 있습니다' :
               '확인이 필요한 항목이 있습니다'}
            </p>
            <p className="text-sm text-gray-600">
              {passCount}개 통과 {warningCount > 0 && `/ ${warningCount}개 확인 필요`} {failCount > 0 && `/ ${failCount}개 수정 필요`}
            </p>
          </div>
        </div>
      </div>

      {/* Validation Items */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {validationResults.map((result) => (
          <div
            key={result.id}
            className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getStatusIcon(result.status)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{result.name}</p>
                <p className="text-xs text-gray-600">{result.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Requirements from spec */}
      {selectedSpec && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">규격 요구사항</p>
          <ul className="text-xs text-gray-500 space-y-1">
            {selectedSpec.requirements.slice(0, 4).map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
