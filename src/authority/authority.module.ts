import { Module } from '@nestjs/common';
import { AuthorityService } from './authority.service';
import { AuthorityController } from './authority.controller';
import { Authority } from './entities/authority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthorityController],
  providers: [AuthorityService],
  imports: [TypeOrmModule.forFeature([Authority])]
})
export class AuthorityModule { }
