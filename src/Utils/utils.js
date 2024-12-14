import GamePage from "../pages/GamePage.js";

const startGame = (humanGameBoard, computerGameBoard) => {
  const container = document.querySelector(".container");
  container.classList.add("disappear");
  container.addEventListener("animationend", () => {
    container.remove();
    document.body.appendChild(GamePage(humanGameBoard, computerGameBoard));
  });
};

const random = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

export { startGame, random };
