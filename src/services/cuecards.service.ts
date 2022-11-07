import { Card } from "../models/Card";

export async function findCardByCode(code: string): Promise<Card> {
  const card = await (
    await fetch(
      `https://cors-anywhere.herokuapp.com/https://eucalyptus-production-master-services-us.cloud.virttrade.com/rest/album/card/detail/${code}`
    )
  ).json();

  if (!card?.code) {
    throw Error("Card not found");
  }

  return card;
}
