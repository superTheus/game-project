import styled from 'styled-components';
import colors from '../utils/colors';

interface LifeProps {
  text: string;
  life: number;
}

type StyleProps = {
  percent: number;
}

export default function Life(LifeProps: LifeProps) {
  return (
    <Container>
      <Text>{LifeProps.text}</Text>
      <Cont percent={LifeProps.life} />
      <Percent> {LifeProps.life}% </Percent>
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Montserrat', sans-serif;
`;

const Text = styled.p`
  text-align: center;
  color: ${colors.gray};
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 400;
`;

const Cont = styled.div<StyleProps>`
  width: ${props => `calc((400px * ${props.percent}) / 100)`};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.percent >= 50 ? colors.green : props.percent > 20 && props.percent < 50 ? colors.yellow : colors.red}
`;

const Percent = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.black};
  background-color: transparent;
  position: relative;
  top: -40px;
  color: ${colors.white};
  font-weight: 600;
  text-shadow: 0.1em 0.1em 0.2em black;
`;