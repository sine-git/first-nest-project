import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs'
import { Request, Response } from 'express'
import { Buffer } from 'node:buffer';
import * as fs from 'fs'
@Injectable()
export class FileService {


    processFile(file: Express.Multer.File) {
        return this.processExcelFile(file)
    }
    async processExcelFile(file: Express.Multer.File) {
        const workbook = new ExcelJS.Workbook()
        //const buffer = Buffer.from(file.buffer)
        const buffer = Buffer.from(file.buffer)
        await workbook.xlsx.load(buffer.buffer)
        const sheet = workbook.getWorksheet(1)
        const rows = sheet.getSheetValues()
        return rows
    }
    streamVideo(request: Request, response: Response) {
        const videoPath = '/Users/traore080908/Desktop/Tutos/NestJS/files/outputs/video/video_Max-it-2.0.mp4'
        const stat = fs.statSync(videoPath)
        const range = request.headers.range

        if (!range) {
            response.status(400).send('Range header is required')
            return
        }
        const videoSize = stat.size
        const chunkSize = 1_000_000
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, videoSize - 1)

        const header = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Lenght': end - start + 1,
            'Content-Type': 'video/mp4'
        }
        response.writeHead(206, header)
        fs.createReadStream(videoPath, { start, end }).pipe(response)
    }



}
