import { OmitType } from "@nestjs/mapped-types";
import { Skill } from "../entities/skill.entity";

export class CreateSkillDto extends OmitType(Skill, ['id']) {

}