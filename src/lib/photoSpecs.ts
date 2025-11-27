import { PhotoSpec } from '@/types';

export const photoSpecs: PhotoSpec[] = [
  // 국내 증명사진
  {
    id: 'kr-passport',
    name: '여권사진',
    nameEn: 'Passport Photo',
    category: 'domestic',
    width: 35,
    height: 45,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF'],
    requirements: [
      '최근 6개월 이내 촬영',
      '정면 응시, 무표정',
      '흰색 배경 필수',
      '귀가 보여야 함',
      '모자, 선글라스 착용 불가',
      '얼굴 비율 70-80%'
    ],
    faceRatio: 0.75,
    headTopMargin: 0.1,
    country: 'KR',
    description: '대한민국 여권 발급용 사진'
  },
  {
    id: 'kr-id-card',
    name: '주민등록증',
    nameEn: 'ID Card Photo',
    category: 'domestic',
    width: 35,
    height: 45,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF'],
    requirements: [
      '최근 6개월 이내 촬영',
      '정면 응시',
      '흰색 배경',
      '모자 착용 불가'
    ],
    faceRatio: 0.7,
    headTopMargin: 0.1,
    country: 'KR',
    description: '주민등록증 발급/재발급용 사진'
  },
  {
    id: 'kr-driver',
    name: '운전면허증',
    nameEn: 'Driver License Photo',
    category: 'domestic',
    width: 30,
    height: 40,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF', '#E8E8E8'],
    requirements: [
      '최근 6개월 이내 촬영',
      '정면 응시',
      '컬러 사진'
    ],
    faceRatio: 0.7,
    headTopMargin: 0.1,
    country: 'KR',
    description: '운전면허증 발급용 사진'
  },
  {
    id: 'kr-resume',
    name: '이력서/증명사진',
    nameEn: 'Resume Photo',
    category: 'domestic',
    width: 30,
    height: 40,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF', '#E3F2FD', '#E8E8E8'],
    requirements: [
      '정장 또는 단정한 복장',
      '자연스러운 미소 가능',
      '밝은 배경 권장'
    ],
    faceRatio: 0.65,
    headTopMargin: 0.12,
    country: 'KR',
    description: '취업용 이력서, 자격증, 수험표용 사진'
  },

  // 해외 비자/여권
  {
    id: 'us-visa',
    name: '미국 비자',
    nameEn: 'US Visa Photo',
    category: 'international',
    width: 51,
    height: 51,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF', '#F5F5F5'],
    requirements: [
      '5cm x 5cm (2" x 2")',
      '흰색 또는 연한 배경',
      '6개월 이내 촬영',
      '안경 착용 불가',
      '정면 응시, 눈 뜬 상태'
    ],
    faceRatio: 0.6,
    headTopMargin: 0.15,
    country: 'US',
    description: '미국 비자 및 영주권 신청용 사진'
  },
  {
    id: 'us-passport',
    name: '미국 여권',
    nameEn: 'US Passport Photo',
    category: 'international',
    width: 51,
    height: 51,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF'],
    requirements: [
      '5cm x 5cm (2" x 2")',
      '흰색 배경 필수',
      '6개월 이내 촬영'
    ],
    faceRatio: 0.6,
    headTopMargin: 0.15,
    country: 'US',
    description: '미국 여권 발급용 사진'
  },
  {
    id: 'cn-visa',
    name: '중국 비자',
    nameEn: 'China Visa Photo',
    category: 'international',
    width: 33,
    height: 48,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF'],
    requirements: [
      '3.3cm x 4.8cm',
      '흰색 배경',
      '6개월 이내 촬영',
      '정면 응시'
    ],
    faceRatio: 0.7,
    headTopMargin: 0.1,
    country: 'CN',
    description: '중국 비자 신청용 사진'
  },
  {
    id: 'jp-visa',
    name: '일본 비자',
    nameEn: 'Japan Visa Photo',
    category: 'international',
    width: 45,
    height: 45,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF'],
    requirements: [
      '4.5cm x 4.5cm',
      '흰색 또는 연한 배경',
      '6개월 이내 촬영'
    ],
    faceRatio: 0.7,
    headTopMargin: 0.1,
    country: 'JP',
    description: '일본 비자 신청용 사진'
  },
  {
    id: 'schengen-visa',
    name: '쉥겐 비자 (유럽)',
    nameEn: 'Schengen Visa Photo',
    category: 'international',
    width: 35,
    height: 45,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF', '#E8E8E8'],
    requirements: [
      '3.5cm x 4.5cm',
      '밝은 단색 배경',
      '3개월 이내 촬영',
      '얼굴 비율 70-80%'
    ],
    faceRatio: 0.75,
    headTopMargin: 0.1,
    country: 'EU',
    description: '유럽 쉥겐 비자 신청용 사진'
  },
  {
    id: 'uk-visa',
    name: '영국 비자',
    nameEn: 'UK Visa Photo',
    category: 'international',
    width: 35,
    height: 45,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF', '#E0E0E0'],
    requirements: [
      '3.5cm x 4.5cm',
      '밝은 회색 또는 크림색 배경',
      '최근 촬영'
    ],
    faceRatio: 0.7,
    headTopMargin: 0.1,
    country: 'UK',
    description: '영국 비자 신청용 사진'
  },
  {
    id: 'au-visa',
    name: '호주 비자',
    nameEn: 'Australia Visa Photo',
    category: 'international',
    width: 35,
    height: 45,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF'],
    requirements: [
      '3.5cm x 4.5cm',
      '흰색 배경',
      '6개월 이내 촬영'
    ],
    faceRatio: 0.7,
    headTopMargin: 0.1,
    country: 'AU',
    description: '호주 비자 신청용 사진'
  },
  {
    id: 'ca-visa',
    name: '캐나다 비자',
    nameEn: 'Canada Visa Photo',
    category: 'international',
    width: 35,
    height: 45,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF'],
    requirements: [
      '3.5cm x 4.5cm',
      '흰색 또는 연한 배경',
      '6개월 이내 촬영'
    ],
    faceRatio: 0.7,
    headTopMargin: 0.1,
    country: 'CA',
    description: '캐나다 비자 신청용 사진'
  },

  // 프로필 사진
  {
    id: 'linkedin',
    name: 'LinkedIn 프로필',
    nameEn: 'LinkedIn Profile',
    category: 'profile',
    width: 400,
    height: 400,
    unit: 'px',
    dpi: 72,
    backgroundColor: ['#FFFFFF', '#F0F0F0', '#E3F2FD'],
    requirements: [
      '정사각형 (1:1)',
      '프로페셔널한 복장',
      '밝은 배경 권장'
    ],
    faceRatio: 0.5,
    headTopMargin: 0.15,
    description: 'LinkedIn 프로필 사진'
  },
  {
    id: 'kakao',
    name: '카카오톡 프로필',
    nameEn: 'KakaoTalk Profile',
    category: 'profile',
    width: 640,
    height: 640,
    unit: 'px',
    dpi: 72,
    backgroundColor: ['#FFFFFF', '#F0F0F0'],
    requirements: [
      '정사각형 (1:1)',
      '자유로운 스타일'
    ],
    faceRatio: 0.5,
    headTopMargin: 0.2,
    description: '카카오톡 프로필 사진'
  },
  {
    id: 'instagram',
    name: '인스타그램 프로필',
    nameEn: 'Instagram Profile',
    category: 'profile',
    width: 320,
    height: 320,
    unit: 'px',
    dpi: 72,
    backgroundColor: ['#FFFFFF', '#F0F0F0'],
    requirements: [
      '정사각형 (1:1)'
    ],
    faceRatio: 0.5,
    headTopMargin: 0.2,
    description: '인스타그램 프로필 사진'
  },
  {
    id: 'employee-id',
    name: '사원증/학생증',
    nameEn: 'Employee/Student ID',
    category: 'profile',
    width: 30,
    height: 40,
    unit: 'mm',
    dpi: 300,
    backgroundColor: ['#FFFFFF', '#E3F2FD'],
    requirements: [
      '단정한 복장',
      '정면 응시'
    ],
    faceRatio: 0.65,
    headTopMargin: 0.12,
    description: '사원증, 학생증용 사진'
  }
];

export const getSpecsByCategory = (category: PhotoSpec['category']) => {
  return photoSpecs.filter(spec => spec.category === category);
};

export const getSpecById = (id: string) => {
  return photoSpecs.find(spec => spec.id === id);
};
