import { PrintLayout } from '@/types';

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

export const getFreePrintLayouts = () => {
  return printLayouts.filter(p => !p.premium);
};

export const getPrintLayoutById = (id: string) => {
  return printLayouts.find(p => p.id === id);
};
