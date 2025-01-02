import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { memoryStorage } from 'multer';

import { imgConstants } from './constants/constants';
import { S3Service } from './services/s3.service';

@ApiBearerAuth()
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: imgConstants.MAX_FILE_SIZE },
      fileFilter: (req, file, cb) => {
        if (!imgConstants.MIMETYPES.includes(file.mimetype)) {
          cb(new BadRequestException('Invalid file type'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('folderName') folderName: string,
  ): Promise<{ key: string }> {
    if (!folderName) {
      throw new BadRequestException('Folder name is required');
    }

    return await this.s3Service.uploadSingleFile(file, folderName);
  }

  @Post('delete-file')
  async deleteFile(@Body('key') key: string): Promise<void> {
    if (!key) {
      throw new BadRequestException('Key is required');
    }

    await this.s3Service.deleteFile(key);
  }
}
