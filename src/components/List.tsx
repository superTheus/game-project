import styled from "styled-components";
import { LogType } from "../utils/types";
import Log from "./Log";

interface ListProps {
  LogsArray: LogType[];
}

export default function List({ LogsArray }: ListProps) {
  return (
    <ListStyles>
      {
        LogsArray.map((item: LogType, index: number) =>
          <li key={index}>
            <Log color={item.color} type={item.type} text={item.text} />
          </li>
        )
      }
    </ListStyles>
  );
}

const ListStyles = styled.ul`
  list-style: none;
`;