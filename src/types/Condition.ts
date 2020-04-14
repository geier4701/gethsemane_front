export default class Condition {
  id: number | null;
  name: string;
  atLeast: number;
  atMost: number;
  target: string;
  ammunitionType: string | null;
  componentName: string | null;

  constructor(
    id: number | null,
    name: string,
    atLeast: number,
    atMost: number,
    target: string,
    ammunitionType: string,
    componentName: string
  ) {
    this.id = id;
    this.name = name;
    this.atLeast = atLeast;
    this.atMost = atMost;
    this.target = target;
    this.ammunitionType = ammunitionType;
    this.componentName = componentName;
  }
}
