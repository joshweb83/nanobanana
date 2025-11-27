import { BackgroundOption } from '@/types';

export const backgroundOptions: BackgroundOption[] = [
  // 단색 배경
  {
    id: 'white',
    name: '흰색',
    type: 'solid',
    value: '#FFFFFF',
    preview: 'bg-white',
    premium: false
  },
  {
    id: 'light-gray',
    name: '연한 회색',
    type: 'solid',
    value: '#F5F5F5',
    preview: 'bg-gray-100',
    premium: false
  },
  {
    id: 'gray',
    name: '회색',
    type: 'solid',
    value: '#E0E0E0',
    preview: 'bg-gray-300',
    premium: false
  },
  {
    id: 'light-blue',
    name: '연한 파랑',
    type: 'solid',
    value: '#E3F2FD',
    preview: 'bg-blue-100',
    premium: false
  },
  {
    id: 'blue',
    name: '파랑',
    type: 'solid',
    value: '#90CAF9',
    preview: 'bg-blue-300',
    premium: false
  },
  {
    id: 'sky-blue',
    name: '하늘색',
    type: 'solid',
    value: '#87CEEB',
    preview: 'bg-sky-300',
    premium: false
  },
  {
    id: 'cream',
    name: '크림색',
    type: 'solid',
    value: '#FFFDD0',
    preview: 'bg-yellow-50',
    premium: true
  },
  {
    id: 'beige',
    name: '베이지',
    type: 'solid',
    value: '#F5F5DC',
    preview: 'bg-amber-100',
    premium: true
  },

  // 그라데이션 배경
  {
    id: 'gradient-gray',
    name: '그레이 그라데이션',
    type: 'gradient',
    value: 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)',
    preview: 'bg-gradient-to-b from-white to-gray-300',
    premium: true
  },
  {
    id: 'gradient-blue',
    name: '블루 그라데이션',
    type: 'gradient',
    value: 'linear-gradient(180deg, #E3F2FD 0%, #90CAF9 100%)',
    preview: 'bg-gradient-to-b from-blue-100 to-blue-300',
    premium: true
  },
  {
    id: 'gradient-warm',
    name: '웜톤 그라데이션',
    type: 'gradient',
    value: 'linear-gradient(180deg, #FFF8E1 0%, #FFE0B2 100%)',
    preview: 'bg-gradient-to-b from-amber-50 to-amber-200',
    premium: true
  },

  // 스튜디오 배경
  {
    id: 'studio-soft',
    name: '소프트 스튜디오',
    type: 'studio',
    value: 'radial-gradient(ellipse at center, #FFFFFF 0%, #E8E8E8 70%, #D0D0D0 100%)',
    preview: 'bg-gradient-radial from-white to-gray-300',
    premium: true
  },
  {
    id: 'studio-professional',
    name: '프로페셔널 스튜디오',
    type: 'studio',
    value: 'radial-gradient(ellipse at center top, #F5F5F5 0%, #BDBDBD 100%)',
    preview: 'bg-gradient-to-b from-gray-100 to-gray-400',
    premium: true
  }
];

export const getBackgroundsByType = (type: BackgroundOption['type']) => {
  return backgroundOptions.filter(bg => bg.type === type);
};

export const getFreeBackgrounds = () => {
  return backgroundOptions.filter(bg => !bg.premium);
};

export const getBackgroundById = (id: string) => {
  return backgroundOptions.find(bg => bg.id === id);
};
