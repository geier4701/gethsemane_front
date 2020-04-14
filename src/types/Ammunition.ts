export default class Ammunition {
  id: number;
  name: string;
  mass: number;
  repairCost: number;
  damageType: string;
  ammunitionType: string;
  maxAmmunition: number;

  constructor(
    id: number,
    name: string,
    mass: number,
    repairCost: number,
    damageType: string,
    ammunitionType: string,
    maxAmmunition: number
  ) {
    this.id = id;
    this.name = name;
    this.mass = mass;
    this.repairCost = repairCost;
    this.damageType = damageType;
    this.ammunitionType = ammunitionType;
    this.maxAmmunition = maxAmmunition;
  }
}
