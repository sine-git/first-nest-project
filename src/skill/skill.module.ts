import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
  imports: [TypeOrmModule.forFeature([Skill])]
})
export class SkillModule { }
