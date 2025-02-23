import { API } from '../instance';

type imageData = {
  originalName: string;
};

export const FileService = {
  uploadImage: (data: imageData) => API.post('/files/s3/put-file-sign', data),
};
