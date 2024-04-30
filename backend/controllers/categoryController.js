import categoryModel from '../models/categoryModel.js'
import fs from 'fs';

// all category list
const listCategory = async(req, res)=>{
    try {
        const categories = await categoryModel.find({})
        res.json({success: true, data: categories})
    } catch (error) {
        res.json({success: false, message: "Error"})
    }
}

// add category
const addCategory = async(req, res)=>{
    let image_filename = `${req.file.filename}`

    const category = new categoryModel({
        name: req.body.name,
        image: image_filename,
    })

    try {
        await category.save();
        res.json({success: true, message: "Category Added"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error})
    }
}

// delete category

const removecategory = async (req, res)=>{
    try {
        const category = await categoryModel.findById(req.body.id);
        fs.unlink(`uploads/categories/${category.image}`, ()=>{});

        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Menu Removed"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'error'});
    }
}

export {listCategory, addCategory, removecategory}