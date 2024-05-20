import discountModel from '../models/discountModel.js';

// get all discounts
 const getDiscountList = async (req, res) => {
    
    try {
        const discounts = await discountModel.find();
        res.status(200).json({success: true, data: discounts});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
 }

 // add discount
const addDiscount = async (req, res) => {
   
    const {code, discountAmount, usageLimit, minimumPurchaseAmount} = req.body;

    const discount = new discountModel({
        code,
        discount: discountAmount,
        usageLimit,
        minimumPurchaseAmount
    });

    try {
        await discount.save();
        res.status(201).json({success: true, message: 'Discount added successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// get discount by id
const getDiscountById = async (req, res) => {
    try {
        const id = req.params.id;
        const discount = await discountModel.findById({_id: id});

        if(!discount) {
            return res.status(404).json({success: false, message: "Discount not found"});
        }

        res.status(200).json({success: true, data: discount});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// get discount by code
const getDiscount = async (req, res) => {
    
    const {code} = req.params;
    try {
        const discount = await discountModel.findOne({code});

        if(!discount) {
            return res.status(404).json({success: false, message: "Discount not found"});
        }

        res.json({success: true, data: discount});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// update discount
const updateDiscount = async (req, res) => {

    const id = req.params.id;
    const {code, discount, limit, usedCount, minimumPurchaseAmount, isActive} = req.body;

    try {
        const discountCoupon = await discountModel.findById({_id: id});

        if(!discountCoupon) {
            return res.status(404).json({success: false, message: "Discount not found"});
        }

        discountCoupon.code = code;
        discountCoupon.discount = discount;
        discountCoupon.usageLimit = limit;
        discountCoupon.minimumPurchaseAmount = minimumPurchaseAmount;
        discountCoupon.usedCount = usedCount;
        discountCoupon.isActive = isActive;

        await discountCoupon.save();
        res.status(200).json({success: true, message: 'Discount updated successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// delete discount
const deleteDiscount = async (req, res) => {

    const id = req.params.id;
    try {
        await discountModel.findByIdAndDelete({_id: id});
        res.status(200).json({success: true, message: 'Discount deleted successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export { addDiscount, getDiscountList, getDiscount, getDiscountById, updateDiscount, deleteDiscount}