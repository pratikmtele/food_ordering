import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// fetch food by id
const fetchFood = async(req, res)=>{
    try {
        const id = req.params.id;
        const food = await foodModel.findById({_id:id});
        res.json({success: true, message: "Food Fetched", data: food});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// add food
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// update food
const updateFood = async (req, res)=>{
    try {
        const id = req.params.id;
        const prevFood = await foodModel.findById({_id:id});
        let newFood = {
            name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category
        };
        if (req.file) {
            let image_filename = `${req.file.filename}`
            newFood = {
                ...newFood,
                image: image_filename
            }
            fs.unlink(`uploads/${prevFood.image}`, () => { });
        }else {
            newFood = {
                ...newFood,
                image: req.body.image
            }
        }
        
        const updatedFood = await foodModel.findByIdAndUpdate({_id:id}, newFood, {new: true});
        res.json({success: true, message: "Food Updated", data: updatedFood});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listFood, addFood, removeFood, fetchFood, updateFood }