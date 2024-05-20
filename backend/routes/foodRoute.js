import express from 'express';
import { addFood, listFood, removeFood, fetchFood, updateFood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage})

foodRouter.get("/list", listFood);
foodRouter.post("/add",upload.single('image'),addFood);
foodRouter.post("/remove",removeFood);
foodRouter.get("/:id", fetchFood);
foodRouter.post("/update/:id", upload.single('image'), updateFood);

export default foodRouter;