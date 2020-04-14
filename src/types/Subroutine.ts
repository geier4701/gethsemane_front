import Condition from "./Condition";
import Action from "./Action";

export default class Subroutine {
  id: number | null;
  priority: number;
  conditions: Array<Condition>;
  actions: Array<Action>;

  constructor(
    id: number | null,
    priority: number,
    conditions: Array<Condition>,
    actions: Array<Action>
  ) {
    this.id = id;
    this.priority = priority;
    this.conditions = conditions;
    this.actions = actions;
  }
}
