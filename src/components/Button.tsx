import styled from 'styled-components';
import colors from '../utils/colors';

interface ButtonProps {
  text: string;
  color: string;
  action: 'ataque' | 'especial' | 'curar' | 'desistir';
  disabled?: boolean;
  function: (action: 'ataque' | 'especial' | 'curar' | 'desistir') => void;
}

type ButtonStyle = {
  backgroundColor: string;
  disabled?: boolean;
}

export default function Button(ButtonProps: ButtonProps) {
  return (
    <Conatiner onClick={() => ButtonProps.function(ButtonProps.action)} backgroundColor={ButtonProps.color} disabled={ButtonProps.disabled} >
      {ButtonProps.text}
    </Conatiner>
  );
}

const Conatiner = styled.button<ButtonStyle>`
  width: 250px;
  height: 30px;
  background-color: ${props => props.backgroundColor};
  font-size: 20px;
  color: ${colors.white};
  border: 1px solid ${colors.gray};
  opacity: ${props => props.disabled ? '0.6' : '1'};
  &:hover { 
    cursor: pointer;
  }
`;