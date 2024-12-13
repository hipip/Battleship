import Ship from "./Ship.js";

export default class Ships {
  static createCarrier() {
    return new Ship("Carrier", 5);
  }

  static createBattleship() {
    return new Ship("Battleship", 4);
  }

  static createDestroyer() {
    return new Ship("Destroyer", 3);
  }

  static createSubmarine() {
    return new Ship("Submarine", 3);
  }

  static createPatrolBoat() {
    return new Ship("PatrolBoat", 2);
  }
}
