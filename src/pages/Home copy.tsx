import { useState, useEffect } from "react";
import { Card } from "../models/Card";
import { getCards } from "../services/cards.service";
import { findCardByCode } from "../services/cuecards.service";

const spaceDescFillColor = "#f633f3";
const spaceBorderColor = "#6920b8";
const mythicColor = "#ba7806";

const spaceImgStyle = {
  border: "4px solid #6920b8",
};

const spaceCardStyle = {
  border: "4px solid #6920b8",
  borderRadius: "8px",
  width: "300px",
  boxSizing: "content-box",
};

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [cardFound, setCardFound] = useState<Card | null>(null);
  const [cardsFound, setCardsFound] = useState<Card[]>([]);

  useEffect(() => {
    (async () => {
      if (!searchValue) {
        const cards = await getCards();
        setCardsFound(cards);
      }
    })();
  }, [searchValue]);

  useEffect(() => {
    const innerCanvas: any = document.getElementById("innerCanvas");

    if (innerCanvas) {
      let ctx = innerCanvas.getContext("2d");

      ctx.clearRect(0, 0, innerCanvas.width, innerCanvas.height);

      ctx.strokeStyle = mythicColor;
      ctx.fillStyle = spaceBorderColor;

      ctx.beginPath();
      ctx.rect(0, 0, 296, 70);
      ctx.stroke();
      ctx.fill();
    }

    const canvas: any = document.getElementById("canvas");

    if (canvas) {
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = spaceBorderColor;
      ctx.fillStyle = spaceDescFillColor;

      ctx.beginPath();
      ctx.rect(0, 0, 300, 100);
      ctx.stroke();
      ctx.fill();
    }
  });

  function handleSearchValueChange(e: any) {
    setSearchValue(e.target.value);
  }

  async function searchCard() {
    const card = await findCardByCode(searchValue);

    setCardFound(card);
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
            <div
              style={{
                border: "4px solid #6920b8",
                borderRadius: "8px",
                width: "300px",
                boxSizing: "content-box",
              }}
            >
              <div
                style={{
                  border: `2px solid ${mythicColor}`,
                  borderRadius: "8px",
                  boxSizing: "content-box",
                }}
              >
                <img
                  src={`https://cdn-virttrade-assets-eucalyptus.cloud.virttrade.com/filekey/${cardFound.img.substring(
                    0,
                    2
                  )}/${cardFound.img.substring(2, 4)}/${cardFound.img.substring(
                    4
                  )}`} //_q
                  alt={cardFound.name}
                  width={300}
                  style={spaceImgStyle}
                />
                <canvas id="innerCanvas" width="296" height="70" />
              </div>
              <canvas id="canvas" width="300" height="100" />
            </div>
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
