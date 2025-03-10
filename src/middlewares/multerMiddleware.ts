import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure `uploads` directory exists
const uploadDir = path.join(__dirname, "../../uploads"); // Store outside `dist/`
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

export default upload;


// // Fix __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configure multer storage
// const fileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads")); // Ensure uploads folder exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + "." + mime.extension(file.mimetype));
//   },
// });

// // Create multer instance
// const file_upload = multer({ storage: fileStorage });

// export { file_upload };