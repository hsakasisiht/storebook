import Order from '../models/Order.js';
import Book from '../models/Book.js';
import Cart from '../models/Cart.js';

export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, items: directItems, paymentMethod = 'COD' } = req.body;

    // Validate shipping address
    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.postalCode
    ) {
      return res.status(400).json({
        success: false,
        message: 'Complete shipping address (Full Name, Phone, Street, City, Postal Code) is required',
      });
    }

    // Determine items: either from direct checkout or user's cart
    let orderItemsRaw = [];
    if (directItems && Array.isArray(directItems) && directItems.length > 0) {
      orderItemsRaw = directItems;
    } else {
      const cart = await Cart.findOne({ userId: req.user._id });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Your shopping cart is empty. Please add items before checking out.',
        });
      }
      orderItemsRaw = cart.items;
    }

    // Revalidate stock & recalculate prices strictly on server
    const processedItems = [];
    let calculatedSubtotal = 0;

    for (const item of orderItemsRaw) {
      const bookId = item.bookId?._id || item.bookId;
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);

      const book = await Book.findById(bookId);
      if (!book || book.isArchived) {
        return res.status(400).json({
          success: false,
          message: `Book "${item.title || bookId}" is no longer available in catalogue.`,
        });
      }

      if (book.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${book.title}". Available: ${book.stock}, requested: ${quantity}.`,
        });
      }

      const itemTotal = book.price * quantity;
      calculatedSubtotal += itemTotal;

      processedItems.push({
        bookId: book._id,
        titleSnapshot: book.title,
        authorSnapshot: book.author,
        unitPrice: book.price,
        quantity,
        coverImage: book.coverImage || '',
      });
    }

    // Atomic Stock Deduction
    for (const pItem of processedItems) {
      await Book.findByIdAndUpdate(pItem.bookId, {
        $inc: { stock: -pItem.quantity },
      });
    }

    const shippingFee = calculatedSubtotal > 1000 ? 0 : 50; // Free delivery over ₹1000
    const calculatedTotal = calculatedSubtotal + shippingFee;

    // Generate unique order number
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `ORD-${dateStr}-${randomHex}`;

    const order = await Order.create({
      orderNumber,
      userId: req.user._id,
      items: processedItems,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        street: shippingAddress.street.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state?.trim() || '',
        postalCode: shippingAddress.postalCode.trim(),
      },
      subtotal: calculatedSubtotal,
      shippingFee,
      total: calculatedTotal,
      paymentMethod,
      paymentStatus: 'Pending',
      status: 'Pending',
    });

    // Clear cart upon successful order
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Thank you for ordering from Pandora.',
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Ownership check: Customer can only view their own order; admin can view any
    if (
      req.user.role !== 'admin' &&
      order.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not have permission to view this order',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: orders.length,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // If order is newly cancelled, restore inventory
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      for (const item of order.items) {
        await Book.findByIdAndUpdate(item.bookId, {
          $inc: { stock: item.quantity },
        });
      }
    }

    order.status = status;
    if (status === 'Delivered') {
      order.paymentStatus = 'Paid';
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to "${status}"`,
      order,
    });
  } catch (error) {
    next(error);
  }
};
