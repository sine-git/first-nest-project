import { Xlsx } from './../../node_modules/exceljs/index.d';

import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as ExcelJS from 'exceljs'

import { Buffer } from 'node:buffer';
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


}
