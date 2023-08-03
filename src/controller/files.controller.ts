import { Controller, Get, Res,Param, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/api/files')
export class FilesController {
  @Get(':filename')
  async downloadFile(@Param('filename') namaFile: string, @Res() res: Response) {
    const filePath = path.resolve(__dirname, '..', 'uploads', namaFile);

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found' });
    }

    // Stream file sebagai response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${namaFile}`);
    fs.createReadStream(filePath).pipe(res);
  }
}
