import React from 'react';
import styled from 'styled-components';
import Typed from 'typed.js';

import colors from '../utils/colors';

interface typedInterface {
  current: {}
}

export default function Rules() {

  React.useEffect(() => {

    const html = `
      <p> Você quer saber as Regras ? </p>
      
      <p className='mb-2'>Pois Então...</p> 

      <ol>
        <li> O jogo é feito por turnos, uma para o Jogador e outro para o Monstro </li>
        <li> Só é possível fazer uma Jogada por Turno </li>
        <li> O Jogador pode usar o Ataque básico que tira ponto aleatório de 5 à 10 </li>
        <li> O Jogador pode usar o Ataque Especial que tira ponto aleatório de 10 à 20 podendo ser usado à cada 2 turnos </li>
        <li> O Jogador pode usar o Curar que recupera pontos aleatório de 5 à 15 </li>
        <li> O Monstro pode usar o Ataque básico que tira ponto aleatório de 6 à 12 </li>
        <li> O Monstro pode usar o Ataque Especial que tira ponto aleatório de 8 à 16 podendo ser usado à cada 3 turnos </li>
      </ol>
      
      <p className='mt-2'>E isso é tudo...</p>
      `;

    const options = {
      strings: [
        html,
      ],
      typeSpeed: 30,
      backSpeed: 30,
      showCursor: false,
    };

    // elRef refers to the <span> rendered below
    const typed = new Typed('.typed', options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.destroy();
    }
  }, [])

  return (
    <Container className="container">
      <RankingContainer className="card">
        <h1 className="mt-2 text-center"> REGRAS </h1>
        <div className='typed text-white px-5 d-flex flex-column justify-content-start'></div>
      </RankingContainer>
      <a href="/" className="btn btn-danger mt-2"> VOLTAR </a>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RankingContainer = styled.div`
  width: 60%;
  height: 85vh;
  border-radius: 5px;
  background-color: ${colors.pink};
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