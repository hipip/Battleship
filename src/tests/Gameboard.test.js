import Gameboard from "../classes/Gameboard.js";

test("Horizontal out of bounds ship placement", () => {
  const g = new Gameboard();
  expect(g.canPlaceShip("Carrier", true, 0, 8)).toBe(false);
});

test("Vertical out of bounds ship placement", () => {
  const g = new Gameboard();
  expect(g.canPlaceShip("Carrier", false, 8, 0)).toBe(false);
});

test("Valid Horizontal Ship Placement", () => {
  const g = new Gameboard();
  expect(g.canPlaceShip("Carrier", true, 5, 0)).toBe(true);
});

test("Valid Vertical Ship Placement", () => {
  const g = new Gameboard();
  expect(g.canPlaceShip("Battleship", false, 5, 0)).toBe(true);
});

test("isEmpty function false Test", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  for (let j = 0; j < 5; j++) expect(g.isEmpty(0, j)).toBe(false);
});

test("isEmpty function truthy Test", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  for (let j = 5; j < 10; j++) expect(g.isEmpty(0, j)).toBe(true);
});

test("hasShip function truthy test", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  for (let j = 0; j < 5; j++) expect(g.hasShip(0, j)).toBe(true);
});

test("hasShip function false test", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  for (let j = 5; j < 10; j++) expect(g.hasShip(0, j)).toBe(false);
});
