import styled from "styled-components";
import colors from "../../utils/colors";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const LifeArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const ButtonsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const TextButton = styled.div`
  text-align: center;
  color: ${colors.gray};
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 400;
`;

export const LogArea = styled.div`
  width: 100%;
  height: 50vh;
  max-height: 450px;
  overflow-y: scroll;
`;