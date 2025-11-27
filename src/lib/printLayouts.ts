import { PrintLayout, PhotoSpec } from '@/types';

export const printLayouts: PrintLayout[] = [
  {
    id: 'single',
    name: '단일 사진',
    paperSize: '사진 크기',
    rows: 1,
    cols: 1,
    count: 1,
    premium: false
  },
  {
    id: '4x6-4pcs',
    name: '4x6 인화지 (4장)',
    paperSize: '4x6 inch',
    rows: 2,
    cols: 2,
    count: 4,
    premium: false
  },
  {
    id: '4x6-6pcs',
    name: '4x6 인화지 (6장)',
    paperSize: '4x6 inch',
    rows: 3,
    cols: 2,
    count: 6,
    premium: false
  },
  {
    id: '5x7-8pcs',
    name: '5x7 인화지 (8장)',
    paperSize: '5x7 inch',
    rows: 4,
    cols: 2,
    count: 8,
    premium: true
  },
  {
    id: 'a4-12pcs',
    name: 'A4 용지 (12장)',
    paperSize: 'A4',
    rows: 4,
    cols: 3,
    count: 12,
    premium: true
  },
  {
    id: 'a4-16pcs',
    name: 'A4 용지 (16장)',
    paperSize: 'A4',
    rows: 4,
    cols: 4,
    count: 16,
    premium: true
  }
];

// 용지 크기 정의 (mm 단위)
const paperSizes: Record<string, { width: number; height: number }> = {
  '4x6 inch': { width: 102, height: 152 }, // 4x6 인치 = 약 102x152mm
  '5x7 inch': { width: 127, height: 178 }, // 5x7 인치 = 약 127x178mm
  'A4': { width: 210, height: 297 }
};

// 사진 규격에 맞는 인쇄 배치 필터링
export const getCompatibleLayouts = (spec: PhotoSpec | null): PrintLayout[] => {
  if (!spec) return printLayouts;

  // 프로필 사진 (px 단위)은 단일 사진만 가능
  if (spec.unit === 'px') {
    return printLayouts.filter(layout => layout.id === 'single');
  }

  const photoWidth = spec.width; // mm
  const photoHeight = spec.height; // mm

  return printLayouts.filter(layout => {
    // 단일 사진은 항상 가능
    if (layout.id === 'single') return true;

    const paper = paperSizes[layout.paperSize];
    if (!paper) return false;

    // 용지에 사진이 맞는지 계산
    // 여백을 고려하여 (약 5mm 여백)
    const margin = 5;
    const availableWidth = paper.width - (margin * 2);
    const availableHeight = paper.height - (margin * 2);

    // 각 셀의 크기 계산
    const cellWidth = availableWidth / layout.cols;
    const cellHeight = availableHeight / layout.rows;

    // 사진이 셀 안에 들어가는지 확인 (셀 당 1mm 간격 포함)
    const fitWidth = photoWidth <= (cellWidth - 1);
    const fitHeight = photoHeight <= (cellHeight - 1);

    return fitWidth && fitHeight;
  });
};

// 사진 크기에 따른 권장 배치 계산
export const getRecommendedLayout = (spec: PhotoSpec | null): PrintLayout => {
  if (!spec || spec.unit === 'px') return printLayouts[0]; // 단일 사진

  const compatible = getCompatibleLayouts(spec);
  // 무료 옵션 중 가장 많이 들어가는 것 선택
  const freeLayouts = compatible.filter(l => !l.premium);
  return freeLayouts.reduce((best, current) =>
    current.count > best.count ? current : best
  , freeLayouts[0] || printLayouts[0]);
};

export const getFreePrintLayouts = () => {
  return printLayouts.filter(p => !p.premium);
};

export const getPrintLayoutById = (id: string) => {
  return printLayouts.find(p => p.id === id);
};
