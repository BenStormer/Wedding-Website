// Images for Places to Stay
import hiltonDownton from '../../assets/images/visiting-nashville/stay/hilton_downtown.webp';
import hiltonWestEnd from '../../assets/images/visiting-nashville/stay/hilton_west_end.webp';
import joseph from '../../assets/images/visiting-nashville/stay/joseph.webp';

// Images for Places to See
import bicentennial from '../../assets/images/visiting-nashville/see/bicentennial.webp';
import broadway from '../../assets/images/visiting-nashville/see/broadway.webp';
import capitol from '../../assets/images/visiting-nashville/see/capitol.webp';
import centennial from '../../assets/images/visiting-nashville/see/centennial.webp';
import cheekwood from '../../assets/images/visiting-nashville/see/cheekwood.webp';
import farmersMarket from '../../assets/images/visiting-nashville/see/farmers_market.webp';
import grandOleOpry from '../../assets/images/visiting-nashville/see/grand_ole_opry.webp';
import nashvillePredatorsHockey from '../../assets/images/visiting-nashville/see/nashville_predators_hockey.webp';
import nashvilleSoccer from '../../assets/images/visiting-nashville/see/nashville_soccer.webp';
import nelsonsGreenbrier from '../../assets/images/visiting-nashville/see/nelsons_greenbrier.webp';
import parthenon from '../../assets/images/visiting-nashville/see/parthenon.webp';
import regalOpryMills from '../../assets/images/visiting-nashville/see/regal_opry_mills.webp';
import ryman from '../../assets/images/visiting-nashville/see/ryman.webp';
import stateHistoryMuseum from '../../assets/images/visiting-nashville/see/state_history_museum.webp';
import tpac from '../../assets/images/visiting-nashville/see/tpac.webp';
import zoo from '../../assets/images/visiting-nashville/see/zoo.webp';

// Images for Places to Eat
import adeles from '../../assets/images/visiting-nashville/eat/adeles.webp';
import assemblyFoodHall from '../../assets/images/visiting-nashville/eat/assembly_food_hall.webp';
import bastion from '../../assets/images/visiting-nashville/eat/bastion.webp';
import butchertownHall from '../../assets/images/visiting-nashville/eat/butchertown_hall.webp';
import condado from '../../assets/images/visiting-nashville/eat/condado.webp';
import cookout from '../../assets/images/visiting-nashville/eat/cookout.webp';
import emmySquared from '../../assets/images/visiting-nashville/eat/emmy_squared.webp';
import fishmonger from '../../assets/images/visiting-nashville/eat/fishmonger.webp';
import greenhouse from '../../assets/images/visiting-nashville/eat/greenhouse.webp';
import hattieBs from '../../assets/images/visiting-nashville/eat/hattie_bs.webp';
import hawkers from '../../assets/images/visiting-nashville/eat/hawkers.webp';
import littleHats from '../../assets/images/visiting-nashville/eat/little_hats.webp';
import locust from '../../assets/images/visiting-nashville/eat/locust.webp';
import oku from '../../assets/images/visiting-nashville/eat/oku.webp';
import oleSmoky from '../../assets/images/visiting-nashville/eat/ole_smoky.webp';
import pizzaPerfect from '../../assets/images/visiting-nashville/eat/pizza_perfect.webp';
import theCatbirdSeat from '../../assets/images/visiting-nashville/eat/the_catbird_seat.webp';

// Tags for Places to Stay
export type StayTag = 'downtown' | 'midtown' | 'upscale' | 'parking' | 'valet';

// Tags for Places to See
export type SeeTag =
  // Locations
  | 'downtown'
  | 'germantown'
  | 'midtown'
  | 'wedgewood-houston'
  | 'capitol-view'
  | 'opry-mills'
  | 'southeast-nashville'
  // Features
  | 'parking'
  | 'sports'
  | 'arts'
  | 'music'
  | 'indoors'
  | 'outdoors'
  | 'late-night'
  | 'history'
  | 'free'
  | 'drinks';

// Tags for Places to Eat
export type EatTag =
  // Locations
  | 'downtown'
  | 'germantown'
  | 'midtown'
  | 'wedgewood-houston'
  | 'capitol-view'
  | 'opry-mills'
  | 'southeast-nashville'
  | 'east-nashville'
  | 'gulch'
  | 'green-hills'
  // Food types
  | 'tex-mex'
  | 'sushi'
  | 'american'
  | 'fast-food'
  | 'drinks'
  | 'pizza'
  | 'bbq'
  | 'asian'
  | 'seafood'
  | 'italian'
  | 'southern'
  | 'hot-chicken'
  // Features
  | 'multiple-options'
  | 'multiple-locations'
  | 'late-night'
  | 'reservation-required'
  | 'music'
  | 'tourist-favorite'
  | 'michelin-star'
  | 'casual'
  | 'upscale'
  | 'breakfast'
  | 'parking';

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
  // Location tags (shared)
  downtown: 'Downtown',
  germantown: 'Germantown',
  midtown: 'Midtown',
  'wedgewood-houston': 'Wedgewood-Houston',
  'capitol-view': 'Capitol View',
  'opry-mills': 'Opry Mills',
  'southeast-nashville': 'Southeast Nashville',
  'east-nashville': 'East Nashville',
  gulch: 'The Gulch',
  'green-hills': 'Green Hills',

  // Places to Stay tags
  valet: 'Valet Required',

  // Places to See tags
  parking: 'Parking',
  sports: 'Sports',
  arts: 'Arts & Culture',
  music: 'Music',
  indoors: 'Indoors',
  outdoors: 'Outdoors',
  'late-night': 'Late Night',
  history: 'History',
  free: 'Free',

  // Places to Eat - Food types
  'tex-mex': 'Tex-Mex',
  sushi: 'Sushi',
  american: 'American',
  'fast-food': 'Fast Food',
  drinks: 'Drinks',
  pizza: 'Pizza',
  bbq: 'BBQ',
  asian: 'Asian',
  seafood: 'Seafood',
  italian: 'Italian',
  southern: 'Southern',
  'hot-chicken': 'Hot Chicken',

  // Places to Eat - Features
  'multiple-options': 'Multiple Food Options',
  'multiple-locations': 'Multiple Locations',
  'reservation-required': 'Reservation Required',
  'tourist-favorite': 'Tourist Favorite',
  'michelin-star': 'Michelin Star',
  casual: 'Casual',
  upscale: 'Upscale',
  breakfast: 'Breakfast',
};

type PlaceCategory = 'places-to-stay' | 'places-to-see' | 'places-to-eat';

export const data: Record<PlaceCategory, Place[]> = {
  'places-to-stay': [
    {
      label: 'Hilton Garden Inn Nashville West End',
      details:
        'Very close to the wedding venue! Also near Vanderbilt University, Centennial Park, and the Parthenon.',
      image: hiltonWestEnd,
      alt: 'Hilton Garden Inn Nashville West End',
      directionsLink:
        'https://maps.google.com/?q=Hilton+Garden+Inn+Nashville+Vanderbilt',
      cost: 2,
      websiteLink:
        'https://www.hilton.com/en/hotels/bnagigi-hilton-garden-inn-nashville-west-end-avenue/',
      tags: ['midtown', 'parking'],
    },
    {
      label: 'Hilton Nashville Downtown',
      details:
        'In the heart of Lower Broadway, right next to Bridgestone Arena. Perfect if you want to be in the middle of all the action in Nashville!',
      image: hiltonDownton,
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
      image: joseph,
      alt: 'The Joseph hotel',
      directionsLink: 'https://maps.google.com/?q=The+Joseph+Nashville',
      cost: 4,
      websiteLink: 'https://www.thejosephnashville.com',
      tags: ['downtown', 'upscale', 'valet'],
    },
  ],
  'places-to-see': [
    {
      label: 'Bicentennial Capitol Mall State Park',
      details:
        'A 19-acre park celebrating Tennessee history. Features a 200-foot granite map of the state and a WWII memorial.',
      image: bicentennial,
      alt: 'Bicentennial Capitol Mall',
      directionsLink:
        'https://maps.google.com/?q=Bicentennial+Capitol+Mall+State+Park',
      cost: 0,
      websiteLink: 'https://tnstateparks.com/parks/bicentennial-mall',
      tags: ['downtown', 'outdoors', 'history', 'free', 'parking'],
    },
    {
      label: 'Centennial Park',
      details:
        'Beautiful 132-acre park surrounding the Parthenon. Perfect for a morning walk, picnic, or jog around the lake. This is where we took our engagement photos!',
      image: centennial,
      alt: 'Centennial Park',
      directionsLink: 'https://maps.google.com/?q=Centennial+Park+Nashville',
      cost: 0,
      websiteLink:
        'https://www.nashville.gov/departments/parks/parks/centennial-park',
      tags: ['midtown', 'outdoors', 'parking', 'free'],
    },
    {
      label: 'Cheekwood Estate & Gardens',
      details:
        '55 acres of botanical gardens and an art museum. Stunning in fall when the leaves change!',
      image: cheekwood,
      alt: 'Cheekwood botanical gardens',
      directionsLink: 'https://maps.google.com/?q=Cheekwood+Estate+and+Gardens',
      cost: 2,
      websiteLink: 'https://cheekwood.org',
      tags: ['outdoors', 'history', 'parking', 'arts'],
    },
    {
      label: 'Grand Ole Opry',
      details:
        "The show that made country music famous! Catch a live performance at this legendary venue - it's been running since 1925.",
      image: grandOleOpry,
      alt: 'Grand Ole Opry',
      directionsLink: 'https://maps.google.com/?q=Grand+Ole+Opry+Nashville',
      cost: 3,
      websiteLink: 'https://www.opry.com',
      tags: ['opry-mills', 'indoors', 'history', 'music', 'parking'],
    },
    {
      label: 'Lower Broadway',
      details:
        'The heart of Nashville! Honky-tonks, live music, and people-watching. No cover charges at most bars.',
      image: broadway,
      alt: 'Lower Broadway at night',
      directionsLink: 'https://maps.google.com/?q=Lower+Broadway+Nashville+TN',
      cost: 0,
      websiteLink:
        'https://www.visitmusiccity.com/explore-nashville/neighborhoods/downtown',
      tags: [
        'downtown',
        'indoors',
        'outdoors',
        'music',
        'late-night',
        'drinks',
      ],
    },
    {
      label: "Nashville Farmers' Market",
      details:
        'Year-round market with fresh produce, local vendors, and international food stalls. The Market House has great lunch spots!',
      image: farmersMarket,
      alt: "Nashville Farmers' Market",
      directionsLink: 'https://maps.google.com/?q=Nashville+Farmers+Market',
      cost: 0,
      websiteLink: 'https://www.nashvillefarmersmarket.org',
      tags: ['downtown', 'indoors', 'outdoors', 'parking', 'free'],
    },
    {
      label: 'Nashville Predators Hockey',
      details:
        "Catch a Preds game at Bridgestone Arena! Even if you're not a hockey fan, the atmosphere is electric.",
      image: nashvillePredatorsHockey,
      alt: 'Bridgestone Arena',
      directionsLink: 'https://maps.google.com/?q=Bridgestone+Arena+Nashville',
      cost: 3,
      websiteLink: 'https://www.nhl.com/predators',
      tags: ['downtown', 'indoors', 'sports'],
    },
    {
      label: 'Nashville SC Soccer',
      details:
        "Catch an MLS match at GEODIS Park! Nashville's soccer club has one of the best atmospheres in the league.",
      image: nashvilleSoccer,
      alt: 'Nashville SC at GEODIS Park',
      directionsLink: 'https://maps.google.com/?q=GEODIS+Park+Nashville',
      cost: 2,
      websiteLink: 'https://www.nashvillesc.com',
      tags: ['wedgewood-houston', 'outdoors', 'sports'],
    },
    {
      label: 'Nashville Zoo at Grassmere',
      details:
        'A 188-acre zoo with over 6,000 animals. Great for families with kids of all ages. The Jungle Gym playground is a must!',
      image: zoo,
      alt: 'Nashville Zoo',
      directionsLink: 'https://maps.google.com/?q=Nashville+Zoo',
      cost: 2,
      websiteLink: 'https://www.nashvillezoo.org',
      tags: ['southeast-nashville', 'outdoors', 'parking'],
    },
    {
      label: "Nelson's Green Brier Distillery",
      details:
        "Tennessee whiskey distillery in Marathon Village. Tours and tastings available - learn about Nashville's whiskey history!",
      image: nelsonsGreenbrier,
      alt: "Nelson's Green Brier Distillery",
      directionsLink:
        'https://maps.google.com/?q=Nelsons+Green+Brier+Distillery',
      cost: 2,
      websiteLink: 'https://greenbrierdistillery.com',
      tags: ['capitol-view', 'indoors', 'history', 'parking'],
    },
    {
      label: 'Regal Opry Mills IMAX',
      details:
        'Catch the latest blockbuster on the giant IMAX screen. Located in Opry Mills mall with plenty of shopping nearby.',
      image: regalOpryMills,
      alt: 'Regal Opry Mills IMAX',
      directionsLink: 'https://maps.google.com/?q=Regal+Opry+Mills+IMAX',
      cost: 2,
      websiteLink: 'https://www.regmovies.com/theatres/regal-opry-mills-0615',
      tags: ['opry-mills', 'indoors', 'parking', 'late-night'],
    },
    {
      label: 'Ryman Auditorium',
      details:
        "The 'Mother Church of Country Music.' Take a tour or catch a show - the acoustics are incredible.",
      image: ryman,
      alt: 'Ryman Auditorium',
      directionsLink: 'https://maps.google.com/?q=Ryman+Auditorium',
      cost: 2,
      websiteLink: 'https://www.ryman.com',
      tags: ['downtown', 'indoors', 'history', 'music', 'arts'],
    },
    {
      label: 'Tennessee Performing Arts Center (TPAC)',
      details:
        'Broadway shows, concerts, and performances. Check the schedule - they often have amazing touring productions!',
      image: tpac,
      alt: 'Tennessee Performing Arts Center',
      directionsLink:
        'https://maps.google.com/?q=Tennessee+Performing+Arts+Center',
      cost: 3,
      websiteLink: 'https://www.tpac.org',
      tags: ['downtown', 'indoors', 'arts'],
    },
    {
      label: 'Tennessee State Capitol',
      details:
        'One of the oldest working state capitols in the U.S. Free guided tours available. Beautiful Greek Revival architecture.',
      image: capitol,
      alt: 'Tennessee State Capitol building',
      directionsLink: 'https://maps.google.com/?q=Tennessee+State+Capitol',
      cost: 0,
      websiteLink: 'https://www.capitol.tn.gov/about/capitolvisit.html',
      tags: ['downtown', 'indoors', 'history', 'free'],
    },
    {
      label: 'Tennessee State Museum',
      details:
        "Explore Tennessee's history from prehistoric times to the present. Free admission makes it a great rainy day activity!",
      image: stateHistoryMuseum,
      alt: 'Tennessee State Museum',
      directionsLink: 'https://maps.google.com/?q=Tennessee+State+Museum',
      cost: 0,
      websiteLink: 'https://tnmuseum.org',
      tags: ['downtown', 'indoors', 'history', 'free', 'parking', 'arts'],
    },
    {
      label: 'Parthenon',
      details:
        'A full-scale replica of the original Parthenon in Athens, housing a 42-foot statue of Athena. A must-see Nashville landmark!',
      image: parthenon,
      alt: 'Parthenon',
      directionsLink: 'https://maps.google.com/?q=The+Parthenon+Nashville',
      cost: 1,
      websiteLink: 'https://www.nashvilleparthenon.com',
      tags: ['midtown', 'indoors', 'outdoors', 'history', 'parking', 'arts'],
    },
  ],
  'places-to-eat': [
    {
      label: "Adele's",
      details:
        'Elevated Southern comfort food with farm-to-table ingredients. Famous for their weekend brunch buffet and handcrafted cocktails.',
      image: adeles,
      alt: "Adele's restaurant",
      directionsLink:
        'https://maps.google.com/?q=Adeles+Nashville+1210+McGavock+St',
      cost: 3,
      websiteLink: 'https://www.adelesnashville.com',
      tags: [
        'gulch',
        'upscale',
        'southern',
        'breakfast',
        'parking',
        'reservation-required',
      ],
    },
    {
      label: 'Assembly Food Hall',
      details:
        'Massive food hall in downtown with 30+ vendors. Something for everyone - from Nashville hot chicken to sushi to tacos!',
      image: assemblyFoodHall,
      alt: 'Assembly Food Hall at Fifth + Broadway',
      directionsLink: 'https://maps.google.com/?q=Assembly+Food+Hall+Nashville',
      cost: 2,
      websiteLink: 'https://www.assemblyfoodhall.com',
      tags: ['downtown', 'multiple-options', 'casual', 'tourist-favorite'],
    },
    {
      label: 'Bastion',
      details:
        'Intimate 24-seat restaurant with a creative tasting menu. The cocktail bar next door is also excellent.',
      image: bastion,
      alt: 'Bastion restaurant',
      directionsLink: 'https://maps.google.com/?q=Bastion+Nashville',
      cost: 4,
      websiteLink: 'https://www.bastionnashville.com',
      tags: [
        'wedgewood-houston',
        'upscale',
        'american',
        'drinks',
        'michelin-star',
        'reservation-required',
      ],
    },
    {
      label: 'Butchertown Hall',
      details:
        'Texas-style BBQ meets Nashville. Smoked meats, great sides, and an excellent beer selection.',
      image: butchertownHall,
      alt: 'Butchertown Hall BBQ',
      directionsLink: 'https://maps.google.com/?q=Butchertown+Hall+Nashville',
      cost: 3,
      websiteLink: 'https://www.butchertownhall.com',
      tags: ['germantown', 'upscale', 'bbq', 'reservation-required'],
    },
    {
      label: 'Condado Tacos',
      details:
        'Build-your-own tacos with creative toppings. The Capitol View location has great outdoor seating!',
      image: condado,
      alt: 'Condado Tacos',
      directionsLink:
        'https://maps.google.com/?q=Condado+Tacos,+501+12th+Ave+S,+Nashville,+TN+37203',
      cost: 2,
      websiteLink: 'https://locations.condadotacos.com/tn/418-11th-ave-n.',
      tags: ['capitol-view', 'casual', 'tex-mex', 'parking'],
    },
    {
      label: 'Cookout',
      details:
        'Late-night fast food heaven! Cheap, delicious, and open late. The milkshakes are legendary.',
      image: cookout,
      alt: 'Cookout restaurant',
      directionsLink: 'https://maps.google.com/?q=Cookout+Nashville',
      cost: 1,
      websiteLink: 'https://cookout.com',
      tags: ['fast-food', 'late-night', 'parking', 'multiple-locations'],
    },
    {
      label: 'Emmy Squared',
      details:
        'Detroit-style pizza with crispy, cheesy edges. The Colony is a fan favorite!',
      image: emmySquared,
      alt: 'Emmy Squared pizza',
      directionsLink: 'https://maps.google.com/?q=Emmy+Squared+Nashville',
      cost: 2,
      websiteLink:
        'https://www.emmysquaredpizza.com/location/germantown-nashville-tn/',
      tags: [
        'germantown',
        'gulch',
        'green-hills',
        'casual',
        'pizza',
        'multiple-locations',
      ],
    },
    {
      label: 'Fishmonger',
      details:
        'Fresh seafood and raw bar with a focus on quality. Great oysters and creative seafood dishes!',
      image: fishmonger,
      alt: 'Fishmonger restaurant',
      directionsLink: 'https://maps.google.com/?q=Fishmonger+Nashville',
      cost: 3,
      websiteLink: 'https://fishmongergroup.com',
      tags: ['germantown', 'casual', 'seafood'],
    },
    {
      label: 'Greenhouse Bar',
      details:
        'Rooftop bar with stunning views of the Nashville skyline. Great cocktails and a relaxed vibe.',
      image: greenhouse,
      alt: 'Greenhouse Bar rooftop',
      directionsLink: 'https://maps.google.com/?q=Greenhouse+Bar+Nashville',
      cost: 2,
      websiteLink: 'https://www.greenhousenash.com/',
      tags: ['green-hills', 'drinks', 'casual'],
    },
    {
      label: "Hattie B's Hot Chicken",
      details:
        "Nashville hot chicken at its finest. Warning: 'Shut the Cluck Up' is NOT for beginners!",
      image: hattieBs,
      alt: "Hattie B's hot chicken plate",
      directionsLink:
        'https://maps.google.com/?q=Hattie+Bs+Hot+Chicken+Nashville',
      cost: 1,
      websiteLink: 'https://hattieb.com',
      tags: [
        'midtown',
        'casual',
        'american',
        'tourist-favorite',
        'parking',
        'multiple-locations',
      ],
    },
    {
      label: 'Hawkers Asian Street Food',
      details:
        'Pan-Asian street food with bold flavors. Great for sharing - order a bunch of small plates!',
      image: hawkers,
      alt: 'Hawkers Asian Street Food',
      directionsLink:
        'https://maps.google.com/?q=Hawkers+Asian+Street+Food+Nashville',
      cost: 2,
      websiteLink: 'https://www.eathawkers.com',
      tags: ['east-nashville', 'casual', 'asian', 'parking'],
    },
    {
      label: 'Little Hats Market',
      details:
        'Classic Italian deli with amazing sandwiches. The pastrami is a must-try!',
      image: littleHats,
      alt: 'Little Hats Deli',
      directionsLink: 'https://maps.google.com/?q=Little+Hats+Deli+Nashville',
      cost: 2,
      websiteLink: 'https://www.littlehatsmarket.com',
      tags: ['germantown', 'casual', 'italian', 'parking'],
    },
    {
      label: 'Locust',
      details:
        'Farm-to-table fine dining in East Nashville. Beautiful space with a seasonal menu that changes frequently.',
      image: locust,
      alt: 'Locust restaurant',
      directionsLink: 'https://maps.google.com/?q=Locust+Nashville',
      cost: 4,
      websiteLink: 'https://www.locustnashville.com',
      tags: [
        'east-nashville',
        'upscale',
        'american',
        'michelin-star',
        'reservation-required',
      ],
    },
    {
      label: 'Oku',
      details:
        'Modern Japanese restaurant with a beautiful sushi bar. The omakase is a special treat!',
      image: oku,
      alt: 'Oku Japanese restaurant',
      directionsLink: 'https://maps.google.com/?q=Oku+Nashville',
      cost: 3,
      websiteLink: 'https://www.o-kusushi.com/location/o-ku-nashville/',
      tags: [
        'germantown',
        'upscale',
        'sushi',
        'parking',
        'reservation-required',
      ],
    },
    {
      label: 'Ole Smoky Distillery',
      details:
        'Tennessee moonshine distillery on Broadway. Free tastings and live music - a fun stop on a Broadway crawl!',
      image: oleSmoky,
      alt: 'Ole Smoky Distillery on Broadway',
      directionsLink:
        'https://maps.google.com/?q=Ole+Smoky+Distillery+Nashville',
      cost: 1,
      websiteLink: 'https://olesmoky.com/pages/nashville',
      tags: [
        'downtown',
        'drinks',
        'music',
        'multiple-options',
        'tourist-favorite',
        'casual',
      ],
    },
    {
      label: 'Pizza Perfect',
      details:
        'New York-style pizza by the slice. Perfect for a quick, satisfying meal.',
      image: pizzaPerfect,
      alt: 'Pizza Perfect',
      directionsLink: 'https://maps.google.com/?q=Pizza+Perfect+Nashville',
      cost: 1,
      websiteLink: 'https://www.pizzaperfectonline.com',
      tags: ['midtown', 'casual', 'pizza', 'late-night'],
    },
    {
      label: 'The Catbird Seat',
      details:
        "Nashville's premier tasting menu experience. Intimate 22-seat counter surrounding the open kitchen.",
      image: theCatbirdSeat,
      alt: 'The Catbird Seat plated dish',
      directionsLink: 'https://maps.google.com/?q=The+Catbird+Seat+Nashville',
      cost: 4,
      websiteLink: 'https://www.thecatbirdseatrestaurant.com',
      tags: [
        'gulch',
        'upscale',
        'american',
        'michelin-star',
        'reservation-required',
      ],
    },
  ],
};

// Auto-sort all categories alphabetically by label
Object.keys(data).forEach((key) => {
  data[key as PlaceCategory].sort((a, b) => a.label.localeCompare(b.label));
});
