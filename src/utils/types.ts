export type LogType = {
  text: string;
  color: string;
  type: "player" | "monster";
}

export type Players = {
  id: string,
  playerName: string,
  score: number,
  data: string
}