export interface Card {
  id?: string;
  code: string;
  name: string;
  type: string;
  power: number;
  energy: number;
  abilityTitle: string;
  ability: string;
  abilityPlaintext: string;
  abilityPlaintextV2: string;
  collectionCode: string;
  collection: string;
  albumCode: string;
  album: string;
  cardImg: string;
  img: string;
  collectionImage: string;
  dyk: string;
  firstPull: number;
  modifiedDate: number;
  tradeIndex: number;
}
