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
import oku from '../../assets/images/visiting-nashville/eat/oku.webp';
import oleSmoky from '../../assets/images/visiting-nashville/eat/ole_smoky.webp';
import pizzaPerfect from '../../assets/images/visiting-nashville/eat/pizza_perfect.webp';

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
  tip?: string; // Optional tip to display below the description
  image: string;
  alt: string;
  directionsLink: string;
  cost: number; // 0 = free, 1-4 = $ to $$$$
  websiteLink: string;
  tags: PlaceTag[];
  distanceFromVenue?: string; // Optional distance from wedding venue (e.g., "5 min")
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
      distanceFromVenue: '5 min',
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
      distanceFromVenue: '20 min',
    },
    {
      label: 'The Joseph',
      details:
        "One of Nashville's most acclaimed luxury hotels. Home to Yolan, widely considered the best Italian restaurant in the city (though we haven't tried it yet)!",
      image: joseph,
      alt: 'The Joseph hotel',
      directionsLink: 'https://maps.google.com/?q=The+Joseph+Nashville',
      cost: 4,
      websiteLink: 'https://www.thejosephnashville.com',
      tags: ['downtown', 'upscale', 'valet'],
      distanceFromVenue: '15 min',
    },
  ],
  'places-to-see': [
    {
      label: 'Bicentennial Capitol Mall State Park',
      details:
        'We love everything about this place. The landscape architecture follows the geography of Tennessee, complete with plaques and fascinating history throughout. It has the best view of the Capitol in the city. Ben loves that everyone brings their dogs here, and Aspen is particularly drawn to the Magnolia trees at the Southern end.',
      tip: 'You can spin the massive globe in the WW2 section.',
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
        'Home to the Parthenon, this beautiful 132-acre park is perfect for a morning walk, picnic, or jog around the lake. This is where we took our engagement photos! There is also a famous chair that Taylor Swift sat at (if you are into that). We imagine it would be a nice place to read if we read.',
      tip: 'Check out lemonade or ice cream vendors if you are interested.',
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
        "This is a gorgeous, massive estate with tons of gardens. The variety of garden and plant types means there is truly something for everyone's tastes. It is likely to be especially beautiful (but crowded) in the Fall.",
      tip: 'Check out the hiking trails! They have sculptures and neat art along the paths.',
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
        'This is perhaps the most famous theater in Nashville, located right next to the Opry Mills Mall (with the IMAX theater we love). They offer daily tours and shows. The theater itself has great views from anywhere and comfortable, bench-style seating. We actually saw Dancing with the Stars Live here instead of a musician!',
      tip: 'Skip the tour and just see a show if possible!',
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
        'This is the heart of Nashville and where every tourist goes. It is honky-tonk after honky-tonk and the first thing people tend to think of when they imagine Nashville.',
      tip: 'On the upper floors of the bars they tend to play music genres other than country.',
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
        "Since it is right next to the TN State Museum and Bicentennial Park, we come here often. There's plenty of parking and tons of vendors for food and local crafts. It's a great place to grab a souvenir, and they usually have live music on the weekends.",
      tip: 'Do not order the breakfast sandwich from the coffee shop inside.',
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
        'This is our favorite sport to watch in Nashville. The games are extremely exciting, and they have the best crowd of any sport in the city. The arena is in the heart of Lower Broadway, so you can always find something to do before or after the game. If you are lucky, you might even see a fight!',
      tip: 'Learn the chants before you go!',
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
        'This is our second favorite sport to watch in Nashville. The stadium is gorgeous and the crowd is almost as lively as hockey. Tickets are often very cheap, and soccer is so much more fun to watch in person than on TV.',
      tip: 'Use a rideshare app to get there. Parking is a nightmare, expensive, and you will still end up walking 15-30 minutes to reach the stadium.',
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
        "This is our third favorite zoo we've ever been to, right behind the St. Louis Zoo and Smithsonian National Zoo in DC. We even have a membership and go about once a season. Some highlights are that they have live animal shows and will let you pet kangaroos!",
      tip: 'Check out the vet center. They sometimes have baby animals in the windows!',
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
        "Admittedly, we have not actually been here yet and we're not sure why. We have only ever heard good things and it seems like a great time. It is one of the distilleries with the coolest histories in Tennessee.",
      tip: 'There is free street parking around the green space in Capitol View.',
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
        'There is one reason to go to this theater: the IMAX screen. Ben likes to nerd out over screen formats, and this is one of fewer than 30 true 70mm IMAX theaters in the US. We saw our first true IMAX (not "LieMax") movie here, which was Oppenheimer, followed by Barbie the same day. Since then we have seen Interstellar, Mission Impossible: Final Reckoning, Avatar 2, One Battle After Another, and Avatar 3 on the IMAX screen.',
      tip: 'If you are seeing two movies in the same day, watch the one in IMAX second.',
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
        'This is one of the most storied theaters in Nashville along with the Grand Ole Opry. Located on Lower Broadway, it is super easy to get to from other Nashville attractions. They offer tours and host shows, so you should be able to find something you like.',
      tip: 'Not just for music, they also do comedy shows and other acts!',
      image: ryman,
      alt: 'Ryman Auditorium',
      directionsLink: 'https://maps.google.com/?q=Ryman+Auditorium',
      cost: 2,
      websiteLink: 'https://www.ryman.com',
      tags: ['downtown', 'indoors', 'history', 'music', 'arts'],
    },
    {
      label: 'Tennessee State Capitol',
      details:
        'This is the center of Tennessee! They give free tours on weekdays (check their website for times) and it sits on a super cool hill with a great view of the city. Also, the grave of James K. Polk and his family is on the actual grounds and you can walk right up to it.',
      tip: 'For a workout, try to run up the massive hill!',
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
        "This is a super cool museum that is completely free! Museums aren't really Aspen's thing, but Ben loves this one. His favorite artifact is the quill that James K. Polk used to annex Texas.",
      tip: 'There are lots of mini theaters playing videos throughout the museum if you need to take a break from standing.',
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
        "The Parthenon is truly stunning with its massive size and architecture. It also houses a museum and rotating art exhibit inside, which Ben really likes. Aspen doesn't care for the museum too much, but it is where they filmed part of the first Percy Jackson movie, which she does find very cool.",
      tip: 'Bring a student/teacher ID for a discount.',
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
        'This is elevated Southern comfort food with farm-to-table ingredients. They are famous for their weekend brunch buffet and handcrafted cocktails. Ben had an incredible Kale salad here surprisingly enough.',
      tip: "Don't split the bill with coworkers who order lots of drinks.",
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
        "This is a massive food hall in downtown with 30+ vendors. There is something for everyone, from Nashville hot chicken to sushi to tacos. We always make a stop here when we are on Lower Broadway, especially at Jeni's Ice Cream for Ben.",
      tip: "Don't go to Prince's. Hattie B's is better, no matter what anyone says.",
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
        "One of just 3 michelin-starred restaurants in Nashville, Bastion is an intimate 24-seat restaurant with a creative tasting menu, and the cocktail bar next door is also allegedly excellent. We have never been here and probably won't be anytime soon (it is pricey!). However, several people we know claim it as the best restaurant in the city, and it is in a really fun neighborhood.",
      tip: 'If you just go to the bar (not the restaurant), they actually do serve nachos.',
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
        "This is Texas-style BBQ, but not truly Texan (we don't think they have smokers). Regardless, the owners are from Texas and the food is really good. Why doesn't every BBQ place serve their food with tortillas instead of white bread? They also have some more creative entrees beyond straight barbecue.",
      tip: 'Order a large queso!',
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
        "This place is close to us, so we go a lot. Their nachos are incredible, and we really don't order anything else. It is one of the best price-to-portion meals in Nashville if you order the nachos.",
      tip: 'You can order way more than their "suggested" amount of toppings.',
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
        'This is what fast food was made for. They are open very late (until 5am), super cheap for the amount of food, and while it is not high quality, it feels like a cultural experience to try at 3am.',
      tip: 'Swap out your drink for a milkshake for free!',
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
        'This is definitely the most popular pizza place among people we know. They serve Detroit-style pizza with crispy, cheesy edges. There are lots of locations around Nashville, but we usually go to the one in Germantown.',
      tip: 'They are good with dietary restrictions if you have any (gluten-free and dairy-free pizza available).',
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
        'This is a small spot with really neat vibes, right by the Cumberland River in a very cool part of Germantown. They have an incredible fish sandwich.',
      tip: 'Try to get a reservation even if it is not required. They have very limited seating.',
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
        'This is our favorite bar in Nashville! There is lots of seating and it stays open quite late despite not being near a busy area. The drinks are on the expensive side, but the atmosphere is incredible. It is literally in a greenhouse with tons of plants everywhere!',
      tip: 'The only way to get here is to drive, so plan your way home.',
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
        "This is the most iconic restaurant in Nashville. It is often compared to Prince's, but Ben doesn't really think it is a competition (supposedly that is what the tourists and transplants all think though, not the Nashville natives). There are lots of locations, including one in Assembly Food Hall.",
      tip: 'If getting tenders, order a kids meal and then ask for additional tenders. It saves like $4 for the same meal.',
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
        'This place has a really cool atmosphere and sits at the border of East Nashville and downtown. It is great for sharing food, so you can just order lots of small plates.',
      tip: 'Get the Curry Roti. It is so good.',
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
        'This is our most visited restaurant in Nashville. Ben has ranked almost every sandwich here, so ask him for his list. Aspen tends to just get the chicken parm sandwich, but recently has preferred the turkey and cheese. They have nice outdoor seating and a super fun market inside (not just food). The whole place is decorated top to bottom with Italian-American paraphernalia.',
      tip: 'You can park in their lot and validate inside.',
      image: littleHats,
      alt: 'Little Hats Deli',
      directionsLink: 'https://maps.google.com/?q=Little+Hats+Deli+Nashville',
      cost: 2,
      websiteLink: 'https://www.littlehatsmarket.com',
      tags: ['germantown', 'casual', 'italian', 'parking'],
    },
    {
      label: 'Oku',
      details:
        'We had our first anniversary in Nashville here! It is the best sushi we have had in the city, with the best service we have ever experienced at a restaurant. It is in Germantown, close to other bars and the Cumberland River.',
      tip: 'Tell them you have a special occasion in your reservation!',
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
        'This spot has free moonshine tastings and beer inside the Yee-Haw Brewery, which it shares a space with. There are lots of activities like cornhole and live music outside, plus several food vendors. It has really chill vibes and is a fun place to hang out.',
      tip: "Don't go to the taco vendors. They aren't as good as in Texas.",
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
        'This is our favorite pizza in Nashville. It is near Vanderbilt and serves classic, New York-style pizza by the slice.',
      tip: 'They have a slightly hidden outdoor seating area.',
      image: pizzaPerfect,
      alt: 'Pizza Perfect',
      directionsLink: 'https://maps.google.com/?q=Pizza+Perfect+Nashville',
      cost: 1,
      websiteLink: 'https://www.pizzaperfectonline.com',
      tags: ['midtown', 'casual', 'pizza', 'late-night'],
    },
  ],
};

// Auto-sort all categories alphabetically by label
Object.keys(data).forEach((key) => {
  data[key as PlaceCategory].sort((a, b) => a.label.localeCompare(b.label));
});
