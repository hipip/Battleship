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

test("receive Attack Truthy test", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  expect(g.receiveAttack(0, 0)).toBe(true);
});

test("receive Attack false test", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  g.receiveAttack(0, 0);
  expect(g.receiveAttack(0, 0)).toBe(false);
});

test("Ship hit count", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  g.receiveAttack(0, 0);
  expect(g.fleet.Carrier.hits).toBe(1);
});

test("Ship isSunk function test (truthy)", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  for (let j = 0; j < 5; j++) g.receiveAttack(0, j);
  expect(g.isShipSunk("Carrier")).toBe(true);
});

test("Ship isSunk function test (falsy)", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  g.receiveAttack(0, 0);
  expect(g.isShipSunk("Carrier")).toBe(false);
});

test("all Ships Sunk function test (truthy)", () => {
  const g = new Gameboard();
  g.placeShip("Carrier", true, 0, 0);
  g.placeShip("Battleship", true, 1, 0);
  g.placeShip("Destroyer", true, 2, 0);
  g.placeShip("Submarine", true, 3, 0);
  g.placeShip("patrolBoat", true, 4, 0);

  for (let j = 0; j < 5; j++) g.receiveAttack(0, j); // Carrier
  for (let j = 0; j < 4; j++) g.receiveAttack(1, j); // Battleship
  for (let j = 0; j < 3; j++) g.receiveAttack(2, j); // Destroyer
  for (let j = 0; j < 3; j++) g.receiveAttack(3, j); // Submarine
  for (let j = 0; j < 2; j++) g.receiveAttack(4, j); // patrolBoat

  expect(g.allShipsSunk()).toBe(true);
});
