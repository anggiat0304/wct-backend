import { Controller, Get, Res,Param, HttpStatus, Query } from '@nestjs/common';
import { Response, query } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as JSZip from 'jszip';
import * as archiver from 'archiver';
const archiver = require('archiver');

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
    const filenames = Array.isArray(filename) ? filename : [filename]; // Ensure it's an array

    const zip = new JSZip();
   // Inisialisasi archiver
const archive = archiver('zip', {
  zlib: { level: 9 } // Tingkat kompresi
});


// Loop melalui setiap nama file dan masukkan ke dalam entries
filenames.forEach(filename => {
  const filePath = path.resolve(__dirname, '..', '../src/folder/file', filename);
  const fileStream = fs.createReadStream(filePath);
  
  // Masukkan file ke dalam entries
  archive.append(fileStream, { name: filename });
});

// Selesai menambahkan file, panggil finalize untuk menyelesaikan proses zip
archive.finalize();

// Pipe hasil zip ke response atau ke file
archive.pipe(response); // Untuk mengirim zip ke response HTTP
archive.pipe(fs.createWriteStream('output.zip')); // Untuk menyimpan zip ke file
  }

}
