import { useEffect, useState } from "react";
import moment from "moment";

import api from "../../api";
import colors from "../../utils/colors";
import { Players } from "../../utils/types";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Container, RankingContainer } from "./styles";
import { Load } from "../../components/Load";

export default function Ranking() {

  const [load, setLoad] = useState(true);

  const [playersRanking, setPlayersRanking] = useState<Players[]>([]);

  async function RankingsPlayers() {
    try {
      const response = await api.get("/ranking");

      if (response.status == 201) {
        if (response.data.length <= 0) {
          warning('Sem Ranking para mostrar');
        }

        var score = response.data

        score.sort((elementOne: Players, elementTwo: Players) => {
          if (elementOne.score < elementTwo.score)
            return 1;
          if (elementOne.score > elementTwo.score)
            return -1;

          return 0;
        });

        setLoad(false);
        setPlayersRanking(score);
      } else {
        setLoad(false);
        warning('Falha na conexão com API');
      }
    }catch(e){
      setLoad(false);
      warning('Falha na conexão com API');
    }
  }

  async function warning(msg: string) {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: msg,
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

  if(load)
    return <Load />;

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