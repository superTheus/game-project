import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import api from '../../api';
import Button from '../../components/Button';
import Life from '../../components/Life';
import List from '../../components/List';
import { Load } from '../../components/Load';
import {
  GetContEspecialMonster,
  GetContEspecialPlayer,
  getLifeMonster,
  getLifePlayer,
  GetTurn,
  SaveContEspecialMonster,
  SaveContEspecialPlayer,
  SaveTurn,
  SetLifeMonster,
  SetLifePlayer
} from '../../storage/storage';
import colors from '../../utils/colors';
import { LogType } from '../../utils/types';
import { Buttons, ButtonsArea, Container, LifeArea, LogArea, TextButton } from './styles';

export default function Game() {
  const [playerLife, setPlayerLife] = useState(100);
  const [monsterLife, setMonsterLife] = useState(100);
  const [load, setLoad] = useState(true);

  const [namePlayer, setNamePlayer] = useState('Player');

  const [controlSpecialPlayer, setControlSpecialPlayer] = useState(0);
  const [controlSpecialMonster, setControlSpecialMonster] = useState(0);

  const [Logs, setLogs] = useState<LogType[]>([]);

  async function savePoint(score: number) {
    const response = await api.post("/ranking", {
      "playerName": namePlayer,
      "score": Math.floor(score)
    });

    if (response.status == 201)
      return true;
  }

  async function atack(type: 'player' | 'monster') {
    if (type === 'player') {
      await atackPlayer();
    } else {
      await atackMonster();
    }
  }

  async function atackMonster() {
    var value = Math.floor(Math.random() * (12 - 6) + 6);
    await savePlayer(value, false);
    addLog({
      color: colors.pink,
      text: `Monstro atacou Jogador  (-${value})`,
      type: 'monster'
    });
  }

  async function atackPlayer() {
    var value = Math.floor(Math.random() * (10 - 5) + 5);
    await saveMonster(value, false);
    addLog({
      color: colors.blue,
      text: `Jogador atacou Monstro  (-${value})`,
      type: 'player'
    });
  }

  async function especialAtack(type: 'player' | 'monster') {
    if (type === 'player') {
      await especialAtackPlayer();
    } else {
      await especialAtackMonster();
    }
  }

  async function especialAtackPlayer() {
    var value = Math.floor(Math.random() * 10 + 10);
    await saveMonster(value, true);

    addLog({
      color: colors.red,
      text: `Jogador atacou fortemente o Monstro  (-${value})`,
      type: 'player'
    });
  }

  async function especialAtackMonster() {
    var value = Math.floor(Math.random() * 8 + 8);
    await savePlayer(value, true);
    addLog({
      color: colors.gray,
      text: `Monstro atacou fortemente o Jogador  (-${value})`,
      type: 'monster'
    });
  }

  async function heal() {
    var value = Math.floor(Math.random() * 10 + 5);

    if (playerLife + value > 100) {
      value = 100 - playerLife;
    }

    await savePlayer(-1 * value, false);

    addLog({
      color: colors.green,
      text: `Jogador usou a cura  (+${value})`,
      type: 'player'
    });
  }

  function giveUp() {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      html: `
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h3> Tem certeza de que deseja desistir ? </h3>
        </div>
      `,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: colors.red,

      showConfirmButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.green
    }).then((response) => {
      if (response.isConfirmed) {
        window.location.href = '/';
      };
    });
  }

  function addLog(value: LogType) {
    var AUX = Logs;
    AUX.unshift(value);
    setLogs(AUX);
  }

  function stun() {
    let value = Math.floor((Math.random() * 10) + 1);
    if (value >= 6) {
      return true;
    } else {
      return false
    }
  }

  async function turnPlayer(action: 'ataque' | 'especial' | 'curar' | 'desistir') {
    var stunRandom = false;
    switch (action) {
      case 'ataque':
        await atack('player');
        break;
      case 'especial':
        await especialAtack('player');
        stunRandom = stun();
        break;
      case 'curar':
        await heal();
        break;
      case 'desistir':
        giveUp();
        break;
      default:
        break;
    }

    await saveTurnCurrent();

    const lifeMonster = await getLifeMonster();
    if (action != 'desistir' && lifeMonster > 0) {
      if (stunRandom) {
        turnMonster('atordoar');
      } else {
        turnMonster(controlSpecialMonster > 3 ? 'especial' : 'ataque');
      }
    }
  }

  async function turnMonster(action: 'ataque' | 'especial' | 'atordoar') {
    await saveTurnCurrent();
    setTimeout(() => {
      switch (action) {
        case 'ataque':
          atack('monster');
          break;
        case 'especial':
          especialAtack('monster');
          break;
        case 'atordoar':
          addLog({
            color: colors.red,
            text: 'Monstro ficou Atordoado',
            type: 'monster'
          });
          break;
        default:
          break;
      }
    }, 500);
  }

  async function savePlayer(value: number, isEspecial: boolean) {
    const lifePlayer: number = await getLifePlayer();
    if (lifePlayer - value <= 0) {
      value = lifePlayer;
      loseGame();
    }
    const newLife = await SetLifePlayer(lifePlayer - value);
    setPlayerLife(newLife);

    if (isEspecial) {
      setControlSpecialMonster(await SaveContEspecialMonster(0));
    }
  }

  async function saveMonster(value: number, isEspecial: boolean) {
    const lifeMonster: number = await getLifeMonster();
    if (lifeMonster - value <= 0) {
      value = lifeMonster;
    }
    const newLife = await SetLifeMonster(lifeMonster - value);
    setMonsterLife(newLife);

    if (isEspecial) {
      setControlSpecialPlayer(await SaveContEspecialPlayer(0));
    }
  }

  async function saveTurnCurrent() {
    const Turn = await GetTurn();
    await SaveTurn(Turn + 1);

    const ContPlayer = await GetContEspecialPlayer();
    setControlSpecialPlayer(await SaveContEspecialPlayer(ContPlayer + 1))

    const ContMonster = await GetContEspecialMonster();
    setControlSpecialMonster(await SaveContEspecialMonster(ContMonster + 1))

  }

  async function endGame() {
    const Turn = await GetTurn();
    const PointPlayer = await getLifePlayer();

    var pointFinal = (PointPlayer * 1000) / Turn;

    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: 'Parab??ns voc?? derrotou o monstro',
      text: `Sua pontua????o foi: ${Math.floor(pointFinal)}`,

      showConfirmButton: true,
      confirmButtonText: "Terminar",
      confirmButtonColor: colors.green,
      backdrop: false,
    }).then(async (response) => {
      if (await savePoint(pointFinal)) {
        if (response.isConfirmed) {
          window.location.href = '/';
        };
      };
    });
  }

  async function InitGame() {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: 'Diga seu Nome',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '15',
      },
      inputPlaceholder: 'Seu Nome',
      inputValidator: result => !result ? 'Voc?? precisa inserir um nome' : '',
      showConfirmButton: true,
      confirmButtonText: "Salvar",
      confirmButtonColor: colors.green,
      backdrop: false,
      allowEscapeKey: false,
    }).then((response) => {
      if (response.value.length) {
        setNamePlayer(response.value);
        setLoad(false);
      }
    });
  }

  async function loseGame() {
    const Turn = await GetTurn();
    const PointPlayer = await getLifePlayer();

    var pointFinal = (PointPlayer * 1000) / Turn

    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: 'Voc?? perdeu para o monstro!!!',
      text: `Sua pontua????o foi: ${Math.floor(pointFinal)}`,

      showCancelButton: true,
      cancelButtonText: "Terminar",
      cancelButtonColor: colors.red,

      showConfirmButton: true,
      confirmButtonText: "Recome??ar",
      confirmButtonColor: colors.green,
      backdrop: false,
    }).then((response) => {
      if (response.isConfirmed) {
        window.location.href = '/game';
      } else {
        window.location.href = '/';
      };
    });
  }

  useEffect(() => {
    if (monsterLife == 0) {
      endGame();
    }
  }, [monsterLife]);

  useEffect(() => {
    SaveTurn(0);
    SetLifePlayer(100);
    SetLifeMonster(100);
    SaveContEspecialPlayer(0);
    SaveContEspecialMonster(0);
    InitGame();
  }, []);

  if (load)
    return <Load />

  return (
    <Container>
      <LifeArea>
        <Life text={namePlayer} life={playerLife} />
        <Life text='Monster' life={monsterLife} />
      </LifeArea>
      <ButtonsArea>
        <TextButton>Comandos</TextButton>
        <Buttons>
          <Button
            action='ataque'
            text='Ataque'
            color={colors.blue}
            function={turnPlayer}
          />
          <Button
            action='especial'
            text='Ataque Especial'
            color={colors.red}
            disabled={controlSpecialPlayer > 2 ? false : true}
            function={turnPlayer}
          />
          <Button
            action='curar'
            text='Curar'
            color={colors.green}
            function={turnPlayer}
            disabled={playerLife < 100 ? false : true}
          />
          <Button
            action='desistir'
            text='Desistir'
            color={colors.purple}
            function={turnPlayer}
          />
        </Buttons>
      </ButtonsArea>
      <LogArea>
        <TextButton>Logs</TextButton>
        <List LogsArray={Logs} />
      </LogArea>
    </Container>
  );
}