import Coord from "./Coord";

export default class Action {
  id: number | null;
  name: string;
  targetComponentName: string | null;
  velocityChange: Coord | null;
  distanceFromEnemy: number | null;

  constructor(
    id: number | null,
    name: string,
    targetComponentName: string | null,
    velocityChange: Coord | null,
    distanceFromEnemy: number | null
  ) {
    this.id = id;
    this.name = name;
    this.targetComponentName = targetComponentName;
    this.velocityChange = velocityChange;
    this.distanceFromEnemy = distanceFromEnemy;
  }
}
