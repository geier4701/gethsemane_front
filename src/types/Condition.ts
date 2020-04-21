export default class Condition {
  id: number | null;
  name: string;
  atLeast: number | null;
  atMost: number | null;
  target: string;
  ammunitionType: string | null;
  componentName: string | null;

  constructor(
    id: number | null,
    name: string,
    atLeast: number | null = null,
    atMost: number | null = null,
    target: string,
    ammunitionType: string | null = null,
    componentName: string | null = null
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
