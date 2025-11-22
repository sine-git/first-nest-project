import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Cv } from 'src/cv/entities/cv.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cv) private readonly cvRepository: Repository<Cv>
  ) {
  }
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(createUserDto.password, salt)
    createUserDto.password = password
    return this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const dbUser = await this.userRepository.findOne({ where: { id: id } })
    if (!dbUser)
      throw new NotFoundException('This user doesn\'t exist')
    const user = new User()

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt)
      user.password = (dbUser.password != hashedPassword) ? hashedPassword : dbUser.password
    }
    Object.assign(user, {
      id: dbUser.id,
      username: updateUserDto.username ?? dbUser.username,
      email: updateUserDto.email ?? dbUser.email,

    })
    if (updateUserDto.cvsIds) {
      const cvs = await this.cvRepository.find({
        where: {
          id: In(updateUserDto.cvsIds)
        }
      })
      user.cvs = cvs;
    }
    return this.cvRepository.save(user)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
