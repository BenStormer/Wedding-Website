export interface FaqEntry {
  question: string;
  answer: string;
}

export type FaqCategory =
  | 'rsvp'
  | 'travel'
  | 'venue'
  | 'ceremony_and_reception'
  | 'timeline'
  | 'gifts_and_registry';

export const faqData: Record<FaqCategory, FaqEntry[]> = {
  rsvp: [
    {
      question: 'When should I submit my RSVP?',
      answer: 'Please submit your RSVP before July 1, 2026.',
    },
    {
      question: 'How can I change my RSVP?',
      answer: 'You may update your response at any time by resubmitting the RSVP form using the button on this website\'s "Home" page.',
    },
    {
      question: 'Are plus-ones allowed?',
      answer: 'We have chosen to keep our wedding ceremony small and intimate, therefore we are not accomodating any plus-ones.',
    },
    {
      question: 'Will children be present?',
      answer: 'Only three children are included on our guest list, so you can expect a mostly adult-oriented celebration.',
    },
  ],
  travel: [
    {
      question: 'What airport should I fly into?',
      answer: 'Please fly into Nashville International Airport (BNA).',
    },
    {
      question: 'How do I get from the airport to my hotel?',
      answer: 'We suggest using a ride-share service like Uber or Lyft.',
    },
    {
      question: 'What will the weather be like?',
      answer: 'October in Nashville is typically mild and pleasant, with cooler mornings and evenings. It may also rain while you are visiting.',
    },
    {
      question: 'Where should I stay? Is there a hotel block?',
      answer: 'There is not a hotel block. Please see our "Visiting Nashville" page for hotel recommendations, but feel free to stay anywhere.',
    },
    {
      question: 'What is there to do in Nashville?',
      answer: 'Tons! Please see our "Visiting Nashville" page for some of Aspen and Ben\'s favorite things to do.',
    },
  ],
  venue: [
    {
      question: 'Where is the venue?',
      answer: 'The ceremony and reception will both take place at the Noah Liff Opera Center, located at 3622 Redmon Street. Please find the entrance shown in the photo on the "Details" page of this website. You will need to drive towards the back of the property to find it.',
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, there is plenty of free parking available. The lot can partially be seen in the photo on the "Details" page of this website.',
    },
    {
      question: 'Will the venue be indoors or outdoors?',
      answer: 'The entire event will be held indoors.',
    },
    {
      question: 'Will the entire venue be available to guests?',
      answer: 'The downstairs lobby and Ragsdale lobby will be available. Off-limits areas will be clearly marked.',
    },
    {
      question: 'Are there multiple floors? If so, will an elevator be available?',
      answer: 'Yes, the event will take place across two floors. An elevator (or stairs) will be available and restrooms are located on both floors.'
    }
  ],
  ceremony_and_reception: [
    {
      question: 'Is there a dress code?',
      answer: 'Please wear semi-formal attire that you can comfortably dance in.',
    },
    {
      question: 'Can I take photos during the ceremony?',
      answer: 'We ask that phones be kept away during the ceremony so everyone can be fully present. After that, snap away! We would love to see your photos from the celebration.',
    },
    {
      question: 'Can I take photos during the reception?',
      answer: 'Absolutely! We encourage you to take photos and share them with us.',
    },
    {
      question: 'Can I post any photos I take? Should I wait before posting?',
      answer: 'Feel free to post any photos you take at any time!',
    },
    {
      question: 'Will there be alcohol?',
      answer: 'Yes! We will be serving beer, wine, and signature bride-and-groom cocktails.',
    },
    {
      question: 'Will there be dancing?',
      answer: 'Yes, come ready to bust a move!',
    },
    {
      question: 'What food will be served?',
      answer: 'We will have a full dinner catered by Mission BBQ.',
    },
    {
      question: 'What if I have dietary restrictions?',
      answer: 'Please reach out to us before July 1, 2026 so that we can accomodate your needs.',
    },
  ],
  timeline: [
    {
      question: 'What time is the ceremony?',
      answer: 'The ceremony will begin at 4:30 PM.',
    },
    {
      question: 'What time should I arrive?',
      answer: 'Please plan to arrive at least 15 minutes early (4:15 PM).',
    },
    {
      question: 'What time should I plan on leaving?',
      answer: 'We will wrap up everything by 10:00 PM.',
    },
    {
      question: 'Will there be a gap between the ceremony and reception?',
      answer: 'Yes, we will host a cocktail hour while the ceremony space is transitioned for the reception.',
    },
  ],
  gifts_and_registry: [
    {
      question: 'I\'m interested in getting a gift, do you have a registry?',
      answer: 'We don\'t expect gifts from anyone; your presence is enough! However, you can visit the "Registry" page on this website if you would like to get us a gift.',
    },
    {
      question: 'How does the registry work?',
      answer: 'We have listed items we would like on the "Registry" page of this website with links to purchase. If you do get something, please click the "I Got This" button and fill out the form. This way we know who to thank and no one else purchases the same item.',
    },
    {
      question: 'Do we need to use the purchase link provided?',
      answer: 'No! Feel free to get the specific gift from wherever you like, the link is just provided for convienence. However, please try to match the item specifics if purchasing from elsewhere.',
    },
    {
      question: 'Why are you asking for my name on the "Registry" page?',
      answer: 'We are using your name to track gifts and ensure we can properly thank you!',
    },
    {
      question: 'Should I bring the gift to the wedding or send it directly to you?',
      answer: 'You are welcome to bring the gift to the wedding. If travelling with items is inconvenient, please feel free to reach out to us for our address.',
    },
    {
      question: 'Will you accept cash or monetary gifts?',
      answer: 'Yes! If you prefer to give cash instead of getting an item from the registry we appreciate it all the same.',
    },
  ],
};

export const categoryLabels: Record<FaqCategory, string> = {
  rsvp: 'RSVP',
  travel: 'Travel & Accomodations',
  venue: 'Venue',
  ceremony_and_reception: 'Ceremony & Reception',
  timeline: 'Timeline',
  gifts_and_registry: 'Gifts & Registry',
};

export const categoryOrder: FaqCategory[] = [
  'rsvp',
  'travel',
  'venue',
  'ceremony_and_reception',
  'timeline',
  'gifts_and_registry',
];
