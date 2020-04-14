export default class Radar {
  id: number;
  name: string;
  mass: number;
  repairCost: number;
  trackingStyle: string;
  energyCost: number;

  constructor(
    id: number,
    name: string,
    mass: number,
    repairCost: number,
    trackingStyle: string,
    energyCost: number
  ) {
    this.id = id;
    this.name = name;
    this.mass = mass;
    this.repairCost = repairCost;
    this.trackingStyle = trackingStyle;
    this.energyCost = energyCost;
  }
}
