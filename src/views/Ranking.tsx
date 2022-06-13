import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import api from "../api";
import colors from "../utils/colors";
import { Players } from "../utils/types";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function Ranking() {

  const [playersRanking, setPlayersRanking] = useState<Players[]>([]);

  async function RankingsPlayers() {
    const response = await api.get("/ranking");
    
    if (response.status == 201) {
      if(response.data.length <= 0){
        warning();
      }

      var score = response.data

      score.sort((elementOne: Players, elementTwo: Players) => {
        if (elementOne.score < elementTwo.score)
          return 1;
        if (elementOne.score > elementTwo.score)
          return -1;
        
        return 0;
      });

      console.log(score);

      setPlayersRanking(score);
    }else{
      warning();
    }
  }

  async function warning() {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: 'Sem Ranking para mostrar',
      icon: 'info',

      showConfirmButton: true,
      confirmButtonText: "Voltar",
      confirmButtonColor: colors.red,
      backdrop: false,
    }).then((response) => {
      if (response.isConfirmed) {
        window.location.href = '/';
      };
    });
  }

  useEffect(() => {
    RankingsPlayers();
  }, []);


  return (
    <Container className="container">
      <RankingContainer className="card">
        <h1 className="mt-2"> RANKING </h1>
        <table className="table table-hover mt-2">
          <thead>
            <tr>
              <th className="text-center text-white"> Nome </th>
              <th className="text-center text-white"> Score </th>
              <th className="text-center text-white"> Data </th>
            </tr>
          </thead>
          <tbody>
            {
              playersRanking.map((element) => {
                return (
                  <tr key={element.id}>
                    <td className="text-center text-white"> {element.playerName} </td>
                    <td className="text-center text-white"> {element.score} </td>
                    <td className="text-center text-white"> {moment(element.data).format('DD/MM/YYYY, HH:mm:ss')} </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
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
