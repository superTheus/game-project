import styled from "styled-components";
import colors from "../utils/colors";
import { LogType } from "../utils/types";

type StyleProps = {
  color: string;
  type: "flex-end" | "flex-start";
}

export default function Log({ text, color, type }: LogType) {
  return (
    <Container color={color} type={type === "player" ? 'flex-start' : 'flex-end'}>
      {text}
    </Container>
  );
}

const Container = styled.div<StyleProps>`
  width: 80%;
  height: 30px;
  margin: 10px auto;
  padding: 0px 20px;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: ${props => props.type};
  font-weight: 600;
  color: ${colors.white}
`;