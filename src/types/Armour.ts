export default class Armour {
  id: number;
  name: string;
  mass: number;
  repairCost: number;
  armourType: string;

  constructor(
    id: number,
    name: string,
    mass: number,
    repairCost: number,
    armourType: string
  ) {
    this.id = id;
    this.name = name;
    this.mass = mass;
    this.repairCost = repairCost;
    this.armourType = armourType;
  }
}
