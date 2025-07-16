import { Card } from "../models/Card";

type AlbumLayout = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  abilityColor: string;
};

type TypeLayout = {
  name: string;
  color: string;
  backgroundColor: string;
};

type Layout = {
  albums: AlbumLayout[];
  types: TypeLayout[];
};

const layout: Layout = {
  albums: [
    {
      name: "arts",
      primaryColor: "#c12266",
      secondaryColor: "#e06796",
      abilityColor: "#ff83dd",
    },
    {
      name: "exp",
      primaryColor: "#4b2909",
      secondaryColor: "#4b2909",
      abilityColor: "#ffdd42",
    },
    {
      name: "lol",
      primaryColor: "#143010",
      secondaryColor: "#143010",
      abilityColor: "#a6ff57",
    },
    {
      name: "sea",
      primaryColor: "#001839",
      secondaryColor: "#001839",
      abilityColor: "#4ec7fe",
    },
    {
      name: "pal",
      primaryColor: "#7e4633",
      secondaryColor: "#7e4633",
      abilityColor: "#fe7b12",
    },
    {
      name: "sci",
      primaryColor: "#022e29",
      secondaryColor: "#022e29",
      abilityColor: "#21d677",
    },
    {
      name: "spa",
      primaryColor: "#521c95",
      secondaryColor: "#6920b8",
      abilityColor: "#f633f3",
    },
  ],
  types: [
    {
      name: "common",
      color: "black",
      backgroundColor: "black",
    },
    {
      name: "rare",
      color: "white",
      backgroundColor: "#ad5712",
    },
    {
      name: "epic",
      color: "white",
      backgroundColor: "#909390",
    },
    {
      name: "legendary",
      color: "black",
      backgroundColor: "#d9b42f",
    },
    {
      name: "mythic",
      color: "black",
      backgroundColor: "#ba7806",
    },
  ],
};

export function getAlbumLayout(album: string): AlbumLayout | undefined {
  return layout.albums.find((a) => a.name === album.toLowerCase());
}

export function getTypeLayout(type: string): TypeLayout | undefined {
  return layout.types.find((a) => a.name === type.toLowerCase());
}

export async function getCards(): Promise<Card[]> {
  return await (await fetch("http://localhost:3001/cards")).json();
}

export async function postCard(card: Card) {
  const cardToPersist = {id: card.code.toLowerCase(), ...card}

  console.log(cardToPersist)

  let res = await fetch("http://localhost:3001/cards", {
    body: JSON.stringify(cardToPersist),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw Error('Failed to add card')
  }

  const json = await res.json()

  console.log(json)
}

export const types = layout.types
