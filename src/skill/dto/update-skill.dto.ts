import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Skill } from "../entities/skill.entity";

export class UpdateSkillDto extends PartialType(Skill) {

}