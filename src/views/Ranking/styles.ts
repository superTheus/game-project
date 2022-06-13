import styled from "styled-components";
import colors from "../../utils/colors";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RankingContainer = styled.div`
  width: 60%;
  height: 85vh;
  border-radius: 5px;
  background-color: ${colors.pink};
  align-items: center;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;               /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: ${colors.pink};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray};
    border-radius: 20px;
  }
`;
