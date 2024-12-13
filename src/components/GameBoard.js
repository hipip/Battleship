const GameBoard = (board) => {
  const cont = document.createElement("div");
  cont.className = "cont";
  const board = document.createElement("div");
  board.className = "game-board";

  const Cell = (i, j) => {
    const cell = document.createElement("cell");
    cell.className = "cell";
    cell.setAttribute("i", i);
    cell.setAttribute("j", j);

    return cell;
  };

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      cont.appendChild(Cell(i, j));
    }
  }

  return cont;
};

export default GameBoard;
