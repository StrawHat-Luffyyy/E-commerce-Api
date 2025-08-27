import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      maxLength: [8, "Price cannot exceed 8 digits"],
    },
    images: [
      {
        public_id: String, // placeholder for cloudinary
        url: String,
      },
    ],
    category: {
      type: String,
      required: [true, "Please provide product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock count"],
      maxLength: [4, "Stock cannot exceed 9999"],
      default: 1,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Product", productSchema);
