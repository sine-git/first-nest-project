import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CvService {
  constructor(@InjectRepository(Cv) readonly cvRepository: Repository<Cv>
    , @InjectRepository(Skill) readonly skillRepository: Repository<Skill>,
    @InjectRepository(User) readonly userRepository: Repository<User>
  ) {

  }
  create(createCvDto: CreateCvDto) {
    return this.cvRepository.save(createCvDto)
  }

  findAll() {
    return this.cvRepository.find();
  }

  findOne(id: number) {
    return this.cvRepository.findOne({ where: { id: id } });
  }
  async update(id: number, updateCvDto: UpdateCvDto) {
    const dbCv = await this.cvRepository.findOne({ where: { id: id } })
    /* const dbCv = await this.cvRepository.findOne({
      id, ...updateCvDto
    }) */

    if (!dbCv) throw new NotFoundException("Cv introuvable")
    const cv = new Cv()
    Object.assign(cv,
      {
        id: dbCv.id,
        name: updateCvDto.name ?? dbCv.name,
        firstName: updateCvDto.firstName ?? dbCv.firstName,
        age: updateCvDto.age ?? dbCv.age,
        cin: updateCvDto.cin ?? dbCv.cin,
        job: updateCvDto.job ?? dbCv.job,
        path: updateCvDto.path ?? dbCv.path,
      }
    )
    if (updateCvDto.skills) {
      const dbSkills = await this.skillRepository.find({ where: { id: In(updateCvDto.skills) } })
      cv.skills = dbSkills
    }
    if (updateCvDto.userId) {
      const dbUser = await this.userRepository.findOne({ where: { id: updateCvDto.userId } })
      cv.user = dbUser
    }
    return this.cvRepository.save(cv);
  }
  join() {
    const userQueryBuilder = this.userRepository.createQueryBuilder('user')
    userQueryBuilder.leftJoin('user.cvs', 'cv').select(['user.email', 'cv.name', 'cv.cin'])
    return userQueryBuilder.getRawMany()
  }
  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
