import styled from "styled-components";
import colors from "../../utils/colors";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const Menu = styled.nav`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const Link = styled.a`
  font-family: 'Montserrat', sans-serif;
  color: ${colors.black};
`

export const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: ${colors.black};
`

export const List = styled.ul`
  list-style: none;
`