import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileService {

    async processFile(file: Express.Multer.File) {

        return {
            filename: file.filename,
            message: 'message',
            //console.log('File given to variable')
        }
    }
}
