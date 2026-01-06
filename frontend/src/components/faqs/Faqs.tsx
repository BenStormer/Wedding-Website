export interface FaqEntry {
  question: string;
  answer: string;
}

export type FaqCategory =
  | 'general'
  | 'venue'
  | 'ceremony'
  | 'accommodations'
  | 'gifts';

export const faqData: Record<FaqCategory, FaqEntry[]> = {
  general: [
    {
      question: 'When is the wedding?',
      answer:
        'Our wedding will be held on October 11, 2026. The ceremony begins at 4:00 PM.',
    },
    {
      question: 'What is the dress code?',
      answer:
        'Semi-formal attire is requested. Think cocktail dresses, dressy separates, or suits. Please dress comfortably but elegantly!',
    },
    {
      question: 'Can I bring a plus one?',
      answer:
        'Due to venue capacity, we can only accommodate guests named on the invitation. Please refer to your invitation for details.',
    },
    {
      question: 'Are children welcome?',
      answer:
        'While we love your little ones, our wedding will be an adult-only celebration. We hope this gives you a chance to enjoy a night out!',
    },
  ],
  venue: [
    {
      question: 'Where is the wedding?',
      answer:
        "The ceremony and reception will both be held at the Noah Liff Opera Center in Nashville, TN. It's located in the Sylvan Park neighborhood, about 15 minutes from downtown.",
    },
    {
      question: 'Is there parking available?',
      answer:
        'Yes! There is free parking available on-site. We still encourage carpooling if possible.',
    },
    {
      question: 'Will the wedding be indoors or outdoors?',
      answer:
        'The entire event will be held indoors, so no need to worry about the weather!',
    },
  ],
  ceremony: [
    {
      question: 'What time should I arrive?',
      answer:
        'We recommend arriving 15-20 minutes before the ceremony starts at 4:00 PM to find parking and get settled.',
    },
    {
      question: 'Can I take photos during the ceremony?',
      answer:
        "We kindly ask that you keep phones and cameras away during the ceremony so everyone can be fully present. We'll have a professional photographer capturing the moment! After the ceremony, snap away!",
    },
  ],
  accommodations: [
    {
      question: 'Are there hotels nearby?',
      answer:
        'Yes! Check out our "Visiting Nashville" page for hotel recommendations in various price ranges and neighborhoods.',
    },
    {
      question: 'Will there be transportation provided?',
      answer:
        'Transportation will not be provided, so please plan accordingly. Rideshare services like Uber and Lyft are readily available in Nashville.',
    },
  ],
  gifts: [
    {
      question: 'Do you have a registry?',
      answer:
        "Yes! You can find our registry on our website. Your presence is the greatest gift, but if you'd like to give something, we'd be grateful for contributions to our honeymoon fund or items from our registry.",
    },
    {
      question: 'Can I bring a gift to the wedding?',
      answer:
        'We kindly ask that gifts be shipped directly to us rather than brought to the venue. This helps us avoid any mix-ups on the big day!',
    },
  ],
};

export const categoryLabels: Record<FaqCategory, string> = {
  general: 'General',
  venue: 'Venue & Parking',
  ceremony: 'Ceremony',
  accommodations: 'Travel & Accommodations',
  gifts: 'Gifts & Registry',
};

export const categoryOrder: FaqCategory[] = [
  'general',
  'venue',
  'ceremony',
  'accommodations',
  'gifts',
];
