import mongoose from 'mongoose'

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    usageLimit: {
        type: Number,
        default: 1
    },
    usedCount: {
        type: Number,
        default: 0
    },
    minimumPurchaseAmount: {
        type: Number,
        default: null
    }
});

const Discount = mongoose.model('Discount', discountSchema);

export default Discount;