import {Warrior} from '../models/warrior.record';
import {FieldPacket} from 'mysql2';

enum HttpStatusCode {
    NotFound = 404,
    BadRequest = 400,
    InternalServerError = 500
}

interface WarriorData {
    id?: string;
    name: string;
    strength: number;
    defence: number;
    stamina: number;
    agility: number;
    wins?: number;
  }

type WarriorRecordResult = [Warrior[], FieldPacket[]];


export { 
    HttpStatusCode,
    WarriorData,
    WarriorRecordResult
}