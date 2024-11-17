import { Fragment } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";

const CellList = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    const { order, data } = cells;
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      {/* <AddCell nextCellId={cell.id} /> */}
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <div className={cells.length === 0 ? "force-visible" : ""}>
        <AddCell nextCellId={null} />
      </div>
    </div>
  );
};

export default CellList;
