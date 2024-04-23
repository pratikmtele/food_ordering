import categoryModel from '../models/categoryModel.js'

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

export {listCategory, addCategory}