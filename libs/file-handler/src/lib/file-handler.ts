import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import { pipeline } from 'stream';
const pump = util.promisify(pipeline);
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
export const dir = `${path.resolve(__dirname)}/uploads/`;
export const FileHandler = createParamDecorator(
  async (data = 'file', ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    try {
      const img = await req.body[data];
      const type = await checkMimeType(img);
      if (type === 'unknown') {
        throw new HttpException(
          `${type} media`,
          HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        );
      }
      const ext = type.split('/')[1];
      img.filename = `${uuidv4()}-${Date.now()}.${ext}`;
      return {
        filename: img.filename,
        file: img.file,
      };
    } catch (err) {
      new Logger(err);
    }
    return null;
  },
);

async function checkMimeType(img) {
  const head = await img.toBuffer();
  const arr = new Uint8Array(head).subarray(0, 4);
  let header = '';
  for (let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }
  let type = '';
  switch (header) {
    case '89504e47':
      type = 'image/png';
      break;
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      type = 'image/jpeg';
      break;
    default:
      type = 'unknown';
      break;
  }
  return type;
}

export async function saveFile(data: { file; filename }): Promise<string> {
  await pump(data.file, fs.createWriteStream(dir + data.filename));
  return data.filename;
}
