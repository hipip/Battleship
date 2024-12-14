import Ships from "./Ships.js";
import { random } from "../Utils/utils.js";

/**
 * The gameboard class has a matrix of 10 x 10
 * The values of the cells of the matrix can be
 * - 0 : means empty spot can be hit or be used to placed a Ship
 * - String containg the name of the ship
 * - -1 : means it has been hit but missed because there is no Ship
 * - +1 : A ship has been hit
 */
export default class Gameboard {
  /**
   * Initializes the gameboard with a matrix of size 10 x 10 filled with zeros
   * and initializes the ships
   */
  constructor() {
    this.mat = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.fleet = {
      Carrier: Ships.createCarrier(),
      Battleship: Ships.createBattleship(),
      Destroyer: Ships.createDestroyer(),
      Submarine: Ships.createSubmarine(),
      PatrolBoat: Ships.createPatrolBoat(),
    };
  }

  /**
   *
   * @param {Number} i
   * @param {Number} j
   * @param {Number|String} value
   */
  setCell(i, j, value) {
    this.mat[i][j] = value;
  }

  /**
   *
   * @param {Number} i
   * @param {Number} j
   * @returns {Number|String}
   */
  getCell(i, j) {
    return this.mat[i][j];
  }

  /**
   *
   * @param {Number} i the row index
   * @param {Number} j the column index
   * @returns {Boolean} True if the cell is empty
   */
  isEmpty(i, j) {
    return this.getCell(i, j) === 0;
  }

  /**
   *
   * @param {Number} i
   * @param {Number} j
   * @returns {Boolean} true if the specified cell has a ship in it
   */
  hasShip(i, j) {
    return typeof this.getCell(i, j) === "string";
  }

  /**
   * Returns Cells that are empty or that has a ship in them
   */
  getEmptyCells() {
    const res = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.isEmpty(i, j) || this.hasShip(i, j)) res.push([i, j]);
      }
    }
    return res;
  }

  /**
   *
   * @param {String} shipName
   * @param {Boolean} isHorizontal
   * @param {Number} i
   * @param {Number} j
   * @returns
   */
  canPlaceShip(shipName, isHorizontal, i, j) {
    const shipSize = this.fleet[shipName].size;

    if (isHorizontal) {
      if (j + shipSize > 10) return false;
      for (let k = j; k < j + shipSize; k++) {
        if (!this.isEmpty(i, k)) return false;
      }
    } else {
      if (i + shipSize > 10) return false;
      for (let k = i; k < i + shipSize; k++) {
        if (!this.isEmpty(k, j)) return false;
      }
    }
    return true;
  }

  /**
   *
   * @param {String} shipName the name of the ship to be placed
   * @param {Boolean} isHorizontal is the shape gonna be placed horizontally or vertically
   * @param {Number} ithe starting line index
   * @param {Number} j the starting column index
   * @returns {Boolean} true if the ship has been placed correctly, false otherwise
   */
  placeShip(shipName, isHorizontal, i, j) {
    if (!this.canPlaceShip(shipName, isHorizontal, i, j)) return false;

    const shipSize = this.fleet[shipName].size;

    if (isHorizontal) {
      for (let k = j; k < j + shipSize; k++) {
        this.setCell(i, k, shipName);
      }
    } else {
      for (let k = i; k < i + shipSize; k++) {
        this.setCell(k, j, shipName);
      }
    }

    return true;
  }

  /**
   *
   * @param {Number} i
   * @param {Number} j
   * @returns {Boolean}
   */
  receiveAttack(i, j) {
    if (this.isEmpty(i, j)) {
      this.setCell(i, j, -1);
      return true;
    } else if (this.hasShip(i, j)) {
      const shipName = this.getCell(i, j);
      const ship = this.fleet[shipName];
      ship.hit();
      this.setCell(i, j, +1);
      return true;
    }
    return false;
  }

  /**
   * @return {Boolean} true if all ships has sunk
   */
  allShipsSunk() {
    return Object.values(this.fleet).every((ship) => ship.isSunk());
  }

  /**
   *
   * @param {String} shipName
   * @returns {Boolean} true if the specified ship has sunk
   */
  isShipSunk(shipName) {
    return this.fleet[shipName].isSunk();
  }

  /**
   * Places the ship randomly, used for creating the board for the computer player
   */
  placeShipsRandomly() {
    for (const Ship in this.fleet) {
      while (true) {
        const [randomI, randomJ] = [random(0, 9), random(0, 9)];
        const isHorizontal = random(0, 100) > 50;
        if (this.placeShip(Ship, isHorizontal, randomI, randomJ)) break;
      }
    }
  }

  /**
   * Reset function used to re-play game
   */
  reset() {
    this.mat = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.fleet = {
      Carrier: Ships.createCarrier(),
      Battleship: Ships.createBattleship(),
      Destroyer: Ships.createDestroyer(),
      Submarine: Ships.createSubmarine(),
      PatrolBoat: Ships.createPatrolBoat(),
    };
  }

  toString() {
    return this.mat.map((row) => row.join(" ")).join("\n");
  }
}
