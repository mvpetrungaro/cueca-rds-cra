import { useState, useEffect } from "react";
import { Card } from "../models/Card";
import { getCards } from "../services/cards.service";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [cardsFound, setCardsFound] = useState<Card[]>([]);

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

  console.log(cardsFound);

  return (
    <div>
      <div>
        <label htmlFor="inputCardsSearch">Search for a card:</label>
        <input
          type="text"
          id="inputCardsSearch"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
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
