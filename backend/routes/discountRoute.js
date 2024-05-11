import express from 'express';
import { getDiscountList, getDiscount, getDiscountById, addDiscount, updateDiscount, deleteDiscount } from '../controllers/discountController.js';

const discountRouter = express.Router();

discountRouter.post("/add", addDiscount);
discountRouter.get("/list", getDiscountList);
discountRouter.get("/:code", getDiscount);
discountRouter.get("/get/:id", getDiscountById);
discountRouter.put("/update/:id", updateDiscount);
discountRouter.delete("/:id", deleteDiscount);

export default discountRouter;