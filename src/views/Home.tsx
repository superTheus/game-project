import { ComponentType } from 'react';
import styled from 'styled-components';
import colors from '../utils/colors';

export default function home() {
  return (
    <Container>
      <Title> BEM VINDO AO JOGO </Title>
      <Menu>
        <Link className='link' href='/game'> INICIAR JOGO </Link>
        <Link className='link' href='/rules'> REGRAS </Link>
        <Link className='link' href='/ranking'> RANKING </Link>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Menu = styled.nav`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Link = styled.a`
  font-family: 'Montserrat', sans-serif;
  color: ${colors.black}
`

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: ${colors.black}
`

const List = styled.ul`
  list-style: none;
`