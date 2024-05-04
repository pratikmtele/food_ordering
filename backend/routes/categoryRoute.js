import express from 'express';
import multer from 'multer';
import {listCategory, addCategory, removecategory, fetchCategory, updateCategory} from '../controllers/categoryController.js'


const categoryRouter = express.Router();

// Image storage Engine (Saving Image to uploads/categories folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads/categories',
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage: storage})

categoryRouter.get("/list", listCategory)
categoryRouter.post("/add", upload.single("image"), addCategory)
categoryRouter.post("/remove", removecategory)
categoryRouter.get("/:id", fetchCategory)
categoryRouter.post('/update/:id', upload.single('image'), updateCategory);

export default categoryRouter