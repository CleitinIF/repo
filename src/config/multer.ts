import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

const destination = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  dest: destination,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.originalname);

        const filename = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, filename);
      });
    },
  }),
  fileFilter: (req: Request, file: any, cb: any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};
