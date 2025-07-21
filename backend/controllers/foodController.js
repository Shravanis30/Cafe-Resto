import foodModel from "../models/foodModel.js";
import fs from 'fs';

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error('Error fetching food list:', error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required." });
    }

    const { name, description, price, category } = req.body;

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: req.file.filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ success: false, message: "Failed to add food" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    const imagePath = `uploads/${food.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Image delete error:", err);
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error('Error removing food:', error);
    res.status(500).json({ success: false, message: "Failed to remove food" });
  }
};

export { listFood, addFood, removeFood };
