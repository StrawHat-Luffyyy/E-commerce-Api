import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import { connectDB } from "./config/db.js";

dotenv.config();

// Sample Products
const products = [
  {
    name: "Samsung Galaxy S24",
    description: "Latest Samsung flagship with Snapdragon Gen 3",
    price: 899,
    category: "Electronics",
    stock: 25,
    images: [{ public_id: "galaxy-s24", url: "https://via.placeholder.com/150" }]
  },
  {
    name: "MacBook Pro 16”",
    description: "Apple M3 Max with 32GB RAM and 1TB SSD",
    price: 2999,
    category: "Electronics",
    stock: 8,
    images: [{ public_id: "macbook-pro", url: "https://via.placeholder.com/150" }]
  },
  {
    name: "Nike Air Jordan 1",
    description: "Classic retro basketball sneakers",
    price: 199,
    category: "Fashion",
    stock: 50,
    images: [{ public_id: "nike-aj1", url: "https://via.placeholder.com/150" }]
  },
  {
    name: "Levi’s Denim Jacket",
    description: "Timeless denim style with durable fabric",
    price: 120,
    category: "Fashion",
    stock: 30,
    images: [{ public_id: "levis-denim", url: "https://via.placeholder.com/150" }]
  },
  {
    name: "Clean Code",
    description: "A Handbook of Agile Software Craftsmanship by Robert C. Martin",
    price: 45,
    category: "Books",
    stock: 100,
    images: [{ public_id: "clean-code", url: "https://via.placeholder.com/150" }]
  },
  {
    name: "Atomic Habits",
    description: "James Clear’s guide to building good habits and breaking bad ones",
    price: 25,
    category: "Books",
    stock: 200,
    images: [{ public_id: "atomic-habits", url: "https://via.placeholder.com/150" }]
  },
  {
    name: "Dyson V15 Vacuum",
    description: "Powerful cordless vacuum with laser detection",
    price: 699,
    category: "Home Appliances",
    stock: 12,
    images: [{ public_id: "dyson-v15", url: "https://via.placeholder.com/150" }]
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Electric pressure cooker, slow cooker, rice cooker, and more",
    price: 129,
    category: "Home Appliances",
    stock: 40,
    images: [{ public_id: "instant-pot", url: "https://via.placeholder.com/150" }]
  }
];

// Import Data
const importData = async () => {
  try {
    await connectDB();

    // Clear DB
    await Product.deleteMany();
    await User.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin"
    });

    // Attach admin to products
    const sampleProducts = products.map((p) => ({
      ...p,
      createdBy: adminUser._id
    }));

    await Product.insertMany(sampleProducts);
    console.log("🌱 Sample data imported with admin user!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Destroy Data
const destroyData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("🗑️ Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
