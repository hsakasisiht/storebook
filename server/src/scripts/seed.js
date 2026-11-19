import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Category } from '../models/Category.js';
import { Book } from '../models/Book.js';
import { User } from '../models/User.js';
import { initialCategories, initialBooks } from '../utils/seedData.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pandora_bookstore';

const seedDatabase = async () => {
  try {
    console.log(`[Seed Script] Connecting to MongoDB: ${uri}`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log('[Seed Script] Connected successfully.');

    // Upsert Categories
    const categoryMap = {};
    for (const catData of initialCategories) {
      const cat = await Category.findOneAndUpdate(
        { slug: catData.slug },
        catData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      categoryMap[cat.slug] = cat._id;
      console.log(`[Seed Script] Category ready: ${cat.name} (${cat._id})`);
    }

    // Upsert Books
    for (const bookData of initialBooks) {
      const categoryId = categoryMap[bookData.categorySlug];
      if (!categoryId) {
        console.warn(`[Seed Script] Warning: No category found for ${bookData.title}`);
        continue;
      }

      const { categorySlug, ...rest } = bookData;
      await Book.findOneAndUpdate(
        { title: bookData.title },
        { ...rest, categoryId },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`[Seed Script] Book ready: "${bookData.title}" by ${bookData.author}`);
    }

    // Upsert Demo Users
    const adminPasswordHash = await User.hashPassword('Admin@123');
    const adminUser = await User.findOneAndUpdate(
      { email: 'admin@pandora.com' },
      {
        name: 'Store Administrator',
        email: 'admin@pandora.com',
        passwordHash: adminPasswordHash,
        role: 'admin',
        phone: '+91 98765 43210',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    await User.findOneAndUpdate(
      { email: 'admin@freebookstore.com' },
      {
        name: 'Store Administrator',
        email: 'admin@freebookstore.com',
        passwordHash: adminPasswordHash,
        role: 'admin',
        phone: '+91 98765 43210',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`[Seed Script] Admin account ready: ${adminUser.email} (Role: ${adminUser.role})`);

    const customerPasswordHash = await User.hashPassword('Reader@123');
    const customerUser = await User.findOneAndUpdate(
      { email: 'reader@pandora.com' },
      {
        name: 'Eleanor Vance',
        email: 'reader@pandora.com',
        passwordHash: customerPasswordHash,
        role: 'customer',
        phone: '+91 91234 56789',
        addresses: [
          {
            fullName: 'Eleanor Vance',
            phone: '+91 91234 56789',
            street: '42 Baker Street, Apt 3B',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            isDefault: true,
          },
        ],
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    await User.findOneAndUpdate(
      { email: 'reader@freebookstore.com' },
      {
        name: 'Eleanor Vance',
        email: 'reader@freebookstore.com',
        passwordHash: customerPasswordHash,
        role: 'customer',
        phone: '+91 91234 56789',
        addresses: [
          {
            fullName: 'Eleanor Vance',
            phone: '+91 91234 56789',
            street: '42 Baker Street, Apt 3B',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            isDefault: true,
          },
        ],
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`[Seed Script] Demo Customer account ready: ${customerUser.email} (Role: ${customerUser.role})`);

    console.log('[Seed Script] Database seeding completed successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Script Error] Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
