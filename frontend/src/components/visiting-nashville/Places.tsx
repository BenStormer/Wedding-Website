// Tags for Places to Stay
export type StayTag =
  | 'downtown'
  | 'upscale'
  | 'walkable'
  | 'parking'
  | 'family-friendly'
  | 'local-favorite'
  | 'history';

// Tags for Places to See
export type SeeTag =
  | 'downtown'
  | 'outdoors'
  | 'history'
  | 'family-friendly'
  | 'parking'
  | 'walkable'
  | 'live-music'
  | 'sports'
  | 'arts'
  | 'free';

// Tags for Places to Eat
export type EatTag =
  | 'downtown'
  | 'germantown'
  | 'east-nashville'
  | 'midtown'
  | 'gulch'
  | 'capitol-view'
  | 'drinks'
  | 'live-music'
  | 'brunch'
  | 'upscale'
  | 'casual'
  | 'local-favorite'
  | 'family-friendly'
  | 'parking'
  | 'walkable'
  | 'late-night'
  | 'food-hall'
  | 'rooftop'
  | 'michelin-star';

export type PlaceTag = StayTag | SeeTag | EatTag;

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
  // Stay tags
  downtown: 'Downtown',
  upscale: 'Upscale',
  walkable: 'Walkable',
  parking: 'Parking Available',
  'family-friendly': 'Family Friendly',
  'local-favorite': 'Local Favorite',
  history: 'History',
  // See tags
  outdoors: 'Outdoors',
  'live-music': 'Live Music',
  sports: 'Sports',
  arts: 'Arts & Culture',
  free: 'Free',
  // Eat tags
  drinks: 'Drinks',
  brunch: 'Brunch',
  casual: 'Casual',
  'late-night': 'Late Night',
  'food-hall': 'Food Hall',
  rooftop: 'Rooftop',
  // Location tags
  germantown: 'Germantown',
  'east-nashville': 'East Nashville',
  midtown: 'Midtown',
  gulch: 'The Gulch',
  'capitol-view': 'Capitol View',
  // Special tags
  'michelin-star': 'Michelin Star',
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
      directionsLink:
        'https://maps.google.com/?q=The+Hermitage+Hotel+Nashville',
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
      directionsLink: 'https://maps.google.com/?q=Graduate+Nashville',
      cost: 2,
      websiteLink: 'https://graduatehotels.com/nashville',
      tags: ['walkable', 'local-favorite'],
    },
    {
      label: 'Airbnb in Sylvan Park',
      details:
        'Stay close to the venue! Sylvan Park has charming homes and is a quick drive to downtown.',
      image: 'https://picsum.photos/seed/sylvan/800/600',
      alt: 'Sylvan Park neighborhood',
      directionsLink: 'https://maps.google.com/?q=Sylvan+Park+Nashville',
      cost: 2,
      websiteLink: 'https://airbnb.com',
      tags: ['parking', 'local-favorite', 'family-friendly'],
    },
  ],
  'places-to-see': [
    {
      label: 'Centennial Park & The Parthenon',
      details:
        "A full-scale replica of the original Parthenon in Athens! It's in beautiful Centennial Park, perfect for a morning walk or picnic.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Parthenon%2C_Nashville.JPG/1280px-Parthenon%2C_Nashville.JPG',
      alt: 'The Parthenon in Centennial Park',
      directionsLink: 'https://maps.google.com/?q=Centennial+Park+Nashville',
      cost: 1,
      websiteLink: 'https://www.nashvilleparthenon.com',
      tags: ['outdoors', 'history', 'family-friendly', 'parking', 'free'],
    },
    {
      label: 'Nashville Zoo at Grassmere',
      details:
        'A 188-acre zoo with over 6,000 animals. Great for families with kids of all ages. The Jungle Gym playground is a must!',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Nashville_Zoo_Entrance.jpg/1280px-Nashville_Zoo_Entrance.jpg',
      alt: 'Nashville Zoo entrance',
      directionsLink: 'https://maps.google.com/?q=Nashville+Zoo',
      cost: 2,
      websiteLink: 'https://www.nashvillezoo.org',
      tags: ['outdoors', 'family-friendly', 'parking'],
    },
    {
      label: 'Lower Broadway',
      details:
        'The heart of Nashville! Honky-tonks, live music, and people-watching. No cover charges at most bars.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Lower_Broadway_in_Nashville%2C_TN.jpg/1280px-Lower_Broadway_in_Nashville%2C_TN.jpg',
      alt: 'Lower Broadway at night',
      directionsLink: 'https://maps.google.com/?q=Lower+Broadway+Nashville+TN',
      cost: 0,
      websiteLink:
        'https://www.visitmusiccity.com/explore-nashville/neighborhoods/downtown',
      tags: ['downtown', 'live-music', 'walkable', 'free'],
    },
    {
      label: "Nashville Farmers' Market",
      details:
        'Year-round market with fresh produce, local vendors, and international food stalls. The Market House has great lunch spots!',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Nashville_Farmers%27_Market.jpg/1280px-Nashville_Farmers%27_Market.jpg',
      alt: "Nashville Farmers' Market",
      directionsLink: 'https://maps.google.com/?q=Nashville+Farmers+Market',
      cost: 0,
      websiteLink: 'https://www.nashvillefarmersmarket.org',
      tags: ['downtown', 'family-friendly', 'parking', 'free'],
    },
    {
      label: 'Tennessee State Museum',
      details:
        "Explore Tennessee's history from prehistoric times to the present. Free admission makes it a great rainy day activity!",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tennessee_State_Museum_2018.jpg/1280px-Tennessee_State_Museum_2018.jpg',
      alt: 'Tennessee State Museum exterior',
      directionsLink: 'https://maps.google.com/?q=Tennessee+State+Museum',
      cost: 0,
      websiteLink: 'https://tnmuseum.org',
      tags: ['downtown', 'history', 'family-friendly', 'free'],
    },
    {
      label: 'Bicentennial Capitol Mall State Park',
      details:
        'A 19-acre park celebrating Tennessee history. Features a 200-foot granite map of the state and a WWII memorial.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bicentennial_Mall_Nashville.jpg/1280px-Bicentennial_Mall_Nashville.jpg',
      alt: 'Bicentennial Capitol Mall',
      directionsLink:
        'https://maps.google.com/?q=Bicentennial+Capitol+Mall+State+Park',
      cost: 0,
      websiteLink: 'https://tnstateparks.com/parks/bicentennial-mall',
      tags: ['downtown', 'outdoors', 'history', 'family-friendly', 'free'],
    },
    {
      label: 'Tennessee State Capitol',
      details:
        'One of the oldest working state capitols in the U.S. Free guided tours available. Beautiful Greek Revival architecture.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tennessee_State_Capitol_2009.jpg/1280px-Tennessee_State_Capitol_2009.jpg',
      alt: 'Tennessee State Capitol building',
      directionsLink: 'https://maps.google.com/?q=Tennessee+State+Capitol',
      cost: 0,
      websiteLink: 'https://www.capitol.tn.gov',
      tags: ['downtown', 'history', 'walkable', 'free'],
    },
    {
      label: 'Nashville Predators Hockey',
      details:
        "Catch a Preds game at Bridgestone Arena! Even if you're not a hockey fan, the atmosphere is electric.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bridgestone_Arena_2018.jpg/1280px-Bridgestone_Arena_2018.jpg',
      alt: 'Bridgestone Arena',
      directionsLink: 'https://maps.google.com/?q=Bridgestone+Arena+Nashville',
      cost: 3,
      websiteLink: 'https://www.nhl.com/predators',
      tags: ['downtown', 'sports', 'walkable'],
    },
    {
      label: 'Tennessee Performing Arts Center (TPAC)',
      details:
        'Broadway shows, concerts, and performances. Check the schedule - they often have amazing touring productions!',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tennessee_Performing_Arts_Center.jpg/1280px-Tennessee_Performing_Arts_Center.jpg',
      alt: 'Tennessee Performing Arts Center',
      directionsLink:
        'https://maps.google.com/?q=Tennessee+Performing+Arts+Center',
      cost: 3,
      websiteLink: 'https://www.tpac.org',
      tags: ['downtown', 'arts', 'walkable'],
    },
    {
      label: 'Ryman Auditorium',
      details:
        "The 'Mother Church of Country Music.' Take a tour or catch a show - the acoustics are incredible.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Ryman_Auditorium%2C_Nashville%2C_Tennessee.jpg/800px-Ryman_Auditorium%2C_Nashville%2C_Tennessee.jpg',
      alt: 'Ryman Auditorium interior',
      directionsLink: 'https://maps.google.com/?q=Ryman+Auditorium',
      cost: 2,
      websiteLink: 'https://www.ryman.com',
      tags: ['downtown', 'history', 'live-music', 'walkable', 'arts'],
    },
    {
      label: 'Regal Opry Mills IMAX',
      details:
        'Catch the latest blockbuster on the giant IMAX screen. Located in Opry Mills mall with plenty of shopping nearby.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Opry_Mills.jpg/1280px-Opry_Mills.jpg',
      alt: 'Opry Mills mall',
      directionsLink: 'https://maps.google.com/?q=Regal+Opry+Mills+IMAX',
      cost: 2,
      websiteLink:
        'https://www.regmovies.com/theatres/regal-opry-mills-imax/0852',
      tags: ['family-friendly', 'parking'],
    },
    {
      label: 'Cheekwood Estate & Gardens',
      details:
        '55 acres of botanical gardens and an art museum. Stunning in fall when the leaves change!',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cheekwood.jpg/1280px-Cheekwood.jpg',
      alt: 'Cheekwood botanical gardens',
      directionsLink: 'https://maps.google.com/?q=Cheekwood+Estate+and+Gardens',
      cost: 2,
      websiteLink: 'https://cheekwood.org',
      tags: ['outdoors', 'history', 'family-friendly', 'parking', 'arts'],
    },
    {
      label: "Nelson's Green Brier Distillery",
      details:
        "Tennessee whiskey distillery in Marathon Village. Tours and tastings available - learn about Nashville's whiskey history!",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Marathon_Village_Nashville.jpg/1280px-Marathon_Village_Nashville.jpg',
      alt: "Nelson's Green Brier Distillery",
      directionsLink:
        'https://maps.google.com/?q=Nelsons+Green+Brier+Distillery',
      cost: 2,
      websiteLink: 'https://greenbrierdistillery.com',
      tags: ['history', 'parking'],
    },
  ],
  'places-to-eat': [
    {
      label: 'Assembly Food Hall',
      details:
        'Massive food hall in downtown with 30+ vendors. Something for everyone - from Nashville hot chicken to sushi to tacos!',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Fifth_%2B_Broadway_Nashville.jpg/1280px-Fifth_%2B_Broadway_Nashville.jpg',
      alt: 'Assembly Food Hall at Fifth + Broadway',
      directionsLink: 'https://maps.google.com/?q=Assembly+Food+Hall+Nashville',
      cost: 2,
      websiteLink: 'https://www.assemblyfoodhall.com',
      tags: ['downtown', 'food-hall', 'family-friendly', 'walkable'],
    },
    {
      label: 'Greenhouse Bar',
      details:
        'Rooftop bar with stunning views of the Nashville skyline. Great cocktails and a relaxed vibe.',
      image: 'https://picsum.photos/seed/greenhouse-bar/800/600',
      alt: 'Greenhouse Bar rooftop',
      directionsLink: 'https://maps.google.com/?q=Greenhouse+Bar+Nashville',
      cost: 2,
      websiteLink: 'https://www.greenhousebar.com',
      tags: ['downtown', 'drinks', 'rooftop', 'walkable'],
    },
    {
      label: 'Condado Tacos',
      details:
        'Build-your-own tacos with creative toppings. The Capitol View location has great outdoor seating!',
      image: 'https://picsum.photos/seed/condado-tacos/800/600',
      alt: 'Condado Tacos',
      directionsLink:
        'https://maps.google.com/?q=Condado+Tacos,+501+12th+Ave+S,+Nashville,+TN+37203',
      cost: 2,
      websiteLink: 'https://locations.condadotacos.com/tn/418-11th-ave-n.',
      tags: ['capitol-view', 'casual', 'drinks', 'family-friendly', 'parking'],
    },
    {
      label: 'Little Hats Deli',
      details:
        'Classic Jewish deli with amazing sandwiches. The pastrami is a must-try!',
      image: 'https://picsum.photos/seed/little-hats/800/600',
      alt: 'Little Hats Deli',
      directionsLink: 'https://maps.google.com/?q=Little+Hats+Deli+Nashville',
      cost: 2,
      websiteLink: 'https://www.littlehatsdeli.com',
      tags: ['casual', 'local-favorite', 'brunch'],
    },
    {
      label: 'Hawkers Asian Street Food',
      details:
        'Pan-Asian street food with bold flavors. Great for sharing - order a bunch of small plates!',
      image: 'https://picsum.photos/seed/hawkers/800/600',
      alt: 'Hawkers Asian Street Food',
      directionsLink:
        'https://maps.google.com/?q=Hawkers+Asian+Street+Food+Nashville',
      cost: 2,
      websiteLink: 'https://www.eathawkers.com',
      tags: ['east-nashville', 'casual', 'local-favorite', 'drinks'],
    },
    {
      label: 'Bastion',
      details:
        'Intimate 24-seat restaurant with a creative tasting menu. The cocktail bar next door is also excellent.',
      image: 'https://picsum.photos/seed/bastion/800/600',
      alt: 'Bastion restaurant',
      directionsLink: 'https://maps.google.com/?q=Bastion+Nashville',
      cost: 4,
      websiteLink: 'https://www.bastionnashville.com',
      tags: ['gulch', 'upscale', 'local-favorite', 'drinks', 'michelin-star'],
    },
    {
      label: 'Locust',
      details:
        'Farm-to-table fine dining in East Nashville. Beautiful space with a seasonal menu that changes frequently.',
      image: 'https://picsum.photos/seed/locust/800/600',
      alt: 'Locust restaurant',
      directionsLink: 'https://maps.google.com/?q=Locust+Nashville',
      cost: 4,
      websiteLink: 'https://www.locustnashville.com',
      tags: ['east-nashville', 'upscale', 'local-favorite', 'michelin-star'],
    },
    {
      label: 'The Catbird Seat',
      details:
        "Nashville's premier tasting menu experience. Intimate 22-seat counter surrounding the open kitchen.",
      image: 'https://picsum.photos/seed/catbird/800/600',
      alt: 'The Catbird Seat plated dish',
      directionsLink: 'https://maps.google.com/?q=The+Catbird+Seat+Nashville',
      cost: 4,
      websiteLink: 'https://www.thecatbirdseatrestaurant.com',
      tags: ['midtown', 'upscale', 'local-favorite', 'drinks', 'michelin-star'],
    },
    {
      label: 'Ole Smoky Distillery',
      details:
        'Tennessee moonshine distillery on Broadway. Free tastings and live music - a fun stop on a Broadway crawl!',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Lower_Broadway_in_Nashville%2C_TN.jpg/1280px-Lower_Broadway_in_Nashville%2C_TN.jpg',
      alt: 'Ole Smoky Distillery on Broadway',
      directionsLink:
        'https://maps.google.com/?q=Ole+Smoky+Distillery+Nashville',
      cost: 1,
      websiteLink: 'https://olesmoky.com/pages/nashville',
      tags: ['downtown', 'drinks', 'live-music', 'walkable'],
    },
    {
      label: 'Fishmonger',
      details:
        'Fresh seafood and raw bar with a focus on quality. Great oysters and creative seafood dishes!',
      image: 'https://picsum.photos/seed/fishmonger/800/600',
      alt: 'Fishmonger restaurant',
      directionsLink: 'https://maps.google.com/?q=Fishmonger+Nashville',
      cost: 3,
      websiteLink: 'https://fishmongergroup.com',
      tags: ['germantown', 'upscale', 'drinks', 'local-favorite'],
    },
    {
      label: 'Oku',
      details:
        'Modern Japanese restaurant with a beautiful sushi bar. The omakase is a special treat!',
      image: 'https://picsum.photos/seed/oku/800/600',
      alt: 'Oku Japanese restaurant',
      directionsLink: 'https://maps.google.com/?q=Oku+Nashville',
      cost: 3,
      websiteLink: 'https://www.okunashville.com',
      tags: ['germantown', 'upscale', 'drinks', 'local-favorite'],
    },
    {
      label: "Hattie B's Hot Chicken",
      details:
        "Nashville hot chicken at its finest. Warning: 'Shut the Cluck Up' is NOT for beginners!",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Nashville_Hot_Chicken.jpg/1280px-Nashville_Hot_Chicken.jpg',
      alt: "Hattie B's hot chicken plate",
      directionsLink:
        'https://maps.google.com/?q=Hattie+Bs+Hot+Chicken+Nashville',
      cost: 1,
      websiteLink: 'https://hattieb.com',
      tags: ['casual', 'local-favorite', 'parking'],
    },
    {
      label: 'Butchertown Hall',
      details:
        'Texas-style BBQ meets Nashville. Smoked meats, great sides, and an excellent beer selection.',
      image: 'https://picsum.photos/seed/butchertown/800/600',
      alt: 'Butchertown Hall BBQ',
      directionsLink: 'https://maps.google.com/?q=Butchertown+Hall+Nashville',
      cost: 2,
      websiteLink: 'https://www.butchertownhall.com',
      tags: ['germantown', 'casual', 'local-favorite', 'drinks', 'parking'],
    },
    {
      label: 'Cookout',
      details:
        'Late-night fast food heaven! Cheap, delicious, and open late. The milkshakes are legendary.',
      image: 'https://picsum.photos/seed/cookout/800/600',
      alt: 'Cookout restaurant',
      directionsLink: 'https://maps.google.com/?q=Cookout+Nashville',
      cost: 1,
      websiteLink: 'https://cookout.com',
      tags: ['casual', 'late-night', 'parking', 'family-friendly'],
    },
    {
      label: 'Pizza Perfect',
      details:
        'New York-style pizza by the slice. Perfect for a quick, satisfying meal.',
      image: 'https://picsum.photos/seed/pizza-perfect/800/600',
      alt: 'Pizza Perfect',
      directionsLink: 'https://maps.google.com/?q=Pizza+Perfect+Nashville',
      cost: 1,
      websiteLink: 'https://www.pizzaperfectnashville.com',
      tags: ['casual', 'late-night', 'family-friendly'],
    },
    {
      label: 'Emmy Squared',
      details:
        'Detroit-style pizza with crispy, cheesy edges. The Colony is a fan favorite!',
      image: 'https://picsum.photos/seed/emmy-squared/800/600',
      alt: 'Emmy Squared pizza',
      directionsLink: 'https://maps.google.com/?q=Emmy+Squared+Nashville',
      cost: 2,
      websiteLink: 'https://www.emmysquared.com',
      tags: ['gulch', 'casual', 'local-favorite', 'drinks', 'family-friendly'],
    },
  ],
};

/**
 * NOTE: The following places are using placeholder images (picsum.photos) because
 * I couldn't find suitable Creative Commons images:
 *
 * Places to Stay:
 * - The Hermitage Hotel
 * - Graduate Nashville
 * - Airbnb in Sylvan Park
 *
 * Places to Eat:
 * - Greenhouse Bar
 * - Condado Tacos
 * - Little Hats Deli
 * - Hawkers Asian Street Food
 * - Bastion
 * - Locust
 * - The Catbird Seat
 * - Fishmonger
 * - Oku
 * - Butchertown Hall
 * - Cookout
 * - Pizza Perfect
 * - Emmy Squared
 */
