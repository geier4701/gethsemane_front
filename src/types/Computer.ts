export default class Computer {
  id: number;
  name: string;
  mass: number;
  repairCost: number;
  speed: number;
  capacity: number;

  constructor(
    id: number,
    name: string,
    mass: number,
    repairCost: number,
    energyCost: number,
    speed: number,
    capacity: number
  ) {
    this.id = id;
    this.name = name;
    this.mass = mass;
    this.repairCost = repairCost;
    this.speed = speed;
    this.capacity = capacity;
  }
}
