import { WarriorRecordResult } from '../types/types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';


class Warrior {
  id?: string;
  readonly name: string;
  readonly strength: number;
  readonly defence: number;
  readonly stamina: number;
  readonly agility: number;
  wins?: number;

  constructor(obj: Omit<Warrior, 'insert' | 'update'>) {
    const { id, name, strength, defence, stamina, agility, wins } = obj;

    const stats = [strength, defence, stamina, agility];

    const sum = stats.reduce((prev, current) => prev + current, 0);

   for (const stat of stats) {
     if (stat < 1) {
        throw new ValidationError('Single hero power can not be less than 1');
     }
   }

    if (sum !== 10) {
      throw new Error(`Wrong statistic number, the sum of them must be 10, but it is: ${sum}`);
    }

    if (name.length < 3 || name.length > 50) {
      throw new ValidationError('The name of the warrior must contain at least 3 and maximum 50 characters');
    }

    this.name = name;
    this.strength = strength;
    this.defence = defence;
    this.stamina = stamina;
    this.agility = agility;
    this.id = id ?? uuid();
    this.wins = wins ?? 0;
  }

  async insert(): Promise<string | undefined> {
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

  async update(): Promise<void> {
    if (!this.id) {
          throw new ValidationError("Cannot update a warrior without an ID.");
    }
    
    await pool.execute('UPDATE `warrior` SET `wins` = :wins WHERE `id` = :id', {
      wins: this.wins,
      id: this.id
    });
  }

  static async getOne(id: string): Promise<Warrior | null> {
    const [result] = (await pool.execute(
      'SELECT * FROM `warrior` WHERE `id` = :id',
      {
        id,
      },
    )) as WarriorRecordResult;

    // return result.length === 0 ? null : new Warrior(result[0] as Warrior);
    return result.length === 0 ? null : result[0];
  }

  static async listAll(): Promise<Warrior[]> {
    const [result] = (await pool.execute(
      'SELECT * FROM `warrior` ORDER BY `name`',
    )) as WarriorRecordResult;

    return result.map((obj) => new Warrior(obj));
  }

  static async getTop(topCount: number): Promise<Warrior[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `warrior` ORDER BY `wins` DESC LIMIT :topCount', {
        topCount
      },
    )) as WarriorRecordResult;

    return results.map((obj) => new Warrior(obj));
  }
}

export { Warrior };
