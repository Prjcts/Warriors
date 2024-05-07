import { FieldPacket } from "mysql2";
import { Warrior } from "../models/warrior.record";

enum HttpStatusCode {
  NotFound = 404,
  BadRequest = 400,
  InternalServerError = 500,
}

type WarriorRecordResult = [Warrior[], FieldPacket[]];

export { HttpStatusCode, WarriorRecordResult };
