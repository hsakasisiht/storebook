import Cart from '../models/Cart.js';
import Book from '../models/Book.js';

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate({
      path: 'items.bookId',
      select: 'title author price stock coverImage featured',
    });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    // Filter out items where book might have been deleted/archived
    const validItems = cart.items.filter((item) => item.bookId !== null);
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.bookId?.price || 0;
      return sum + price * item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      items: cart.items,
      totalItems,
      subtotal,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    const book = await Book.findById(bookId);
    if (!book || book.isArchived) {
      return res.status(404).json({
        success: false,
        message: 'Book not found or unavailable',
      });
    }

    if (book.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: 'This book is currently out of stock',
      });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (existingIndex > -1) {
      const requestedQty = cart.items[existingIndex].quantity + qty;
      if (requestedQty > book.stock) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more than available stock (${book.stock} units in stock)`,
        });
      }
      cart.items[existingIndex].quantity = requestedQty;
    } else {
      if (qty > book.stock) {
        return res.status(400).json({
          success: false,
          message: `Requested quantity exceeds available stock (${book.stock} available)`,
        });
      }
      cart.items.push({ bookId, quantity: qty });
    }

    await cart.save();

    return getCart(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { quantity } = req.body;
    const qty = parseInt(quantity, 10);

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    if (qty <= 0) {
      cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
    } else {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      if (qty > book.stock) {
        return res.status(400).json({
          success: false,
          message: `Requested quantity exceeds stock (${book.stock} available)`,
        });
      }

      const item = cart.items.find((item) => item.bookId.toString() === bookId);
      if (item) {
        item.quantity = qty;
      }
    }

    await cart.save();
    return getCart(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
      await cart.save();
    }

    return getCart(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      items: [],
      totalItems: 0,
      subtotal: 0,
    });
  } catch (error) {
    next(error);
  }
};
