
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '有机赋儿',
    brand: '雅培 (Abbott)',
    stage: '1段 (0-6个月)',
    price: 368,
    description: '100%有机奶源，全乳糖配方，助力宝宝自然成长。',
    imageUrl: 'https://picsum.photos/seed/milk1/400/400',
    category: 'infant'
  },
  {
    id: '2',
    name: '黄金成长',
    brand: '美赞臣 (Mead Johnson)',
    stage: '2段 (6-12个月)',
    price: 328,
    description: '含有DHA和MFGM乳脂球膜，支持大脑发育和免疫。',
    imageUrl: 'https://picsum.photos/seed/milk2/400/400',
    category: 'infant'
  },
  {
    id: '3',
    name: '启赋',
    brand: '惠氏 (Wyeth)',
    stage: '3段 (12-36个月)',
    price: 398,
    description: '富含OPO结构脂，亲和人体，促进钙质吸收。',
    imageUrl: 'https://picsum.photos/seed/milk3/400/400',
    category: 'toddler'
  },
  {
    id: '4',
    name: '舒尔滋',
    brand: '雀巢 (Nestle)',
    stage: '特殊配方 (过敏适用)',
    price: 450,
    description: '深度水解蛋白，针对敏感体质宝宝设计。',
    imageUrl: 'https://picsum.photos/seed/milk4/400/400',
    category: 'special'
  },
  {
    id: '5',
    name: '优萃有机',
    brand: '飞鹤 (Feihe)',
    stage: '1段',
    price: 298,
    description: '新鲜奶源，专为中国宝宝体质研发。',
    imageUrl: 'https://picsum.photos/seed/milk5/400/400',
    category: 'infant'
  },
  {
    id: '6',
    name: '爱他美卓萃',
    brand: '爱他美 (Aptamil)',
    stage: '3段',
    price: 345,
    description: '独有Nu-MMO低聚糖，支持肠道健康。',
    imageUrl: 'https://picsum.photos/seed/milk6/400/400',
    category: 'toddler'
  }
];

export const CATEGORIES = [
  { id: 'all', name: '全部' },
  { id: 'infant', name: '婴儿' },
  { id: 'toddler', name: '幼儿' },
  { id: 'special', name: '特殊' }
];
