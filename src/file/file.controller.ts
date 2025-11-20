import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
//import { editFileName } from './file.functions';
import { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage, memoryStorage } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    /* storage: diskStorage({
      destination: '/Users/traore080908/Desktop/Tutos/NestJS/files/outputs',
      filename: (req, file, callBack) => {
        callBack(null, `ouput_${file.originalname}`)
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024
    } */
  }))
  updloadFile(@UploadedFile('file') file: Express.Multer.File, @Body('body') body: any) {
    const localFile = file
    /* const rows = file.buffer.toString('utf-8').split('\n')
    rows.forEach((row => {
      console.log(row)
    })) */

  }
  /* @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage:
      diskStorage({
        destination: '/Users/traore080908/Desktop/Tutos/NestJS/files',
        filename: (req, file, cb) => {
          const unique = uuidv4();
          const extension = file.originalname.split('.').pop();
          cb(null, `${unique}.${extension}`);
        },
      })


    ,
    fileFilter: (req, file, cb) => {
      cb(null, true); // accepte tous les fichiers
    },

  }))
  uploadFile(@UploadedFile(
  ) file: Express.Multer.File, @Body() body) {
    const uploadedFile = file
    const response = {
      originalFileName: file.originalname,
      fileName: file.fieldname
    }

    return response
  }

 */
}
