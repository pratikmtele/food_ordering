import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
})

const categoryModel = mongoose.model.category || mongoose.model("category", categorySchema)
export default categoryModel