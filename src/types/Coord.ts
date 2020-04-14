import GraphPoints from "./GraphPoints";

export default class Coord {
  location: GraphPoints;
  speed: GraphPoints;

  constructor(location: GraphPoints, speed: GraphPoints) {
    this.location = location;
    this.speed = speed;
  }
}
