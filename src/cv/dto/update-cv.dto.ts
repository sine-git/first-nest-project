import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { Cv } from '../entities/cv.entity';

export class UpdateCvDto extends OmitType(Cv, ['user']) {

    constructor(public userId: number) {
        super()
    }
}
