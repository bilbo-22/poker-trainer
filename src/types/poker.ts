import { CardCode } from '../utils/cards';

export interface PokerHand {
    ID: number;
    position: string;
    condition: string;
    hand: string | number;
    suit: string;
    action: string;
    cardCodes?: CardCode[];  // Add this line
}