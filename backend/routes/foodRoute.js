// import express from 'express';
// import { addFood, listFood, removeFood } from '../controllers/foodController.js';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';

// const foodRouter = express.Router();

// // Ensure "uploads" folder exists
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });

// const upload = multer({ storage });

// foodRouter.get("/list", listFood);
// foodRouter.post("/add", upload.single('image'), addFood);
// foodRouter.post("/remove", removeFood);
// // router.post('/add', upload.single('image'), addFood);

// export default foodRouter;



import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Use absolute path for uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// (Optional) File filter to accept image files only
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const isValid = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
  return isValid ? cb(null, true) : cb(new Error("Only image files allowed"));
};

const upload = multer({ storage, fileFilter }); // Include fileFilter if needed

// Routes
foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
