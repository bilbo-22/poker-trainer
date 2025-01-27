// Import all card images
const cardImages = {
  // Clubs
  '2c': '/src/assets/cards/2_of_clubs.svg',
  '3c': '/src/assets/cards/3_of_clubs.svg',
  '4c': '/src/assets/cards/4_of_clubs.svg',
  '5c': '/src/assets/cards/5_of_clubs.svg',
  '6c': '/src/assets/cards/6_of_clubs.svg',
  '7c': '/src/assets/cards/7_of_clubs.svg',
  '8c': '/src/assets/cards/8_of_clubs.svg',
  '9c': '/src/assets/cards/9_of_clubs.svg',
  'Tc': '/src/assets/cards/10_of_clubs.svg',
  'Jc': '/src/assets/cards/jack_of_clubs2.svg',
  'Qc': '/src/assets/cards/queen_of_clubs2.svg',
  'Kc': '/src/assets/cards/king_of_clubs2.svg',
  'Ac': '/src/assets/cards/ace_of_clubs.svg',

  // Diamonds
  '2d': '/src/assets/cards/2_of_diamonds.svg',
  '3d': '/src/assets/cards/3_of_diamonds.svg',
  '4d': '/src/assets/cards/4_of_diamonds.svg',
  '5d': '/src/assets/cards/5_of_diamonds.svg',
  '6d': '/src/assets/cards/6_of_diamonds.svg',
  '7d': '/src/assets/cards/7_of_diamonds.svg',
  '8d': '/src/assets/cards/8_of_diamonds.svg',
  '9d': '/src/assets/cards/9_of_diamonds.svg',
  'Td': '/src/assets/cards/10_of_diamonds.svg',
  'Jd': '/src/assets/cards/jack_of_diamonds2.svg',
  'Qd': '/src/assets/cards/queen_of_diamonds2.svg',
  'Kd': '/src/assets/cards/king_of_diamonds2.svg',
  'Ad': '/src/assets/cards/ace_of_diamonds.svg',

  // Hearts
  '2h': '/src/assets/cards/2_of_hearts.svg',
  '3h': '/src/assets/cards/3_of_hearts.svg',
  '4h': '/src/assets/cards/4_of_hearts.svg',
  '5h': '/src/assets/cards/5_of_hearts.svg',
  '6h': '/src/assets/cards/6_of_hearts.svg',
  '7h': '/src/assets/cards/7_of_hearts.svg',
  '8h': '/src/assets/cards/8_of_hearts.svg',
  '9h': '/src/assets/cards/9_of_hearts.svg',
  'Th': '/src/assets/cards/10_of_hearts.svg',
  'Jh': '/src/assets/cards/jack_of_hearts2.svg',
  'Qh': '/src/assets/cards/queen_of_hearts2.svg',
  'Kh': '/src/assets/cards/king_of_hearts2.svg',
  'Ah': '/src/assets/cards/ace_of_hearts.svg',

  // Spades
  '2s': '/src/assets/cards/2_of_spades.svg',
  '3s': '/src/assets/cards/3_of_spades.svg',
  '4s': '/src/assets/cards/4_of_spades.svg',
  '5s': '/src/assets/cards/5_of_spades.svg',
  '6s': '/src/assets/cards/6_of_spades.svg',
  '7s': '/src/assets/cards/7_of_spades.svg',
  '8s': '/src/assets/cards/8_of_spades.svg',
  '9s': '/src/assets/cards/9_of_spades.svg',
  'Ts': '/src/assets/cards/10_of_spades.svg',
  'Js': '/src/assets/cards/jack_of_spades2.svg',
  'Qs': '/src/assets/cards/queen_of_spades2.svg',
  'Ks': '/src/assets/cards/king_of_spades2.svg',
  'As': '/src/assets/cards/ace_of_spades.svg',
};

export type CardCode = keyof typeof cardImages;

export const getCardImage = (card: CardCode): string => {
  const image = cardImages[card];
  if (!image) {
    console.error(`Card not found: ${card}`);  // Log the missing card
    throw new Error(`Card image not found for code: ${card}`);
  }
  return image;
};