import Product from "../models/product.model.js";

// Create The Product(Admin)

const createProduct = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(401).json({ message: "Product creation failed" });
    }
    return res.status(200).json({
      message: "Product Created Successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};


// Get Single Product By Id
const getProductById = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id)
    if(!product){
      return res.status(402).json({message:"Product Not Found"})
    }    
    return res.status(201).json({success:true , product})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message:"Server Error"})
  }
}
export { createProduct , getProductById };
