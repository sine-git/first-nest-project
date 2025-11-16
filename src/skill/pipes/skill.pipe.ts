import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class SkillPipe implements PipeTransform {
    transform(value: string[], metadata: ArgumentMetadata) {
        if (!value || value.length == 0)
            throw new BadRequestException("Bad request")
        return value.map(
            (skill) => {
                return skill.toUpperCase()
            }
        ).join("_")
    }

}