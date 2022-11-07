import { useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";
import { Card } from "../models/Card";
import { getCards } from "../services/cards.service";
import { findCardByCode } from "../services/cuecards.service";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [cardFound, setCardFound] = useState<Card | null>(null);
  const [cardsFound, setCardsFound] = useState<Card[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      if (!searchValue) {
        const cards = await getCards();
        setCardsFound(cards);
      }
    })();
  }, [searchValue]);

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
          <div className="m-2">
            <h3>{cardFound.name}</h3>
            <CardComponent card={cardFound} />
          </div>
        )}
      </div>
      {!!cardsFound?.length && (
        <div>
          <ul>
            {cardsFound.map((card) => {
              return <li key={card.code}>{card.ability}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
