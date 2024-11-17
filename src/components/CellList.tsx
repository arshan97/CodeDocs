import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";

const CellList = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    const { order, data } = cells;
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
