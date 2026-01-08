// Tags for Places to Stay
export type StayTag = 'downtown' | 'midtown' | 'upscale' | 'parking' | 'valet';

// Tags for Places to See
export type SeeTag =
  | 'downtown'
  | 'opry-mills'
  | 'outdoors'
  | 'indoor'
  | 'history'
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
  parking: 'Parking Available',
  valet: 'Valet Required',
  'local-favorite': 'Local Favorite',
  history: 'History',
  // See tags
  outdoors: 'Outdoors',
  indoor: 'Indoor',
  'live-music': 'Live Music',
  sports: 'Sports',
  arts: 'Arts & Culture',
  free: 'Free',
  'opry-mills': 'Opry Mills Area',
  // Eat tags
  drinks: 'Drinks',
  brunch: 'Brunch',
  casual: 'Casual',
  'late-night': 'Late Night',
  'food-hall': 'Food Hall',
  rooftop: 'Rooftop',
  'michelin-star': 'Michelin Star',
  // Location tags
  germantown: 'Germantown',
  'east-nashville': 'East Nashville',
  midtown: 'Midtown',
  gulch: 'The Gulch',
  'capitol-view': 'Capitol View',
  walkable: 'Walkable',
};

type PlaceCategory = 'places-to-stay' | 'places-to-see' | 'places-to-eat';

export const data: Record<PlaceCategory, Place[]> = {
  'places-to-stay': [
    {
      label: 'Hilton Nashville Downtown',
      details:
        'In the heart of Lower Broadway, right next to Bridgestone Arena. Perfect if you want to be in the middle of all the action in Nashville!',
      image:
        'https://www.hilton.com/im/en/BNANSHF/14149761/exterior-2.jpg?impolicy=crop&cw=5720&ch=3203&gravity=NorthWest&xposition=95&yposition=0&rw=768&rh=430',
      alt: 'Hilton Nashville Downtown',
      directionsLink:
        'https://maps.google.com/?q=Hilton+Nashville+Downtown+Broadway',
      cost: 3,
      websiteLink:
        'https://www.hilton.com/en/hotels/bnanshf-hilton-nashville-downtown/',
      tags: ['downtown', 'valet'],
    },
    {
      label: 'The Joseph',
      details:
        "One of Nashville's most acclaimed luxury hotels. Home to Yolan, widely considered the best Italian restaurant in the city (though we haven't tried it yet!).",
      image:
        'https://www.thejosephnashville.com/resourcefiles/mainimages/presidential-suite-living-room-main-el-1962x1076.jpg?version=1022026142602',
      alt: 'The Joseph hotel',
      directionsLink: 'https://maps.google.com/?q=The+Joseph+Nashville',
      cost: 4,
      websiteLink: 'https://www.thejosephnashville.com',
      tags: ['downtown', 'upscale', 'valet'],
    },
    {
      label: 'Hilton Garden Inn Nashville West End',
      details:
        'Very close to the wedding venue! Also near Vanderbilt University, Centennial Park, and the Parthenon.',
      image:
        'https://www.hilton.com/im/en/BNAGIGI/22684435/bnagi-exterior-03.tif?impolicy=crop&cw=5000&ch=2799&gravity=NorthWest&xposition=0&yposition=266&rw=768&rh=430',
      alt: 'Hilton Garden Inn Nashville West End',
      directionsLink:
        'https://maps.google.com/?q=Hilton+Garden+Inn+Nashville+Vanderbilt',
      cost: 2,
      websiteLink:
        'https://www.hilton.com/en/hotels/bnavbgi-hilton-garden-inn-nashville-vanderbilt/',
      tags: ['midtown', 'parking'],
    },
  ],
  'places-to-see': [
    {
      label: 'The Parthenon',
      details:
        'A full-scale replica of the original Parthenon in Athens, housing a 42-foot statue of Athena. A must-see Nashville landmark!',
      image:
        'https://images.squarespace-cdn.com/content/v1/5e305abfabc0e4424fd1454a/47b12cc5-2260-4ffd-ba04-88e14640b62e/NathanZucker_0323+%281%29.jpg?format=750w',
      alt: 'The Parthenon',
      directionsLink: 'https://maps.google.com/?q=The+Parthenon+Nashville',
      cost: 1,
      websiteLink: 'https://www.nashvilleparthenon.com',
      tags: ['midtown', 'indoor', 'history', 'parking'],
    },
    {
      label: 'Centennial Park',
      details:
        'Beautiful 132-acre park surrounding the Parthenon. Perfect for a morning walk, picnic, or jog around the lake. This is where we took our engagement photos!',
      image:
        'https://images.squarespace-cdn.com/content/v1/6022faf9ee791718f6cf0b87/9515ed89-7a72-4b94-a9cf-acfccc925e0b/Repatriation+and+Its+Impact+Celebration+7.14.24+Centennial+Park+-%40VonRphoto-60+%281%29.jpg?format=1500w',
      alt: 'Centennial Park',
      directionsLink: 'https://maps.google.com/?q=Centennial+Park+Nashville',
      cost: 0,
      websiteLink:
        'https://www.nashville.gov/departments/parks/parks/centennial-park',
      tags: ['midtown', 'outdoors', 'parking', 'free'],
    },
    {
      label: 'Nashville Zoo at Grassmere',
      details:
        'A 188-acre zoo with over 6,000 animals. Great for families with kids of all ages. The Jungle Gym playground is a must!',
      image:
        'https://www.visitmusiccity.com/sites/default/files/styles/listing_slide/public/listing_images/nashvilletn-3414_nashville-zoo-white-rhinoceros-2017-amiee-stubbs-1-_36dacf2f-5056-b3a8-4919af5d19689a6e_0.jpg.webp?itok=SNJWcMCc',
      alt: 'Nashville Zoo',
      directionsLink: 'https://maps.google.com/?q=Nashville+Zoo',
      cost: 2,
      websiteLink: 'https://www.nashvillezoo.org',
      tags: ['outdoors', 'parking'],
    },
    {
      label: 'Lower Broadway',
      details:
        'The heart of Nashville! Honky-tonks, live music, and people-watching. No cover charges at most bars.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Broadway_%28Nashville%29_lights.jpg/960px-Broadway_%28Nashville%29_lights.jpg',
      alt: 'Lower Broadway at night',
      directionsLink: 'https://maps.google.com/?q=Lower+Broadway+Nashville+TN',
      cost: 0,
      websiteLink:
        'https://www.visitmusiccity.com/explore-nashville/neighborhoods/downtown',
      tags: ['downtown', 'indoor', 'live-music', 'walkable', 'free'],
    },
    {
      label: "Nashville Farmers' Market",
      details:
        'Year-round market with fresh produce, local vendors, and international food stalls. The Market House has great lunch spots!',
      image:
        'https://www.trolleytours.com/wp-content/uploads/2016/06/nashville-farmers-market-aerial-683x384.jpg',
      alt: "Nashville Farmers' Market",
      directionsLink: 'https://maps.google.com/?q=Nashville+Farmers+Market',
      cost: 0,
      websiteLink: 'https://www.nashvillefarmersmarket.org',
      tags: ['downtown', 'indoor', 'outdoors', 'parking', 'free'],
    },
    {
      label: 'Tennessee State Museum',
      details:
        "Explore Tennessee's history from prehistoric times to the present. Free admission makes it a great rainy day activity!",
      image:
        'https://lh3.googleusercontent.com/p/AF1QipPZXoNr4Q5dNJmK90mJEb0GOZBv83WIO58Xho4h=s1360-w1360-h1020',
      alt: 'Tennessee State Museum',
      directionsLink: 'https://maps.google.com/?q=Tennessee+State+Museum',
      cost: 0,
      websiteLink: 'https://tnmuseum.org',
      tags: ['downtown', 'indoor', 'history', 'free'],
    },
    {
      label: 'Bicentennial Capitol Mall State Park',
      details:
        'A 19-acre park celebrating Tennessee history. Features a 200-foot granite map of the state and a WWII memorial.',
      image:
        'https://www.trolleytours.com/wp-content/uploads/2016/06/nashville-bicentennial-mall-park-480x270.jpg',
      alt: 'Bicentennial Capitol Mall',
      directionsLink:
        'https://maps.google.com/?q=Bicentennial+Capitol+Mall+State+Park',
      cost: 0,
      websiteLink: 'https://tnstateparks.com/parks/bicentennial-mall',
      tags: ['downtown', 'outdoors', 'history', 'free'],
    },
    {
      label: 'Tennessee State Capitol',
      details:
        'One of the oldest working state capitols in the U.S. Free guided tours available. Beautiful Greek Revival architecture.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Tennessee_State_Capitol_2022f.jpg/960px-Tennessee_State_Capitol_2022f.jpg',
      alt: 'Tennessee State Capitol building',
      directionsLink: 'https://maps.google.com/?q=Tennessee+State+Capitol',
      cost: 0,
      websiteLink: 'https://www.capitol.tn.gov',
      tags: ['downtown', 'indoor', 'history', 'walkable', 'free'],
    },
    {
      label: 'Nashville Predators Hockey',
      details:
        "Catch a Preds game at Bridgestone Arena! Even if you're not a hockey fan, the atmosphere is electric.",
      image:
        'https://www.bridgestonearena.com/assets/img/Predators-Crowd-Game-Side-533b07040c.jpg',
      alt: 'Bridgestone Arena',
      directionsLink: 'https://maps.google.com/?q=Bridgestone+Arena+Nashville',
      cost: 3,
      websiteLink: 'https://www.nhl.com/predators',
      tags: ['downtown', 'indoor', 'sports', 'walkable'],
    },
    {
      label: 'Nashville SC Soccer',
      details:
        "Catch an MLS match at GEODIS Park! Nashville's soccer club has one of the best atmospheres in the league.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Nashville_SC_vs_Portland_Timbers_by_cornfield948_%2820220705094311%29.jpg/500px-Nashville_SC_vs_Portland_Timbers_by_cornfield948_%2820220705094311%29.jpg',
      alt: 'Nashville SC at GEODIS Park',
      directionsLink: 'https://maps.google.com/?q=GEODIS+Park+Nashville',
      cost: 3,
      websiteLink: 'https://www.nashvillesc.com',
      tags: ['midtown', 'outdoors', 'sports', 'parking'],
    },
    {
      label: 'Tennessee Performing Arts Center (TPAC)',
      details:
        'Broadway shows, concerts, and performances. Check the schedule - they often have amazing touring productions!',
      image: 'https://www.tpac.org/assets/img/image045-4276608612.JPG',
      alt: 'Tennessee Performing Arts Center',
      directionsLink:
        'https://maps.google.com/?q=Tennessee+Performing+Arts+Center',
      cost: 3,
      websiteLink: 'https://www.tpac.org',
      tags: ['downtown', 'indoor', 'arts', 'walkable'],
    },
    {
      label: 'Ryman Auditorium',
      details:
        "The 'Mother Church of Country Music.' Take a tour or catch a show - the acoustics are incredible.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Ryman_Auditorium.jpg/500px-Ryman_Auditorium.jpg',
      alt: 'Ryman Auditorium',
      directionsLink: 'https://maps.google.com/?q=Ryman+Auditorium',
      cost: 2,
      websiteLink: 'https://www.ryman.com',
      tags: ['downtown', 'indoor', 'history', 'live-music', 'walkable', 'arts'],
    },
    {
      label: 'Grand Ole Opry',
      details:
        "The show that made country music famous! Catch a live performance at this legendary venue - it's been running since 1925.",
      image:
        'https://www.trolleytours.com/wp-content/uploads/2025/01/grand-ole-opry-nashville-480x270.jpg',
      alt: 'Grand Ole Opry',
      directionsLink: 'https://maps.google.com/?q=Grand+Ole+Opry+Nashville',
      cost: 3,
      websiteLink: 'https://www.opry.com',
      tags: ['opry-mills', 'indoor', 'history', 'live-music', 'parking'],
    },
    {
      label: 'Regal Opry Mills IMAX',
      details:
        'Catch the latest blockbuster on the giant IMAX screen. Located in Opry Mills mall with plenty of shopping nearby.',
      image:
        'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSypbKnWvjiLf88RN1kpffHbzfqYB5vqsByPIb2CVhAbaI7JgaqsgqYgJhuJhRFhYWtoQcL8mZ5dyo6QHdV3NBXxeCInXV5mNXZOXBYk7G3WjjGgds7BqYE5PG89KZtJGQGtJT7PfeyHU1K1=s1360-w1360-h1020',
      alt: 'Regal Opry Mills IMAX',
      directionsLink: 'https://maps.google.com/?q=Regal+Opry+Mills+IMAX',
      cost: 2,
      websiteLink:
        'https://www.regmovies.com/theatres/regal-opry-mills-imax/0852',
      tags: ['opry-mills', 'indoor', 'parking'],
    },
    {
      label: 'Cheekwood Estate & Gardens',
      details:
        '55 acres of botanical gardens and an art museum. Stunning in fall when the leaves change!',
      image: 'https://cheekwood.org/wp-content/uploads/bradford-thumbnail.jpg',
      alt: 'Cheekwood botanical gardens',
      directionsLink: 'https://maps.google.com/?q=Cheekwood+Estate+and+Gardens',
      cost: 2,
      websiteLink: 'https://cheekwood.org',
      tags: ['outdoors', 'indoor', 'history', 'parking', 'arts'],
    },
    {
      label: "Nelson's Green Brier Distillery",
      details:
        "Tennessee whiskey distillery in Marathon Village. Tours and tastings available - learn about Nashville's whiskey history!",
      image:
        'https://greenbrierdistillery.com/cdn/shop/files/NGBD_-_Exteriors_06_1512x.jpg?v=1750089962',
      alt: "Nelson's Green Brier Distillery",
      directionsLink:
        'https://maps.google.com/?q=Nelsons+Green+Brier+Distillery',
      cost: 2,
      websiteLink: 'https://greenbrierdistillery.com',
      tags: ['indoor', 'history', 'parking'],
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
      tags: ['downtown', 'food-hall', 'walkable'],
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
      tags: ['capitol-view', 'casual', 'drinks', 'parking'],
    },
    {
      label: 'Little Hats Deli',
      details:
        'Classic Italian deli with amazing sandwiches. The pastrami is a must-try!',
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
      tags: ['casual', 'late-night', 'parking'],
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
      tags: ['casual', 'late-night'],
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
      tags: ['gulch', 'casual', 'local-favorite', 'drinks'],
    },
    {
      label: "Adele's",
      details:
        'Elevated Southern comfort food with farm-to-table ingredients. Famous for their weekend brunch buffet and handcrafted cocktails.',
      image: 'https://picsum.photos/seed/adeles/800/600',
      alt: "Adele's restaurant",
      directionsLink:
        'https://maps.google.com/?q=Adeles+Nashville+1210+McGavock+St',
      cost: 3,
      websiteLink: 'https://www.adelesnashville.com',
      tags: ['gulch', 'upscale', 'brunch', 'drinks', 'local-favorite'],
    },
  ],
};
