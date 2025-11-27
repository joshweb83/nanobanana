// 사진 규격 타입 정의
export interface PhotoSpec {
  id: string;
  name: string;
  nameEn: string;
  category: 'domestic' | 'international' | 'profile';
  width: number;  // mm or px
  height: number; // mm or px
  unit: 'mm' | 'px';
  dpi: number;
  backgroundColor: string[];
  requirements: string[];
  faceRatio: number; // 얼굴이 차지해야 하는 비율 (0-1)
  headTopMargin: number; // 머리 위 여백 비율
  country?: string;
  description: string;
}

// 배경 타입
export interface BackgroundOption {
  id: string;
  name: string;
  type: 'solid' | 'gradient' | 'studio';
  value: string; // hex color or gradient css
  preview: string; // tailwind class for preview
  premium: boolean;
}

// 복장 타입
export interface OutfitOption {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'unisex';
  category: 'formal' | 'business' | 'casual' | 'uniform' | 'student';
  thumbnail: string;
  premium: boolean;
  colors?: string[];
}

// 보정 옵션 타입
export interface RetouchOption {
  id: string;
  name: string;
  description: string;
  category: 'skin' | 'face' | 'hair' | 'overall';
  min: number;
  max: number;
  default: number;
  step: number;
  premium: boolean;
}

// 인쇄 배치 타입
export interface PrintLayout {
  id: string;
  name: string;
  paperSize: string;
  rows: number;
  cols: number;
  count: number;
  premium: boolean;
}

// 주문 상태
export interface OrderState {
  photoSpec: PhotoSpec | null;
  background: BackgroundOption | null;
  outfit: OutfitOption | null;
  retouchSettings: Record<string, number>;
  printLayout: PrintLayout | null;
  originalImage: string | null;
  processedImage: string | null;
}
