import Ships from "../classes/Ships.js";

function sinkShip(ship, hits) {
  for (let i = 0; i < hits; i++) {
    ship.hit();
  }
}

test("Carrier sinks after 5 hits", () => {
  const Carrier = Ships.createCarrier();
  sinkShip(Carrier, 5);
  expect(Carrier.isSunk()).toBe(true);
});

test("Battleship sinks after 4 hits", () => {
  const Battleship = Ships.createBattleship();
  sinkShip(Battleship, 4);
  expect(Battleship.isSunk()).toBe(true);
});

test("Destroyer sinks after 3 hits", () => {
  const Destroyer = Ships.createDestroyer();
  sinkShip(Destroyer, 3);
  expect(Destroyer.isSunk()).toBe(true);
});

test("Submarine sinks after 3 hits", () => {
  const Submarine = Ships.createSubmarine();
  sinkShip(Submarine, 3);
  expect(Submarine.isSunk()).toBe(true);
});

test("Patrol Boat sinks after 2 hits", () => {
  const PatrolBoat = Ships.createPatrolBoat();
  sinkShip(PatrolBoat, 2);
  expect(PatrolBoat.isSunk()).toBe(true);
});
