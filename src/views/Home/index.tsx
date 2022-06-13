import { Container, Link, Menu, Title } from "./styles";

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