import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService {

    constructor(@InjectRepository(Skill) private readonly skillRepository: Repository<Skill>) {
    }

    create(createSkillDto: CreateSkillDto) {
        return this.skillRepository.save(createSkillDto)
    }

    findAll() {
        return this.skillRepository.find()
    }

    update(id: number, updateSkillDto: UpdateSkillDto) {
        const dbSkill = this.skillRepository.preload({
            ...updateSkillDto
        })
        if (!dbSkill)
            throw new NotFoundException('Skill not found...')
        return this.skillRepository.save(updateSkillDto)
    }
}
