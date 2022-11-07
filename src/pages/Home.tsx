import { useState, useEffect } from 'react'
import { Card } from '../models/Card'
import { getCards } from '../services/cards.service'
import { findCardByCode } from '../services/cuecards.service'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [cardFound, setCardFound] = useState<Card | null>(null)
  const [cardsFound, setCardsFound] = useState<Card[]>([])

  useEffect(() => {
    ;(async () => {
      if (!searchValue) {
        const cards = await getCards()
        setCardsFound(cards)
      }
    })()
  }, [searchValue])

  function handleSearchValueChange(e: any) {
    setSearchValue(e.target.value)
  }

  async function searchCard() {
    const card = await findCardByCode(searchValue)

    setCardFound(card)
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
        {cardFound && (
          <div className="m-2">
            <h3>{cardFound.name}</h3>
            <img
              src={`https://cdn-virttrade-assets-eucalyptus.cloud.virttrade.com/filekey/${cardFound.img.substring(
                0,
                2
              )}/${cardFound.img.substring(2, 4)}/${cardFound.img.substring(
                4
              )}_q`}
              alt={cardFound.name}
            />
          </div>
        )}
      </div>
      {!!cardsFound?.length && (
        <div>
          <ul>
            {cardsFound.map((card) => {
              return <li key={card.code}>{card.ability}</li>
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
