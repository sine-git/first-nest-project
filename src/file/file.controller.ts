import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
//import { editFileName } from './file.functions';
import { Request, Response, Express } from 'express'
import { diskStorage, memoryStorage } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }
  @Post('upload-file')
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
    //const localFile = file
    return this.fileService.processFile(file)
  }

  @Post('upload-video')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: '/Users/traore080908/Desktop/Tutos/NestJS/files/outputs/video',
        filename: (req, video, callBack) => {
          callBack(null, `video_${video.originalname}`)
        }
      }),
      limits: {
        fileSize: 1024 * 1024 * 1024
      }
    }))
  uploadVideo(
    @UploadedFile() video: Express.Multer.File
  ) {
    return {
      status: 200,
      message: `${video.filename} has been successfully updated`
    }
  }
  @Get('/stream-video')
  streamVideo(@Req() request: Request, @Res() response: Response) {
    return this.fileService.streamVideo(request, response)
  }

}
