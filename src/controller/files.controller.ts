import { Controller, Get, Res,Param, HttpStatus, Query } from '@nestjs/common';
import { Response, query } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as JSZip from 'jszip';
import * as archiver from 'archiver';

@Controller('/api/file')
export class FilesController {
  @Get('/download/:filename')
  async downloadFile(@Param('filename') namaFile: string, @Res() res: Response) {
    const filePath = path.resolve(__dirname, '..', '../src/folder/file', namaFile);
   

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found' });
    }

    // Stream file sebagai response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${namaFile}`);
    fs.createReadStream(filePath).pipe(res);
  }

  @Get('/bulkdownload')
  async bulkDownload(@Query() query:{ filename: string}, @Res() response: Response) {
    const { filename } = query;
    const filenames = Array.isArray(filename) ? filename : [filename];

    const zip = new JSZip();

    for (const filename of filenames) {
      const filePath = path.resolve(__dirname, '..', '../src/folder/file', filename);
      const fileData = fs.readFileSync(filePath);
      zip.file(filename, fileData);
    }

    response.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=files.zip`,
    });

    const archive = archiver('zip');
    archive.pipe(response);
    console.log(archive.pipe(response));
    zip.generateNodeStream({ streamFiles: true })
      .pipe(archive);

    archive.finalize();
  }

}
