import mongoose from 'mongoose';
import Book from '../models/Book.js';
import Category from '../models/Category.js';

export const getBooks = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      featured,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { isArchived: { $ne: true } };

    // Search by title or author
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: searchRegex }, { author: searchRegex }];
    }

    // Filter by Category (accepts category ObjectId or category slug)
    if (category && category !== 'all') {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.categoryId = category;
      } else {
        const foundCategory = await Category.findOne({ slug: category.toLowerCase() });
        if (foundCategory) {
          query.categoryId = foundCategory._id;
        } else {
          // If category slug is not found, return empty results early
          return res.status(200).json({
            success: true,
            books: [],
            pagination: { total: 0, page: Number(page), pages: 0, limit: Number(limit) },
          });
        }
      }
    }

    // Filter by Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by Featured
    if (featured === 'true' || featured === true) {
      query.featured = true;
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // default newest
    if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'title_asc') sortOptions = { title: 1 };
    else if (sort === 'newest') sortOptions = { createdAt: -1 };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .populate('categoryId', 'name slug')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: books.length,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
      books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }

    const book = await Book.findById(id).populate('categoryId', 'name slug description');
    if (!book || book.isArchived) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const { title, author, description, categoryId, price, stock, coverImage, featured } = req.body;

    if (!title || !author || !description || !categoryId || price === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required book fields: title, author, description, categoryId, price, and stock are required',
      });
    }

    // Verify category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID. Category does not exist.',
      });
    }

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      categoryId,
      price: Number(price),
      stock: Number(stock),
      coverImage: coverImage || '',
      featured: !!featured,
    });

    const populatedBook = await Book.findById(book._id).populate('categoryId', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Book listing created successfully',
      book: populatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }

    const updates = { ...req.body };

    // If categoryId is being updated, verify it exists
    if (updates.categoryId) {
      const categoryExists = await Category.findById(updates.categoryId);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category ID provided',
        });
      }
    }

    const book = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('categoryId', 'name slug');

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found to update',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book listing updated successfully',
      book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }

    // Per PRD: soft-delete/archive book so historical orders remain valid
    const book = await Book.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found to delete',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book listing archived successfully',
      bookId: id,
    });
  } catch (error) {
    next(error);
  }
};
