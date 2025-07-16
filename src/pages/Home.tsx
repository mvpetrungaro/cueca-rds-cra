import { useState, useEffect, useCallback } from "react";
import CardComponent from "../components/CardComponent";
import { Card } from "../models/Card";
import { postCard, getCards, types } from "../services/cards.service";
import { findCardByCode } from "../services/cuecards.service";

const albums = [
  "Arts & Culture",
  "History",
  "Science",
  "Life on Lands",
  "Oceans & Seas",
  "Space",
  "Paleontology",
];

const collections = [
  "Chinese Folclore",
  "Angela Maxwell's Walking the World",
  "Arthurian Legends",
];

type Filter = {
  types: string[];
  collections: string[];
  albums: string[];
  names: string[];
};

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [cardFound, setCardFound] = useState<Card | null>(null);
  const [cardsFound, setCardsFound] = useState<Card[]>([]);
  const [cardsSelected, setCardsSelected] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [error, setError] = useState("");

  const listCards = useCallback(async () => {
    if (!searchValue) {
      const cards = await getCards();
      setCardsFound(cards);
    }
  }, [searchValue]);

  useEffect(() => {
    (async () => await listCards())();
  }, [listCards]);

  useEffect(() => {
    setFilteredCards(cardsFound);
  }, [cardsFound]);

  useEffect(() => {
    let filter = {
      types: [],
      albums: [],
      collections: [],
      names: [],
    } as Filter;

    cardsSelected.forEach((c) => {
      let matches = c.ability.match(/<b>.+?<\/b>/g);
      console.log(matches);
      let references = matches?.map((m) =>
        m.replace("<b>", "").replace("</b>", "")
      );
      console.log(references);
      references?.forEach((r) => {
        let [typeMatched, albumMatched, collectionMatched] = [
          false,
          false,
          false,
        ];

        if (types.map((t) => t.name.toLowerCase()).includes(r.toLowerCase())) {
          filter.types.push(r.toLowerCase());
          typeMatched = true;
        }

        if (albums.map((a) => a.toLowerCase()).includes(r.toLowerCase())) {
          filter.albums.push(r.toLowerCase());
          albumMatched = true;
        }

        if (collections.map((c) => c.toLowerCase()).includes(r.toLowerCase())) {
          filter.collections.push(r.toLowerCase());
          collectionMatched = true;
        }

        if (![typeMatched, albumMatched, collectionMatched].includes(true)) {
          filter.names.push(r.toLowerCase());
        }
      });
    });

    console.log(filter);

    let cards = [...cardsFound];
    console.log(cards);

    cards = cards
      .filter((c) => {
        return (
          !filter.types.length ||
          cardsSelected.findIndex((s) => s.code === c.code) >= 0 ||
          filter.types.includes(
            c.type.toLowerCase().replace("limited", "").trim()
          )
        );
      })
      .filter((c) => {
        return (
          !filter.albums.length ||
          cardsSelected.findIndex((s) => s.code === c.code) >= 0 ||
          filter.albums.includes(c.album.toLowerCase().trim())
        );
      })
      .filter((c) => {
        return (
          !filter.collections.length ||
          cardsSelected.findIndex((s) => s.code === c.code) >= 0 ||
          filter.collections.includes(c.collection.toLowerCase().trim())
        );
      })
      .filter((c) => {
        return (
          !filter.names.length ||
          cardsSelected.findIndex((s) => s.code === c.code) >= 0 ||
          filter.names.includes(c.name.toLowerCase().trim())
        );
      });

    console.log(cards);

    setFilteredCards(cards);
  }, [cardsSelected, cardsFound]);

  function handleSearchValueChange(e: any) {
    setSearchValue(e.target.value);
  }

  async function searchCard() {
    const trimmedSearchValue = searchValue?.trim();
    setSearchValue(trimmedSearchValue);

    if (!trimmedSearchValue) {
      setCardFound(null);
      setError("");

      return;
    }

    try {
      const card = await findCardByCode(trimmedSearchValue);

      setCardFound(card);
      setError("");

      console.log(card);
    } catch (err: any) {
      setCardFound(null);
      setError(err.message);
    }
  }

  async function addCard(card: Card) {
    try {
      await postCard(card);

      setCardFound(null);
      setError("");

      await listCards();
    } catch (err: any) {
      setCardFound(null);
      setError(err.message);
    }
  }

  return (
    <div className="m-4">
      <div className="m-2">
        <div className="m-2">
          <label htmlFor="inputCardsSearch">Search for a card:</label>
          <input
            type="text"
            id="inputCardsSearch"
            value={searchValue}
            onChange={handleSearchValueChange}
            className="border border-black rounded m-2"
          />
          <button
            className="bg-blue-500 px-2 rounded text-white shadow-md shadow-blue-500"
            onClick={searchCard}
          >
            Go
          </button>
        </div>
        {error && (
          <div className="m-2">
            <h3>{error}</h3>
          </div>
        )}
        {cardFound && (
          <div className="m-2 w-fit">
            <h3>{cardFound.name}</h3>
            <CardComponent card={cardFound} />
            <button
              className="bg-green-500 px-2 rounded text-white shadow-md shadow-green-500 w-full"
              onClick={() => addCard(cardFound)}
            >
              Add
            </button>
          </div>
        )}
      </div>
      {!!filteredCards?.length && (
        <div>
          <ul className="flex flex-wrap justify-evenly gap-5">
            {filteredCards.map((card) => {
              return (
                <li key={card.code}>
                  <input
                    type="checkbox"
                    name="selectedCards"
                    checked={
                      !!cardsSelected.filter((c) => c.code === card.code).length
                    }
                    onChange={(e) => {
                      let cards = [...cardsSelected];

                      if (e.target.checked) {
                        cards.push(card);
                      } else {
                        cards = cards.filter((c) => c.code !== card.code);
                      }

                      setCardsSelected(cards);
                    }}
                  ></input>
                  <CardComponent card={card} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
