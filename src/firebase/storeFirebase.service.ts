import { Injectable } from '@nestjs/common';
import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Firebase } from './firebase';

export enum EStireName {
  COURSES = 'courses',
}

@Injectable()
export class StoreFirebase extends Firebase {
  private storage: FirebaseStorage;

  constructor() {
    super();
    this.storage = getStorage(this.getApp());
  }

  async uploadFile(
    file: Express.Multer.File,
    dir: EStireName,
  ): Promise<string> {
    const typeFile = file.originalname.split('.').pop();
    const fileBuffer = file.buffer;
    const fileName = `${dir}/${uuidv4()}.${typeFile}`;
    const storageRef = ref(this.storage, fileName);

    await uploadBytes(storageRef, fileBuffer);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  public deleteFile = async (url: string): Promise<void> => {
    const storageRef = ref(this.storage, url);

    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete file from Firebase Storage.');
    }
  };
}
