export default class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = 0;
  }

  hit() {
    if (!this.isSunk()) this.hits++;
  }

  isSunk() {
    return this.hits === this.size;
  }

  toString() {
    return this.name;
  }
}
