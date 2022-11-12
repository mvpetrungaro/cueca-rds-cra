import { Card } from "../models/Card";
import { getAlbumLayout, getTypeLayout } from "../services/cards.service";

type CardComponentProps = { card: Card };

export default function CardComponent({ card }: CardComponentProps) {
  const limited = card.type.toLowerCase().includes("limited");
  const cardType = card.type.toLowerCase().replace("limited", "").trim();

  const albumPrimaryColor = getAlbumLayout(card.albumCode)?.primaryColor;
  const albumSecondaryColor = getAlbumLayout(card.albumCode)?.secondaryColor;
  const albumAbilityColor = getAlbumLayout(card.albumCode)?.abilityColor;
  const typeColor = getTypeLayout(cardType)?.color;
  const typeBackgroundColor = getTypeLayout(cardType)?.backgroundColor;

  return (
    <div
      style={{
        width: 300,
        position: "relative",
      }}
    >
      <div
        className="flex"
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#32bcef",
          borderTopLeftRadius: 18,
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
          borderBottomRightRadius: 18,
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
      {cardType !== "common" && (
        <div
          className="flex"
          style={{
            width: 60,
            height: 60,
            backgroundColor: typeBackgroundColor,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            position: "absolute",
            right: 20,
          }}
        >
          <div
            className="flex-1 text-center self-center font-semibold uppercase"
            style={{
              fontSize: "80%",
              color: typeBackgroundColor,
              textShadow:
                "white -1px 0px, white 0px 1px, white 1px 0px, white 0px -1px",
              fontWeight: 900,
              fontStyle: "italic",
            }}
          >
            {cardType}
          </div>
        </div>
      )}
      <div
        style={{
          backgroundColor: typeBackgroundColor,
          border: `4px solid ${typeBackgroundColor}`,
          borderRadius: 18,
        }}
      >
        <div
          style={{
            border: `4px solid ${albumSecondaryColor}`,
            borderRadius: 18,
            backgroundColor: albumSecondaryColor,
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
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            }}
          />
          <div
            style={{
              position: "relative",
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            }}
          >
            {!!limited && (
              <svg
                style={{
                  position: "absolute",
                  margin: "auto",
                  left: 0,
                  right: 0,
                  top: -100,
                  width: 100,
                  height: 100,
                }}
              >
                <path
                  id="curve"
                  d="M 0 100 A 1 1 0 0 1 100 100"
                  style={{ fill: albumAbilityColor }}
                />
                <text
                  x="85"
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  style={{ fill: "white" }}
                >
                  <textPath xlinkHref="#curve">Limited</textPath>
                </text>
              </svg>
            )}
            <img
              src={`https://cdn-virttrade-assets-eucalyptus.cloud.virttrade.com/filekey/${card.collectionImage.substring(
                0,
                2
              )}/${card.collectionImage.substring(
                2,
                4
              )}/${card.collectionImage.substring(4)}`} //_q
              alt={card.name}
              style={{
                position: "absolute",
                margin: "auto",
                left: 0,
                right: 0,
                top: -30,
                width: 60,
                height: 60,
              }}
            />
            <div
              className="text-gray-500 font-semibold mr-1"
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              {card.code}
            </div>
          </div>
          <div
            className="flex flex-col"
            style={{
              height: 140,
              backgroundColor: albumPrimaryColor,
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
            }}
          >
            <div className="text-white font-bold text-2xl flex-1 text-center flex">
              <div className="flex-1 text-center self-end mb-1 uppercase">
                {card.name}
              </div>
            </div>
            <div
              className="flex flex-col justify-center m-1"
              style={{
                borderRadius: 12,
                backgroundColor: albumAbilityColor,
              }}
            >
              <div className="text-md font-semibold text-center">
                {card.abilityTitle}
              </div>
              <div className="text-xs text-center">{card.ability}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
