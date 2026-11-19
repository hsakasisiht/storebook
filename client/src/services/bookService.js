import api from './api';

// Fallback items matching Phase 2 seeder for resilient offline/development rendering
export const FALLBACK_CATEGORIES = [
  { _id: 'cat-1', name: 'Fiction', slug: 'fiction' },
  { _id: 'cat-2', name: 'Classics', slug: 'classics' },
  { _id: 'cat-3', name: 'Philosophy', slug: 'philosophy' },
  { _id: 'cat-4', name: 'Non-Fiction', slug: 'non-fiction' },
  { _id: 'cat-5', name: 'Poetry', slug: 'poetry' },
  { _id: 'cat-6', name: 'Mystery & Crime', slug: 'mystery' },
];

export const FALLBACK_BOOKS = [
  {
    _id: 'book-1',
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    description: 'Barcelona, 1945: A young boy is led to the secret Cemetery of Forgotten Books to choose a title that will change the trajectory of his life forever.',
    categoryId: { _id: 'cat-1', name: 'Fiction', slug: 'fiction' },
    price: 499,
    stock: 14,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'book-2',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    description: 'The private philosophical diary of the Roman Emperor Marcus Aurelius, offering timeless Stoic wisdom on duty, resilience, and inner tranquility.',
    categoryId: { _id: 'cat-3', name: 'Philosophy', slug: 'philosophy' },
    price: 349,
    stock: 22,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'book-3',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    description: 'A psychological masterpiece exploring conscience, crime, redemption, and the tormented psyche of former student Rodion Raskolnikov in St. Petersburg.',
    categoryId: { _id: 'cat-2', name: 'Classics', slug: 'classics' },
    price: 450,
    stock: 9,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'book-4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'A bold, sweeping narrative of human evolution and culture exploring how Homo sapiens conquered the globe through shared cognitive myths.',
    categoryId: { _id: 'cat-4', name: 'Non-Fiction', slug: 'non-fiction' },
    price: 599,
    stock: 18,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'book-5',
    title: 'Leaves of Grass',
    author: 'Walt Whitman',
    description: 'Whitman’s landmark celebration of nature, human dignity, democracy, and the sensual spirit of modern American poetic freedom.',
    categoryId: { _id: 'cat-5', name: 'Poetry', slug: 'poetry' },
    price: 380,
    stock: 11,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'book-6',
    title: 'The Hound of the Baskervilles',
    author: 'Arthur Conan Doyle',
    description: 'Sherlock Holmes and Dr. Watson investigate the legendary curse of a demonic spectral hound roaming the treacherous Dartmoor mist.',
    categoryId: { _id: 'cat-6', name: 'Mystery & Crime', slug: 'mystery' },
    price: 299,
    stock: 15,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'book-7',
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    description: 'The monumental magical realist chronicle of seven generations of the Buendía family in the mythical Colombian town of Macondo.',
    categoryId: { _id: 'cat-1', name: 'Fiction', slug: 'fiction' },
    price: 549,
    stock: 12,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'book-8',
    title: 'Beyond Good and Evil',
    author: 'Friedrich Nietzsche',
    description: 'A provocative critique of Western morality, truth, dogmatism, and the will to power by one of philosophy’s most incendiary thinkers.',
    categoryId: { _id: 'cat-3', name: 'Philosophy', slug: 'philosophy' },
    price: 399,
    stock: 0, // out of stock demo test
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80',
  },
];

export const getCategories = async () => {
  try {
    const res = await api.get('/categories');
    return res.categories && res.categories.length > 0 ? res.categories : FALLBACK_CATEGORIES;
  } catch (err) {
    return FALLBACK_CATEGORIES;
  }
};

export const getBooks = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.category && params.category !== 'all') query.append('category', params.category);
  if (params.sort) query.append('sort', params.sort);
  if (params.minPrice) query.append('minPrice', params.minPrice);
  if (params.maxPrice) query.append('maxPrice', params.maxPrice);
  if (params.featured) query.append('featured', params.featured);
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);

  try {
    const queryString = query.toString();
    const endpoint = queryString ? `/books?${queryString}` : '/books';
    const res = await api.get(endpoint);
    return res;
  } catch (err) {
    // Client-side fallback filtering when backend/database is offline
    let filtered = [...FALLBACK_BOOKS];

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(
        (b) => b.categoryId?.slug === params.category || b.categoryId?._id === params.category
      );
    }

    if (params.sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return {
      success: true,
      books: filtered,
      count: filtered.length,
      pagination: {
        total: filtered.length,
        page: 1,
        pages: 1,
        limit: 12,
      },
    };
  }
};

export const getBookById = async (id) => {
  try {
    const res = await api.get(`/books/${id}`);
    return res.book;
  } catch (err) {
    const found = FALLBACK_BOOKS.find((b) => b._id === id);
    if (found) return found;
    throw new Error('Book not found');
  }
};
