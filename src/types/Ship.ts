import Radar from "./Radar";
import JumpDrive from "./JumpDrive";
import ImpulseEngine from "./ImpulseEngine";
import Computer from "./Computer";
import Armour from "./Armour";
import ShipClass from "./ShipClass";
import Weapon from "./Weapon";
import Ammunition from "./Ammunition";
import Program from "./Program";

export default class Ship {
  id: number | null;
  name: string | null;
  radar: Radar | null;
  jumpDrive: JumpDrive | null;
  impulseEngine: ImpulseEngine | null;
  computer: Computer | null;
  armour: Armour | null;
  shipClass: ShipClass | null;
  weapons: Array<Weapon>;
  ammunitions: Array<Ammunition>;
  program: Program | null;

  constructor(
    id: number | null = null,
    name: string | null = null,
    radar: Radar | null = null,
    jumpDrive: JumpDrive | null = null,
    impulseEngine: ImpulseEngine | null = null,
    computer: Computer | null = null,
    armour: Armour | null = null,
    shipClass: ShipClass | null = null,
    weapons: Array<Weapon> = [],
    ammunitions: Array<Ammunition> = [],
    program: Program | null = null
  ) {
    this.id = id;
    this.name = name;
    this.radar = radar;
    this.jumpDrive = jumpDrive;
    this.impulseEngine = impulseEngine;
    this.computer = computer;
    this.armour = armour;
    this.shipClass = shipClass;
    this.weapons = weapons;
    this.ammunitions = ammunitions;
    this.program = program;
  }
}
