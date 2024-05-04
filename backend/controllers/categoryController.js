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

// get category by id
const fetchCategory = async (req, res)=>{
    try {
        const id = req.params.id;
        const category = await categoryModel.findById(id);
        if (category){
            res.json({success: true, message: "Category Fetched", data: category});
        } else {
            res.status(404).json({success: false, message: "Category is not exists"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// update Category
const updateCategory = async (req, res)=>{
    try {
        const id = req.params.id;
        const prevCategory = await categoryModel.findById(id);
        let newCategory = {
            name: req.body.name
        }
        if (req.file){
            let image_filename = `${req.file.filename}`
            newCategory = {
                ...newCategory,
                image: image_filename
            }
            fs.unlink(`uploads/categories/${prevCategory.image}`, ()=>{});
        } else {
            newCategory = {
                ...newCategory,
                image: req.body.image
            }
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(id, newCategory, {new: true});
        res.status(200).json({success: true, message: "Category Updated", data: updatedCategory});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
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

export {listCategory, fetchCategory, addCategory, updateCategory, removecategory}