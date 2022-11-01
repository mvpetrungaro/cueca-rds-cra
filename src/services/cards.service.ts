import { Card } from "../models/Card";

export async function getCards(): Promise<Card[]> {
  return await (await fetch("http://localhost:3001/cards")).json();
}
