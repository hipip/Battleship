import Gameboard from "./classes/Gameboard.js";
import SetupBoard from "./components/SetupBoard.js";
import { Title } from "./components/Titles.js";

const BODY = document.body;
const humanGameBoard = new Gameboard();
const computerGameBoard = new Gameboard();
computerGameBoard.placeShipsRandomly();
console.log(computerGameBoard.toString());
BODY.appendChild(Title("BATTLESHIP"));
BODY.appendChild(SetupBoard(humanGameBoard));
