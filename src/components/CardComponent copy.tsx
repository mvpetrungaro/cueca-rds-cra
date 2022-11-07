import { Card } from "../models/Card";
import { getAlbumLayout, getTypeLayout } from "../services/cards.service";

type CardComponentProps = { card: Card };

export default function CardComponent({ card }: CardComponentProps) {
  const albumPrimaryColor = getAlbumLayout(card.album)?.primaryColor;
  const albumSecondaryColor = getAlbumLayout(card.album)?.secondaryColor;
  const albumAbilityColor = getAlbumLayout(card.album)?.abilityColor;
  const typeColor = getTypeLayout(card.type)?.color;

  return (
    <div
      style={{
        width: 316,
        position: "relative",
      }}
    >
      <div
        className="flex"
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#32bcef",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <div
          className="flex-1 text-center self-center text-white font-bold text-4xl italic"
          style={{
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          {card.energy}
        </div>
      </div>
      <div
        className="flex"
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#fc3ca4",
          borderBottomRightRadius: "8px",
          position: "absolute",
          zIndex: 1,
          top: 60,
        }}
      >
        <div
          className="flex-1 text-center self-center text-white font-bold text-4xl italic"
          style={{
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          {card.power}
        </div>
      </div>

      <div
        style={{
          width: 316,
          border: `6px solid ${albumSecondaryColor}`,
          borderRadius: "8px",
          backgroundColor: albumPrimaryColor,
        }}
      >
        <div
          style={{
            border: `2px solid ${typeColor}`,
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <div
            className="flex"
            style={{
              width: 60,
              height: 60,
              backgroundColor: typeColor,
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              position: "absolute",
              right: 20,
            }}
          >
            <div className="flex-1 text-center self-center font-semibold text-sm uppercase">
              {card.type}
            </div>
          </div>
          <div
            style={{
              border: `6px solid ${albumSecondaryColor}`,
              borderRadius: "8px",
            }}
          >
            <img
              src={`https://cdn-virttrade-assets-eucalyptus.cloud.virttrade.com/filekey/${card.img.substring(
                0,
                2
              )}/${card.img.substring(2, 4)}/${card.img.substring(4)}`} //_q
              alt={card.name}
              width={300}
              style={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
            <div
              style={{
                position: "relative",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <img
                src={`https://cdn-virttrade-assets-eucalyptus.cloud.virttrade.com/filekey/${card.collectionImage.substring(
                  0,
                  2
                )}/${card.collectionImage.substring(
                  2,
                  4
                )}/${card.collectionImage.substring(4)}`} //_q
                alt={card.name}
                width={60}
                style={{
                  position: "absolute",
                  margin: "auto",
                  left: 0,
                  right: 0,
                  top: -30,
                }}
              />
              <div
                className="text-gray-500 font-semibold"
                style={{
                  position: "absolute",
                  right: 0,
                }}
              >
                {card.code}
              </div>
            </div>
            <div
              id="innerCanvas"
              className="flex"
              style={{
                height: 70,
                backgroundColor: albumPrimaryColor,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <span className="text-white font-bold text-3xl flex-1 text-center self-end">
                {card.name}
              </span>
            </div>
          </div>
        </div>
        <div
          id="outerCanvas"
          className="flex flex-col justify-center"
          style={{
            height: 90,
            border: `6px solid ${typeColor}`,
            borderRadius: 8,
            backgroundColor: albumAbilityColor,
          }}
        >
          <div className="text-md font-semibold text-center">
            {card.abilityTitle}
          </div>
          <div className="text-md text-center">{card.ability}</div>
        </div>
      </div>
    </div>
  );
}
