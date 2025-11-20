import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Cv } from 'src/cv/entities/cv.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cv) private readonly cvRepository: Repository<Cv>
  ) {
  }
  create(createUserDto: CreateUserDto) {
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
    Object.assign(user, {
      id: dbUser.id,
      username: updateUserDto.username ?? dbUser.username,
      email: updateUserDto.email ?? dbUser.email,
      password: updateUserDto.password ?? dbUser.password,
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
