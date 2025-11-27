import { OutfitOption } from '@/types';

export const outfitOptions: OutfitOption[] = [
  // 남성 정장
  {
    id: 'male-suit-black',
    name: '검정 정장 + 흰 셔츠',
    gender: 'male',
    category: 'formal',
    thumbnail: '/images/outfits/suit-black.svg',
    premium: false,
    colors: ['#1a1a1a', '#FFFFFF']
  },
  {
    id: 'male-suit-navy',
    name: '네이비 정장 + 흰 셔츠',
    gender: 'male',
    category: 'formal',
    thumbnail: '/images/outfits/suit-navy.svg',
    premium: false,
    colors: ['#1e3a5f', '#FFFFFF']
  },
  {
    id: 'male-suit-charcoal',
    name: '차콜 정장 + 흰 셔츠',
    gender: 'male',
    category: 'formal',
    thumbnail: '/images/outfits/suit-gray.svg',
    premium: false,
    colors: ['#36454f', '#FFFFFF']
  },
  {
    id: 'male-suit-black-tie-red',
    name: '검정 정장 + 레드 넥타이',
    gender: 'male',
    category: 'formal',
    thumbnail: '/images/outfits/suit-black.svg',
    premium: true,
    colors: ['#1a1a1a', '#FFFFFF', '#c41e3a']
  },
  {
    id: 'male-suit-black-tie-blue',
    name: '검정 정장 + 블루 넥타이',
    gender: 'male',
    category: 'formal',
    thumbnail: '/images/outfits/suit-black.svg',
    premium: true,
    colors: ['#1a1a1a', '#FFFFFF', '#1e3a5f']
  },
  {
    id: 'male-suit-navy-tie',
    name: '네이비 정장 + 넥타이',
    gender: 'male',
    category: 'formal',
    thumbnail: '/images/outfits/suit-navy.svg',
    premium: true,
    colors: ['#1e3a5f', '#FFFFFF', '#4a4a4a']
  },

  // 남성 비즈니스 캐주얼
  {
    id: 'male-shirt-white',
    name: '흰색 셔츠',
    gender: 'male',
    category: 'business',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: false,
    colors: ['#FFFFFF']
  },
  {
    id: 'male-shirt-blue',
    name: '하늘색 셔츠',
    gender: 'male',
    category: 'business',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: false,
    colors: ['#87CEEB']
  },
  {
    id: 'male-polo-navy',
    name: '네이비 폴로',
    gender: 'male',
    category: 'casual',
    thumbnail: '/images/outfits/suit-navy.svg',
    premium: true,
    colors: ['#1e3a5f']
  },

  // 여성 정장
  {
    id: 'female-suit-black',
    name: '검정 자켓 + 흰 블라우스',
    gender: 'female',
    category: 'formal',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: false,
    colors: ['#1a1a1a', '#FFFFFF']
  },
  {
    id: 'female-suit-navy',
    name: '네이비 자켓 + 흰 블라우스',
    gender: 'female',
    category: 'formal',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: false,
    colors: ['#1e3a5f', '#FFFFFF']
  },
  {
    id: 'female-suit-beige',
    name: '베이지 자켓 + 흰 블라우스',
    gender: 'female',
    category: 'formal',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: true,
    colors: ['#d4b896', '#FFFFFF']
  },
  {
    id: 'female-blouse-white',
    name: '흰색 블라우스',
    gender: 'female',
    category: 'business',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: false,
    colors: ['#FFFFFF']
  },
  {
    id: 'female-blouse-pink',
    name: '연핑크 블라우스',
    gender: 'female',
    category: 'business',
    thumbnail: '/images/outfits/blouse-pink.svg',
    premium: true,
    colors: ['#FFB6C1']
  },
  {
    id: 'female-blouse-blue',
    name: '하늘색 블라우스',
    gender: 'female',
    category: 'business',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: false,
    colors: ['#87CEEB']
  },

  // 유니폼
  {
    id: 'uniform-nurse',
    name: '간호사 유니폼',
    gender: 'unisex',
    category: 'uniform',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: true,
    colors: ['#FFFFFF', '#4169E1']
  },
  {
    id: 'uniform-doctor',
    name: '의사 가운',
    gender: 'unisex',
    category: 'uniform',
    thumbnail: '/images/outfits/blouse-white.svg',
    premium: true,
    colors: ['#FFFFFF']
  },

  // 학생
  {
    id: 'student-uniform-male',
    name: '남학생 교복',
    gender: 'male',
    category: 'student',
    thumbnail: '/images/outfits/student-uniform.svg',
    premium: true,
    colors: ['#1e3a5f', '#FFFFFF']
  },
  {
    id: 'student-uniform-female',
    name: '여학생 교복',
    gender: 'female',
    category: 'student',
    thumbnail: '/images/outfits/student-uniform.svg',
    premium: true,
    colors: ['#1e3a5f', '#FFFFFF']
  }
];

export const getOutfitsByGender = (gender: 'male' | 'female') => {
  return outfitOptions.filter(o => o.gender === gender || o.gender === 'unisex');
};

export const getOutfitsByCategory = (category: OutfitOption['category']) => {
  return outfitOptions.filter(o => o.category === category);
};

export const getFreeOutfits = () => {
  return outfitOptions.filter(o => !o.premium);
};

export const getOutfitById = (id: string) => {
  return outfitOptions.find(o => o.id === id);
};
