//Setting up multer to locally store the uploaded file for once so we can upload it to google drive.
import multer from "multer";

const storage = multer.memoryStorage(); //this keeps files in the memory before uploading to google drive.
const uploads = multer({storage:multer.memoryStorage(), limits:{fileSize: 10*1024*1024}});

export const upload = uploads;