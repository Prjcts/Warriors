import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { WarriorData } from '../types/types';
import { WarriorRecordResult } from '../types/types';


class Warrior {
  id?: string;
  readonly name: string;
  readonly strength: number;
  readonly defence: number;
  readonly stamina: number;
  readonly agility: number;
  wins?: number;

  constructor(obj: WarriorData) {
    const { id, name, strength, defence, stamina, agility, wins } = obj;

    const sum = [strength, defence, stamina, agility].reduce((prev, current) => prev + current, 0);

    if (sum !==10){
        throw new Error(`Wrong statistic number, the sum of them must be 10, but it is: ${sum}`);
    }

    if (name.length < 3 || name.length > 50) {
      throw new ValidationError('The name of the warrior must contain at least 3 and maximum 50 characters');
    }

    this.id = id;
    this.name = name;
    this.strength = strength;
    this.defence = defence;
    this.stamina = stamina;
    this.agility = agility;
    this.wins = wins;
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute(
      'INSERT INTO `warrior`(`id`, `name`, `strength`, `defence`, `stamina`, `agility`, `wins`) VALUES(:id, :name, :strength, :defence, :stamina, :agility, :wins)',
      {
        id: this.id,
        name: this.name,
        strength: this.strength,
        defence: this.defence,
        stamina: this.stamina,
        agility: this.agility,
        wins: this.wins,
      },
    );

    return this.id;
  }

  static async listAll(): Promise<Warrior[]> {
    const [result] = (await pool.execute(
      'SELECT * FROM `warrior` ORDER BY `name`',
    )) as WarriorRecordResult;

    return result.map((obj) => new Warrior(obj));
  }

  static async getOne(id: string): Promise<Warrior | null> {
    const [result] = (await pool.execute("SELECT * FROM `warrior` WHERE `id` = :id", {
        id
    })) as WarriorRecordResult;

    return result.length === 0 ? null : new Warrior(result[0] as Warrior)
  }

  static async getTop(topCount: number): Promise<WarriorData> {
    const topUsers = (await pool.execute("SELECT * FROM `warrior` ORDER BY `wins` DESC LIMIT")) as WarriorRecordResult;

    return topUsers
  }

  async update(): Promise<void> {
    await pool.execute("UPDATE `warior` SET `wins` = :wins", {
        wins: this.wins
    })
  }
}

export { Warrior };
