import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [cardsFound, setCardsFound] = useState([]);

  function handleSearchValueChange(e: any) {
    setSearchValue(e.target.value);
  }

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
              return <li>card.name</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
