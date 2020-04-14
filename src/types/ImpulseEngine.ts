export default class ImpulseEngine {
  id: number;
  name: string;
  mass: number;
  repairCost: number;
  energyCost: number;
  maxAccel: number;

  constructor(
    id: number,
    name: string,
    mass: number,
    repairCost: number,
    energyCost: number,
    maxAccel: number
  ) {
    this.id = id;
    this.name = name;
    this.mass = mass;
    this.repairCost = repairCost;
    this.energyCost = energyCost;
    this.maxAccel = maxAccel;
  }
}
