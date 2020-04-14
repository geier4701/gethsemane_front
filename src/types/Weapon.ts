export default class Weapon {
  id: number;
  name: string;
  mass: number;
  repairCost: number;
  energyCost: number;
  range: number;
  damage: number;
  ammunitionType: string;
  munitionVelocity: number;

  constructor(
    id: number,
    name: string,
    mass: number,
    repairCost: number,
    energyCost: number,
    range: number,
    damage: number,
    ammunitionType: string,
    munitionVelocity: number
  ) {
    this.id = id;
    this.name = name;
    this.mass = mass;
    this.repairCost = repairCost;
    this.energyCost = energyCost;
    this.range = range;
    this.damage = damage;
    this.ammunitionType = ammunitionType;
    this.munitionVelocity = munitionVelocity;
  }
}
