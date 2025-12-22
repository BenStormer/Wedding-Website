export interface RegistryItem {
  id: string;
  label: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  requested_quantity: number | null; // null = unlimited (honeymoon fund)
  received_quantity: number;
  purchase_link: string;
  isSpecialFund?: boolean; // For the honeymoon fund that doesn't track progress
}

export const initialRegistryData: RegistryItem[] = [
  {
    id: 'honeymoon-fund',
    label: 'Honeymoon Fund',
    description:
      "Help us create unforgettable memories on our honeymoon! We're dreaming of exploring together. Any contribution is deeply appreciated.",
    price: 0,
    image: 'https://picsum.photos/seed/honeymoon/800/600',
    alt: 'Tropical beach destination',
    requested_quantity: null,
    received_quantity: 0,
    purchase_link: 'https://www.honeyfund.com',
    isSpecialFund: true,
  },
  {
    id: 'kitchenaid-mixer',
    label: 'KitchenAid Stand Mixer',
    description:
      'A classic kitchen essential for baking together. We would love the Artisan series in any neutral color!',
    price: 350,
    image: 'https://picsum.photos/seed/mixer/800/600',
    alt: 'KitchenAid Stand Mixer',
    requested_quantity: 1,
    received_quantity: 0,
    purchase_link: 'https://www.williams-sonoma.com',
  },
  {
    id: 'le-creuset',
    label: 'Le Creuset Dutch Oven',
    description:
      'Perfect for cozy soups and stews. The 5.5 quart size in any color would be wonderful.',
    price: 400,
    image: 'https://picsum.photos/seed/dutchoven/800/600',
    alt: 'Le Creuset Dutch Oven',
    requested_quantity: 1,
    received_quantity: 0,
    purchase_link: 'https://www.lecreuset.com',
  },
  {
    id: 'towel-set',
    label: 'Luxury Bath Towel Set',
    description:
      'Soft, plush towels for our new home. We prefer white or neutral tones.',
    price: 120,
    image: 'https://picsum.photos/seed/towels/800/600',
    alt: 'Luxury bath towels',
    requested_quantity: 2,
    received_quantity: 1,
    purchase_link: 'https://www.parachutehome.com',
  },
  {
    id: 'dyson-vacuum',
    label: 'Dyson Vacuum',
    description:
      'A powerful cordless vacuum to keep our home spotless. The V15 would be amazing!',
    price: 650,
    image: 'https://picsum.photos/seed/vacuum/800/600',
    alt: 'Dyson cordless vacuum',
    requested_quantity: 1,
    received_quantity: 0,
    purchase_link: 'https://www.dyson.com',
  },
  {
    id: 'dinner-plates',
    label: 'Dinner Plate Set',
    description:
      'Beautiful everyday dinnerware for hosting friends and family. Service for 8 preferred.',
    price: 200,
    image: 'https://picsum.photos/seed/plates/800/600',
    alt: 'Ceramic dinner plates',
    requested_quantity: 1,
    received_quantity: 0,
    purchase_link: 'https://www.crateandbarrel.com',
  },
];
