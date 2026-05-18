import type { FeaturedCollection, Product } from '@/types/product';

const PRODUCT_IMG_COAT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBF7klZPF9hkrbyRhYi1CfwzLJdhOZHxoxlhTn96BtWrFhLc904i2_lMasVWeVOIqScyPx9UTIhfCD_ohq8s6BFT396DfIUYNmoRu-bwJR8riCskZpj1e7EvXFe1t93OrhtCK39w80Mqg5XysqZFLq9r1aqOcyUjSBb_ROi6xxsMAytsKsbnHtzBjvjHXYbcqw_CsNSl05bYq034iV1Vg6wIhjswSYD41R3b9fnYkT8PwPgB6-_zXZ2qMNmgVnmXaJ5XkDxXI-DP6Rh';

const PRODUCT_IMG_DRESS =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCvezjyJEKC_I2MoD4LtqB77tQgVwboh7GtPYsGV-zX5gOWBMXogkvu4poknegPTQhVPa7bbJQuIS76m3eBNplGVeyHt7TFKxapPqFLchfg3bRll-HVPIDyO-NYvErFtqkPj89fnanF--1M7PkosN2Uuy2YoK6EcTgVQcp9m66ot6wzsVPuiL7kBUs8B14eO3Krj_18WBtoVtg2f3l_MVe1oTxVhgCRU1veI6pcEYQLxQ3bL6SSvkxjiSzlSpUeDjyHUI76FR89YmD3';

const PRODUCT_IMG_TROUSERS =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBolkqwk3kOJJCgEE_gzcdUD5nCUc7qpYzRlfOkvQCMpVnTafOU3j7-VTSlA5IT1oo_pSSgaM-ta9btL6ZKAiHNSDvCQ7p8EFzaW42kcCe_7SeeC6kT8EdQ2fMIbtZt32D3ebe47RrMMfVo-JjV4dFeh0d2hK_jAAUmmkAuZoenSXNZZVdc94GB_tsZk1xumvRQiXGmtuAxoWJpHwD1nHT20ahW9vY0cQxNTHVy4_D50qg_24q0n1MQvmlN14SrJ6SHS_GQjVf3aDLm';

const PRODUCT_IMG_BOOT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ZNWNaSK42x_tI22AUBHBmYXSYXlIRwbsIFedbbEbk5hjIBdeIf2VEKQppvZllsv8IuKR2gABcM14aVGXAJpTihh9vWmN__VAyjzhhQlnYipUue2CZNuddDReZAs5AX4Dy4GMjACzyNfnwQi24t-Ab5_Qlo1VJ0KmlSWr_KXyKlrPWRTVJWQtT3sS3MdX85sp_B-zlrsCccE8rsR2nS_XlKVOjvbJHN_cdn32nYssgv7iGfKNmbkcYAXXwtbkgUg8jrhypdUoA1Be';

const PRODUCT_IMG_STRIPED =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDmvWCzcA5PodE42C-y5b8T3IZj8iFIoforyDzS8ydpL52GsiyBRk5Uf4a8TPr4uJr4x08t9WBHVKpQsO8P1RoFM68ZUGNexPnA2kfXaCurQIx8iAEoSLAOYqu_gZZIsHwcggOC4MXb5qg0WblZhUTjZl_9iSRCUEO37c1Zg5is5Np5ihCObox_XCDoKVzTyCiBMpQA5PeywRuQMfPwP2oFlAtgfTdPxy8_RoyK0SDdW35ItFb-4BYm_NmNvg-yfQBW06Y2mjmg5hx7';

const PRODUCT_IMG_CLUTCH =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4YXc5vXUkb7jZuWa1WRO9OzEQMXPx0ftKxnvxJXx9pv3xteQgyDBM4D8fNJE-VK5SbMU8PgoJtBG3vYkNtxg7WF0L9C8YcjSwX9OFb1Yl-r7m0pO8c_v_fz5lHhii89j21suQSGoLGNu9xy3XeeCHte2nhzQDhVOjIIMq9GvZolL4nShHstDKt-zkxiXPJO5zJ-V2SHGCQKmGTFYlwf1ZYCir2xE_7ySRP594bBuQ_UZot7T-8E0pNCRmxVXJyP-TqIQ-TB9LlilP';

const PRODUCT_IMG_KNIT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDrBlU6GV3l_jaVSZKKKPBnRF-ZJGOmyw10J9YdE4B09AIc4Ytq5j6y48-63ocX-lJz3GQet7q4hOmP8MQ9-L0lCRBD6t0wbLt3_9LYTkype0sL4QA09pHpeJfPNCxwmspRyMFj2kUjkmGOJu0yld7i7YQJn9l9yFO25KtprkYUEUrkJc_R0S9w5btQcNlygL9ujr1CC5TMWesS4SCgWTjzDOaRJ4R1V2hzm9YgkRZmCzAoqgxmwMILnre0uaeRHK-AZnAl8gfQYiK6';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-001',
    slug: 'sculpted-wool-coat',
    name: 'Sculpted Wool Coat',
    material: 'Charcoal Wool',
    priceCents: 125000,
    currency: 'USD',
    category: 'outerwear',
    section: 'new-arrivals',
    isGrayscale: true,
    image: {
      src: PRODUCT_IMG_COAT,
      alt: 'Model wearing a structured black wool coat in a soft studio light.',
    },
    description:
      'Architectural silhouette in heavy charcoal wool. Cut with a sculpted shoulder and floor-skimming hem.',
  },
  {
    id: 'p-002',
    slug: 'pleated-silk-dress',
    name: 'Pleated Silk Dress',
    material: 'Obsidian Silk',
    priceCents: 89000,
    currency: 'USD',
    category: 'dresses',
    section: 'new-arrivals',
    isGrayscale: true,
    image: {
      src: PRODUCT_IMG_DRESS,
      alt: 'Detailed close-up of a pleated silk dress in monochrome.',
    },
    description:
      'Liquid silk pleats follow the body in a single uninterrupted gesture.',
  },
  {
    id: 'p-003',
    slug: 'nappa-leather-trouser',
    name: 'Nappa Leather Trouser',
    material: 'Nappa Leather',
    priceCents: 140000,
    currency: 'USD',
    category: 'trousers',
    section: 'new-arrivals',
    isGrayscale: true,
    image: {
      src: PRODUCT_IMG_TROUSERS,
      alt: 'Oversized black nappa leather trousers paired with a crisp shirt.',
    },
    description: 'Wide-leg silhouette in soft nappa, finished with a hidden hook closure.',
  },
  {
    id: 'p-004',
    slug: 'stiletto-leather-boot',
    name: 'Stiletto Leather Boot',
    material: 'Calfskin',
    priceCents: 75000,
    currency: 'USD',
    category: 'shoes',
    section: 'new-arrivals',
    isGrayscale: true,
    image: {
      src: PRODUCT_IMG_BOOT,
      alt: 'Black stiletto boots photographed as sculpture on a white podium.',
    },
    description: 'Sharp toe, hidden zip and a hand-stitched stiletto heel.',
  },
  {
    id: 'p-005',
    slug: 'striped-silk-blouse',
    name: 'Striped Silk Blouse',
    material: 'Heavy Silk',
    priceCents: 45000,
    currency: 'USD',
    category: 'tops',
    section: 'trending',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Vibrant striped silk blouse.',
    },
  },
  {
    id: 'p-006',
    slug: 'cropped-colorblock-top',
    name: 'Cropped Colorblock Top',
    material: 'Cotton Poplin',
    priceCents: 32000,
    currency: 'USD',
    category: 'tops',
    section: 'trending',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Cropped colorblock top.',
    },
  },
  {
    id: 'p-007',
    slug: 'retro-stripe-shirt',
    name: 'Retro Stripe Shirt',
    material: 'Cotton',
    priceCents: 29000,
    currency: 'USD',
    category: 'tops',
    section: 'trending',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Retro stripe shirt.',
    },
  },
  {
    id: 'p-008',
    slug: 'summer-tie-front-top',
    name: 'Summer Tie-Front Top',
    material: 'Linen Blend',
    priceCents: 21000,
    currency: 'USD',
    category: 'tops',
    section: 'trending',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Summer tie-front top.',
    },
  },
  {
    id: 'p-009',
    slug: 'daily-stripe-blouse',
    name: 'Daily Stripe Blouse',
    material: 'Cotton',
    priceCents: 18000,
    currency: 'USD',
    category: 'tops',
    section: 'essentials',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Daily stripe blouse.',
    },
  },
  {
    id: 'p-010',
    slug: 'classic-tie-front',
    name: 'Classic Tie-Front',
    material: 'Cotton',
    priceCents: 15000,
    currency: 'USD',
    category: 'tops',
    section: 'essentials',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Classic tie-front top.',
    },
  },
  {
    id: 'p-011',
    slug: 'relaxed-poplin-shirt',
    name: 'Relaxed Poplin Shirt',
    material: 'Cotton Poplin',
    priceCents: 12000,
    currency: 'USD',
    category: 'tops',
    section: 'essentials',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Relaxed poplin shirt.',
    },
  },
  {
    id: 'p-012',
    slug: 'studio-colorblock-shirt',
    name: 'Studio Colorblock Shirt',
    material: 'Cotton',
    priceCents: 19500,
    currency: 'USD',
    category: 'tops',
    section: 'essentials',
    image: {
      src: PRODUCT_IMG_STRIPED,
      alt: 'Studio colorblock shirt.',
    },
  },
  {
    id: 'p-013',
    slug: 'foldover-leather-clutch',
    name: 'Foldover Leather Clutch',
    material: 'Calfskin',
    priceCents: 48000,
    currency: 'USD',
    category: 'accessories',
    section: 'new-arrivals',
    isGrayscale: true,
    image: {
      src: PRODUCT_IMG_CLUTCH,
      alt: 'Foldover leather clutch on marble.',
    },
    description: 'Hand-folded calfskin clutch finished without visible hardware.',
  },
  {
    id: 'p-014',
    slug: 'raw-edge-cashmere-knit',
    name: 'Raw Edge Cashmere Knit',
    material: 'Heavy Cashmere',
    priceCents: 95000,
    currency: 'USD',
    category: 'knitwear',
    section: 'new-arrivals',
    isGrayscale: true,
    image: {
      src: PRODUCT_IMG_KNIT,
      alt: 'Cashmere knit sweater draped over a wooden chair.',
    },
    description: 'Oversized cashmere knit with raw-edge finishing at the hem and cuffs.',
  },
];

export const MOCK_FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    id: 'fc-001',
    slug: 'the-monolith',
    title: 'THE MONOLITH',
    eyebrow: 'PRE-FALL 24',
    size: 'large',
    description:
      'Three silhouettes set against the silence of the desert. A study in scale and shadow.',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8aBkz6QUqYa7v1nmMKyRir4T2udt_ZXOa2R9-4_eRGegoWK6G7Tq0h1IQ5TP_TceRCx5nsDFm0hbKZZkiE9IzCYYd-tEWyryY8aTFHG0AVfVyPYqQJPNhAQclxLvwrfAQgV8q7SVf972rPxQ2HXhdaKkEh819aBcq5P8ejYbkOGM_RnE-FdSRzs0E-rJOTZ6BU-pwP_nzYpzbLJX8k9W7qOxR7PiTIkM79TIVCS9mdr8DukPa2ZUgDsL5b_yZHvMxNBmsx4OBD3B',
      alt: 'Three models in monochrome evening wear standing in a vast desert landscape.',
    },
  },
  {
    id: 'fc-002',
    slug: 'objects',
    title: 'OBJECTS',
    eyebrow: 'SERIES 01',
    size: 'small',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNxrFU04BoFCk34p3Kbmk7IjVA6Ep-JVmtALTA0AyCSxc0cOhxBVlqJGuvjrdUC9a_CIv2ytFjLPDMg1FNyKF20X6klU7-a2-4Q53D2e1E0q5bThnrPqJupv_W9qF-OnuCOxbDkO3yPYIvHAOcZKZJMlfZ4uhMHQDIj-rXr7uxQvYagpacp7assaEDLoIMJWXLVLjnVpRkQnDiqO8iKN0V0bUvrwIkvbKW04o0gXG0bsX-qHLfQNh5awQrI9WYO55y3FjCG0co53o0',
      alt: 'Luxury watch and silver jewelry on black silk.',
    },
  },
  {
    id: 'fc-003',
    slug: 'bespoke',
    title: 'BESPOKE',
    eyebrow: 'THE ATELIER',
    size: 'small',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCak7mJpDuIhRmpZdsbwbTg4dltTiuuRbNUBKCZGmstA_43Zn01mboglXWaz79sa7RaIYgJld0c8o1n7O_k1yq-DwRK-rfoke358H8OLzp_n-nlI8uSG1paj0ldWYxZJPwsw5fhig7kFRg94r_KA1okeSSm7AZcSamuPF5k8V0o-sXw_QDuuJ6zNhr-Rm49KGpl74AWMOgVqBHP4PvvwZ00KcfCLVFYIK3T9ZrGSuaPNKPAqIqmC9B2MElwKZBFIDx_TJv8t7ltMZpc',
      alt: 'Hanging garments forming a rhythmic monochromatic pattern.',
    },
  },
];

export const HERO_IMAGE = {
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeOLFCWkHEHHxNbLbWEbrhrDWNCKx3f2q9v6Sl5SbooAYwHQMtOfI_hQCFtqwbMdncU4m0MSszd8p3Y5NkK3JRQ6aS8qqLQ5ZmbPfZ2zxqjadAGg32XBJLKzHoB-rvw73Z3Ve0LWoOIvR9Mm9yP2bNki6OqfHTbrj1a1eHNdlb-PQn1AyrkbJvxQ_zyWvVcFwl16qmQQiXVvh4KL3c7cH-mZsN-9mSGw3z8l97BivEdan-OCVNIBRw36zhC4zYnGb3gMRJgQxW0k_',
  alt: 'High-fashion editorial photo: model in dramatic monochrome architectural setting.',
};
