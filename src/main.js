import Gameboard from "./classes/Gameboard.js";
import SetupBoard from "./components/SetupBoard.js";
import { Title } from "./components/Titles.js";

const BODY = document.body;
const humanGameBoard = new Gameboard();
BODY.appendChild(Title("BATTLESHIP"));
BODY.appendChild(SetupBoard(humanGameBoard));
