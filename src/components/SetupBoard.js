import Gameboard from "../classes/Gameboard.js";
import { Subtitle } from "./Titles.js";

/**
 *
 * @param {Gameboard} gameBoard
 * @returns
 */
const SetupBoard = (gameBoard) => {
  const cont = document.createElement("div");
  cont.className = "container";
  const board = document.createElement("div");
  board.className = "game-board";
  board.id = "setup-board";

  const div = document.createElement("div");
  div.className = "flex row center";
  const orientationBtn = document.createElement("button");
  orientationBtn.type = "button";
  orientationBtn.textContent = "Horizontal ⟲";
  orientationBtn.id = "orientation-btn";

  orientationBtn.onclick = () => {
    orientationBtn.textContent =
      orientationBtn.textContent === "Horizontal ⟲"
        ? "Vertical ⟲"
        : "Horizontal ⟲";
  };

  let shipCount = 0;
  let currentShip = Object.values(gameBoard.fleet)[shipCount];
  let currentShipSize = currentShip.size;
  let subTitle = Subtitle(`Place ${currentShip.name}`);

  const Cell = (i, j) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.setAttribute("i", i);
    cell.setAttribute("j", j);

    cell.onmouseenter = () => {
      const isHorizontal = orientationBtn.textContent === "Horizontal ⟲";
      if (gameBoard.canPlaceShip(currentShip.name, isHorizontal, i, j)) {
        cell.classList.add("hover");

        if (isHorizontal) {
          for (let k = j; k < j + currentShipSize; k++) {
            document
              .querySelectorAll(`.cell[i="${i}"][j="${k}"]`)
              .forEach((c) => c.classList.add("hover"));
          }
        } else {
          for (let k = i; k < i + currentShipSize; k++) {
            document
              .querySelectorAll(`.cell[i="${k}"][j="${j}"]`)
              .forEach((c) => c.classList.add("hover"));
          }
        }
      }
    };

    cell.onmouseleave = () => {
      document
        .querySelectorAll(".cell.hover")
        .forEach((c) => c.classList.remove("hover"));
    };

    cell.onclick = () => {
      const isHorizontal = orientationBtn.textContent === "Horizontal ⟲";
      if (gameBoard.canPlaceShip(currentShip.name, isHorizontal, i, j)) {
        gameBoard.placeShip(currentShip.name, isHorizontal, i, j);
        console.log(gameBoard.toString());
        if (isHorizontal) {
          for (let k = j; k < j + currentShipSize; k++) {
            document
              .querySelectorAll(`.cell[i="${i}"][j="${k}"]`)
              .forEach((c) => c.classList.add("ship"));
          }
        } else {
          for (let k = i; k < i + currentShipSize; k++) {
            document
              .querySelectorAll(`.cell[i="${k}"][j="${j}"]`)
              .forEach((c) => c.classList.add("ship"));
          }
        }
        shipCount++;
        if (shipCount > 4) {
          console.log("now game must start");
        }
        currentShip = Object.values(gameBoard.fleet)[shipCount];
        currentShipSize = currentShip.size;
        subTitle.setTextContent(`Place ${currentShip.name}`);
      }
    };

    return cell;
  };

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.appendChild(Cell(i, j));
    }
  }

  div.appendChild(subTitle.element);
  div.appendChild(orientationBtn);

  cont.appendChild(div);
  cont.appendChild(board);
  return cont;
};

export default SetupBoard;
