import fs from 'fs';
import path from 'path';

export const uploadImage = async (file) => {
    const uploadPath = path.join('assets/pizza/', file.filename);
    fs.renameSync(file.path, uploadPath);
    return `assets/pizza/${file.filename}`;
};
