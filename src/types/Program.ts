import Subroutine from "./Subroutine";

export default class Program {
  id: number | null;
  name: string;
  subroutines: Array<Subroutine>;

  constructor(id: number | null, name: string, subroutines: Array<Subroutine>) {
    this.id = id;
    this.name = name;
    this.subroutines = subroutines;
  }
}
