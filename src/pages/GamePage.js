import { random } from "../Utils/utils.js";
import { Subtitle } from "../components/Titles.js";

const GamePage = (humanGameBoard, computerGameBoard) => {
  const page = document.createElement("div");
  page.className = "game-page";
  const cont = document.createElement("div");
  cont.className = "boards-container";
  const subTitle = Subtitle("Let the Game begin");

  const gameBoard = (isHuman) => {
    const board = document.createElement("div");
    board.className = "game-board";
    board.id = isHuman ? "human-board" : "computer-board";

    const Cell = (i, j) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("i", i);
      cell.setAttribute("j", j);

      if (!isHuman) {
        cell.onclick = () => {
          if (
            computerGameBoard.isEmpty(i, j) ||
            computerGameBoard.hasShip(i, j)
          ) {
            computerGameBoard.receiveAttack(i, j);
            const box = computerGameBoard.getCell(i, j);
            if (box === 1) {
              cell.classList.add("hit");
              subTitle.setTextContent("It's a hit !");
            } else if (box === -1) {
              cell.classList.add("miss");
              subTitle.setTextContent("It's a miss!");
            }
            if (computerGameBoard.allShipsSunk()) {
              alert("Human is the winner");
            }
            const humanEmptyCells = humanGameBoard.getEmptyCells();
            const computerMove =
              humanEmptyCells[random(0, humanEmptyCells.length - 1)];
            const [randI, randJ] = computerMove;
            const cellUI = document.querySelector(
              `#human-board .cell[i="${randI}"][j="${randJ}"]`
            );
            cellUI.click();
            if (humanGameBoard.allShipsSunk()) {
              alert("Computer is the winner");
            }
          }
        };
      } else {
        if (humanGameBoard.hasShip(i, j)) {
          cell.classList.add("ship");
        }
        cell.onclick = () => {
          humanGameBoard.receiveAttack(i, j);
          const cellState = humanGameBoard.getCell(i, j);
          if (cellState === 1) {
            cell.classList.add("hit");
            cell.classList.remove("ship");
          } else if (cellState === -1) {
            cell.classList.add("miss");
            cell.classList.remove("ship");
          }
        };
      }

      return cell;
    };

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board.appendChild(Cell(i, j));
      }
    }
    return board;
  };

  cont.appendChild(gameBoard(true));
  cont.appendChild(gameBoard(false));
  page.appendChild(cont);
  page.appendChild(subTitle.element);

  return page;
};

export default GamePage;
