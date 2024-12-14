import Gameboard from "./classes/Gameboard.js";
import SetupBoard from "./components/SetupBoard.js";
import { Title } from "./components/Titles.js";

const BODY = document.body;
BODY.appendChild(Title("BATTLESHIP"));
BODY.appendChild(SetupBoard());
