export default class JumpDrive {
  id: number;
  name: string;
  mass: number;
  repairCost: number;
  energyCost: number;

  constructor(
    id: number,
    name: string,
    mass: number,
    repairCost: number,
    energyCost: number
  ) {
    this.id = id;
    this.name = name;
    this.mass = mass;
    this.repairCost = repairCost;
    this.energyCost = energyCost;
  }
}
