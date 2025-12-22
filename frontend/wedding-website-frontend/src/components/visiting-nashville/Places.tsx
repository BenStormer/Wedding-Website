export type PlaceTag =
  | 'downtown'
  | 'outdoors'
  | 'drinks'
  | 'live-music'
  | 'history'
  | 'family-friendly'
  | 'parking'
  | 'walkable'
  | 'brunch'
  | 'upscale'
  | 'casual'
  | 'local-favorite';

export interface Place {
  label: string;
  details: string;
  image: string;
  alt: string;
  directionsLink: string;
  cost: number; // 0 = free, 1-4 = $ to $$$$
  websiteLink: string;
  tags: PlaceTag[];
}

export const tagLabels: Record<PlaceTag, string> = {
  downtown: 'Downtown',
  outdoors: 'Outdoors',
  drinks: 'Drinks',
  'live-music': 'Live Music',
  history: 'History',
  'family-friendly': 'Family Friendly',
  parking: 'Parking Available',
  walkable: 'Walkable',
  brunch: 'Brunch',
  upscale: 'Upscale',
  casual: 'Casual',
  'local-favorite': 'Local Favorite',
};

type PlaceCategory = 'places-to-stay' | 'places-to-see' | 'places-to-eat';

export const data: Record<PlaceCategory, Place[]> = {
  'places-to-stay': [
    {
      label: 'The Hermitage Hotel',
      details:
        "Nashville's only Forbes Five-Star hotel, located in the heart of downtown. Historic elegance meets modern luxury.",
      image: 'https://picsum.photos/seed/hermitage/800/600',
      alt: 'The Hermitage Hotel exterior',
      directionsLink: 'https://maps.google.com',
      cost: 4,
      websiteLink: 'https://thehermitagehotel.com',
      tags: ['downtown', 'upscale', 'walkable', 'history'],
    },
    {
      label: 'Graduate Nashville',
      details:
        'Boutique hotel in Midtown near Vanderbilt. Quirky, fun decor with a rooftop bar and great restaurant.',
      image: 'https://picsum.photos/seed/graduate/800/600',
      alt: 'Graduate Nashville hotel',
      directionsLink: 'https://maps.google.com',
      cost: 2,
      websiteLink: 'https://graduatehotels.com/nashville',
      tags: ['walkable', 'drinks', 'local-favorite'],
    },
    {
      label: 'Airbnb in Sylvan Park',
      details:
        'Stay close to the venue! Sylvan Park has charming homes and is a quick drive to downtown.',
      image: 'https://picsum.photos/seed/sylvan/800/600',
      alt: 'Sylvan Park neighborhood',
      directionsLink: 'https://maps.google.com',
      cost: 2,
      websiteLink: 'https://airbnb.com',
      tags: ['parking', 'local-favorite', 'family-friendly'],
    },
  ],
  'places-to-see': [
    {
      label: 'The Parthenon',
      details:
        "A full-scale replica of the original Parthenon in Athens! It's in beautiful Centennial Park, perfect for a morning walk.",
      image: 'https://picsum.photos/seed/parthenon/800/600',
      alt: 'The Parthenon in Centennial Park',
      directionsLink: 'https://maps.google.com',
      cost: 1,
      websiteLink: 'https://nashvilleparthenon.com',
      tags: ['outdoors', 'history', 'family-friendly', 'parking'],
    },
    {
      label: 'Lower Broadway',
      details:
        'The heart of Nashville! Honky-tonks, live music, and people-watching. No cover charges at most bars.',
      image: 'https://picsum.photos/seed/broadway/800/600',
      alt: 'Lower Broadway at night',
      directionsLink: 'https://maps.google.com',
      cost: 0,
      websiteLink: 'https://visitmusiccity.com',
      tags: ['downtown', 'live-music', 'drinks', 'walkable'],
    },
    {
      label: 'Cheekwood Estate & Gardens',
      details:
        '55 acres of botanical gardens and an art museum. Stunning in fall when the leaves change!',
      image: 'https://picsum.photos/seed/cheekwood/800/600',
      alt: 'Cheekwood botanical gardens',
      directionsLink: 'https://maps.google.com',
      cost: 2,
      websiteLink: 'https://cheekwood.org',
      tags: ['outdoors', 'history', 'family-friendly', 'parking'],
    },
    {
      label: 'Ryman Auditorium',
      details:
        "The 'Mother Church of Country Music.' Take a tour or catch a show - the acoustics are incredible.",
      image: 'https://picsum.photos/seed/ryman/800/600',
      alt: 'Ryman Auditorium interior',
      directionsLink: 'https://maps.google.com',
      cost: 2,
      websiteLink: 'https://ryman.com',
      tags: ['downtown', 'history', 'live-music', 'walkable'],
    },
  ],
  'places-to-eat': [
    {
      label: "Hattie B's Hot Chicken",
      details:
        "Nashville hot chicken at its finest. Warning: 'Shut the Cluck Up' is NOT for beginners!",
      image: 'https://picsum.photos/seed/hattieb/800/600',
      alt: "Hattie B's hot chicken plate",
      directionsLink: 'https://maps.google.com',
      cost: 1,
      websiteLink: 'https://hattieb.com',
      tags: ['casual', 'local-favorite', 'parking'],
    },
    {
      label: 'Biscuit Love',
      details:
        'Famous for their bonuts (biscuit donuts) and Southern brunch. Get there early - the line is worth it!',
      image: 'https://picsum.photos/seed/biscuit/800/600',
      alt: 'Biscuit Love brunch spread',
      directionsLink: 'https://maps.google.com',
      cost: 2,
      websiteLink: 'https://biscuitlove.com',
      tags: ['brunch', 'local-favorite', 'family-friendly'],
    },
    {
      label: 'The Catbird Seat',
      details:
        "Nashville's premier tasting menu experience. Intimate 22-seat counter surrounding the open kitchen.",
      image: 'https://picsum.photos/seed/catbird/800/600',
      alt: 'The Catbird Seat plated dish',
      directionsLink: 'https://maps.google.com',
      cost: 4,
      websiteLink: 'https://thecatbirdseatrestaurant.com',
      tags: ['upscale', 'local-favorite', 'drinks'],
    },
    {
      label: 'Bearded Iris Brewing',
      details:
        'Craft brewery in Germantown with rotating taps. Try the Homestyle IPA!',
      image: 'https://picsum.photos/seed/beardediris/800/600',
      alt: 'Bearded Iris Brewing taproom',
      directionsLink: 'https://maps.google.com',
      cost: 2,
      websiteLink: 'https://beardedirisbrewing.com',
      tags: ['drinks', 'casual', 'local-favorite', 'parking'],
    },
  ],
};
