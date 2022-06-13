
export const SaveTurn = async (turn: number) => {
  await localStorage.setItem('@turns', String(turn));
  return turn;
}

export const GetTurn = async () => {
  const turnLocal = await localStorage.getItem('@turns');
  return Number(turnLocal);
}

export const SetLifePlayer = async (value: number) => {
  await localStorage.setItem('@lifePlayer', String(value));
  return value;
}

export const getLifePlayer = async () => {
  const value = await localStorage.getItem('@lifePlayer');
  return Number(value);
}

export const SetLifeMonster = async (value: number) => {
  await localStorage.setItem('@lifeMonster', String(value));
  return value;
}

export const getLifeMonster = async () => {
  const value = await localStorage.getItem('@lifeMonster');
  return Number(value);
}

export const SaveContEspecialPlayer = async (value: number) => {
  await localStorage.setItem('@contEspecialPlayer', String(value));
  return value;
}

export const GetContEspecialPlayer = async () => {
  const Cont = await localStorage.getItem('@contEspecialPlayer');
  return Number(Cont);
}

export const SaveContEspecialMonster = async (value: number) => {
  await localStorage.setItem('@contEspecialMonster', String(value));
  return value;
}

export const GetContEspecialMonster = async () => {
  const Cont = await localStorage.getItem('@contEspecialMonster');
  return Number(Cont);
}