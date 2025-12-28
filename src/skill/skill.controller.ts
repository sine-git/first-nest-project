/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Req, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { SkillPipe } from './pipes/skill.pipe';
import { Request } from 'express';
import { SkillCustomExceptionFilter } from './fliters/skill-custom-exception.filter';
import { NullInterceptor } from 'src/common/interceptors/null-interceptor';
import { ConfigService } from '@nestjs/config';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Public } from 'src/auth/jwt/decorators';

//@UsePipes()

@UseFilters(SkillCustomExceptionFilter)
@Controller('skill')
export class SkillController {
    constructor(private configService: ConfigService, private skillServce: SkillService) {
    }

    @Post()
    create(@Body() createSkillDto: CreateSkillDto) {
        return this.skillServce.create(createSkillDto)
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSkillDto: CreateSkillDto) {
        return this.skillServce.update(id, updateSkillDto)
    }

    @Public()
    @Get()
    findAll() {
        return this.skillServce.findAll();
    }
    /* @Get()
    getSkill() //    @Req() request: Request
    {
        //console.log(request)
        //throw new NotFoundException("Skill non trouvé")
        const serverConfig = this.configService.get("server")
        //console.log(`The configs are `, serverConfig)
        return 'Skills returned...';
    } */
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
