/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Post, Req, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { SkillPipe } from './pipes/skill.pipe';
import { Request } from 'express';
import { SkillCustomExceptionFilter } from './fliters/skill-custom-exception.filter';
import { NullInterceptor } from 'src/common/interceptors/null-interceptor';
import { ConfigService } from '@nestjs/config';

//@UsePipes()

@UseFilters(SkillCustomExceptionFilter)
@Controller('skill')
export class SkillController {
    constructor(private configService: ConfigService) {
    }
    @Get()
    getSkill() //    @Req() request: Request
    {
        //console.log(request)
        //throw new NotFoundException("Skill non trouvé")
        const serverConfig = this.configService.get("server")
        //console.log(`The configs are `, serverConfig)
        return 'Skills returned...';
    }
    @UseInterceptors(NullInterceptor)
    @Get('empty')
    getNullSkill() {
        return null
    }
    @Post('add')
    addSkills(@Body(new SkillPipe()) skills: string[]) {
        return skills;
    }
}
