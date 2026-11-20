import mongoose from 'mongoose';
import Category from '../models/Category.js';
import { initialCategories } from '../utils/seedData.js';

export const getCategories = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: initialCategories.length,
        categories: initialCategories.map((c, i) => ({ ...c, _id: `cat-${i + 1}` })),
      });
    }

    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    // If DB error, fallback to initialCategories
    res.status(200).json({
      success: true,
      count: initialCategories.length,
      categories: initialCategories.map((c, i) => ({ ...c, _id: `cat-${i + 1}` })),
    });
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug.toLowerCase() });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with slug: ${req.params.slug}`,
      });
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, slug } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = await Category.create({
      name,
      slug: generatedSlug,
      description: description || '',
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    next(error);
  }
};
