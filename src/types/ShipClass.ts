export default class ShipClass {
  id: number;
  name: string;
  weight: number;
  powerGen: number;
  batteryMax: number;
  health: number;

  constructor(
    id: number,
    name: string,
    weight: number,
    powerGen: number,
    batteryMax: number,
    health: number
  ) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.powerGen = powerGen;
    this.batteryMax = batteryMax;
    this.health = health;
  }
}
