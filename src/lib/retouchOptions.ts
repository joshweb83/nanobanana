import { RetouchOption } from '@/types';

export const retouchOptions: RetouchOption[] = [
  // 피부 보정
  {
    id: 'skin-smooth',
    name: '피부 보정',
    description: '잡티, 여드름, 주근깨를 자연스럽게 보정합니다',
    category: 'skin',
    min: 0,
    max: 100,
    default: 50,
    step: 10,
    premium: false
  },
  {
    id: 'skin-tone',
    name: '피부톤 균일화',
    description: '얼굴 전체의 피부톤을 균일하게 맞춥니다',
    category: 'skin',
    min: 0,
    max: 100,
    default: 30,
    step: 10,
    premium: false
  },
  {
    id: 'skin-brightness',
    name: '피부 밝기',
    description: '피부를 밝고 화사하게 보정합니다',
    category: 'skin',
    min: -50,
    max: 50,
    default: 10,
    step: 10,
    premium: false
  },
  {
    id: 'wrinkle-remove',
    name: '주름 보정',
    description: '눈가, 이마 주름을 자연스럽게 보정합니다',
    category: 'skin',
    min: 0,
    max: 100,
    default: 30,
    step: 10,
    premium: true
  },

  // 얼굴 보정
  {
    id: 'face-slim',
    name: '얼굴 갸름하게',
    description: '얼굴 윤곽을 갸름하게 보정합니다',
    category: 'face',
    min: 0,
    max: 100,
    default: 0,
    step: 10,
    premium: true
  },
  {
    id: 'eye-enlarge',
    name: '눈 크기',
    description: '눈을 자연스럽게 크게 보정합니다',
    category: 'face',
    min: 0,
    max: 50,
    default: 0,
    step: 5,
    premium: true
  },
  {
    id: 'eye-bright',
    name: '눈 밝기',
    description: '눈을 또렷하고 밝게 보정합니다',
    category: 'face',
    min: 0,
    max: 100,
    default: 20,
    step: 10,
    premium: false
  },
  {
    id: 'eye-redness',
    name: '충혈 제거',
    description: '눈의 충혈을 제거합니다',
    category: 'face',
    min: 0,
    max: 100,
    default: 50,
    step: 10,
    premium: false
  },
  {
    id: 'nose-slim',
    name: '코 보정',
    description: '코를 자연스럽게 보정합니다',
    category: 'face',
    min: 0,
    max: 50,
    default: 0,
    step: 5,
    premium: true
  },
  {
    id: 'teeth-white',
    name: '치아 미백',
    description: '치아를 자연스럽게 하얗게 보정합니다',
    category: 'face',
    min: 0,
    max: 100,
    default: 30,
    step: 10,
    premium: true
  },

  // 헤어 보정
  {
    id: 'hair-fix',
    name: '헤어 정돈',
    description: '흐트러진 머리카락을 정돈합니다',
    category: 'hair',
    min: 0,
    max: 100,
    default: 50,
    step: 10,
    premium: false
  },
  {
    id: 'hair-flyaway',
    name: '잔머리 제거',
    description: '배경과 겹치는 잔머리를 제거합니다',
    category: 'hair',
    min: 0,
    max: 100,
    default: 70,
    step: 10,
    premium: false
  },
  {
    id: 'hair-volume',
    name: '헤어 볼륨',
    description: '머리카락 볼륨을 조절합니다',
    category: 'hair',
    min: -50,
    max: 50,
    default: 0,
    step: 10,
    premium: true
  },
  {
    id: 'hair-shine',
    name: '헤어 윤기',
    description: '머리카락에 자연스러운 윤기를 더합니다',
    category: 'hair',
    min: 0,
    max: 100,
    default: 30,
    step: 10,
    premium: true
  },

  // 전체 보정
  {
    id: 'overall-brightness',
    name: '전체 밝기',
    description: '사진 전체의 밝기를 조절합니다',
    category: 'overall',
    min: -50,
    max: 50,
    default: 5,
    step: 5,
    premium: false
  },
  {
    id: 'overall-contrast',
    name: '대비',
    description: '사진의 대비를 조절합니다',
    category: 'overall',
    min: -50,
    max: 50,
    default: 5,
    step: 5,
    premium: false
  },
  {
    id: 'overall-sharpness',
    name: '선명도',
    description: '사진의 선명도를 높입니다',
    category: 'overall',
    min: 0,
    max: 100,
    default: 20,
    step: 10,
    premium: false
  }
];

export const getRetouchByCategory = (category: RetouchOption['category']) => {
  return retouchOptions.filter(r => r.category === category);
};

export const getFreeRetouch = () => {
  return retouchOptions.filter(r => !r.premium);
};

export const getRetouchById = (id: string) => {
  return retouchOptions.find(r => r.id === id);
};

export const getDefaultRetouchSettings = (): Record<string, number> => {
  const settings: Record<string, number> = {};
  retouchOptions.forEach(opt => {
    settings[opt.id] = opt.default;
  });
  return settings;
};
