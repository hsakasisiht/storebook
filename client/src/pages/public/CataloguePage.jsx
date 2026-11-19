import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBooks, getCategories } from '../../services/bookService';
import BookCard from '../../components/books/BookCard';
import BookFilters from '../../components/books/BookFilters';
import './CataloguePage.css';

export const CataloguePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  // Load Categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catList = await getCategories();
        setCategories(catList);
      } catch (e) {
        console.error('Error fetching categories:', e);
      }
    };
    fetchCats();
  }, []);

  // Fetch books on query state change
  useEffect(() => {
    let isMounted = true;
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getBooks({
          search,
          category,
          sort,
          page,
          limit: 12,
        });

        if (isMounted) {
          setBooks(res.books || []);
          setPagination(res.pagination || { total: res.books?.length || 0, pages: 1 });
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load catalogue at this moment. Showing offline collection.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchBooks();
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [search, category, sort, page]);

  const handleReset = () => {
    setSearch('');
    setCategory('all');
    setSort('newest');
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="catalogue-page container">
      <header className="catalogue-header">
        <div>
          <span className="section-eyebrow">Book Collection</span>
          <h1 className="catalogue-title">Explore Books</h1>
          <p className="catalogue-subtitle">
            Browse through our collection of timeless classics, fiction, non-fiction, philosophy, and more.
          </p>
        </div>
        <div className="catalogue-count-badge">
          <span>{pagination.total} {pagination.total === 1 ? 'Book' : 'Books'} Available</span>
        </div>
      </header>

      {error && (
        <div className="notice-banner">
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className="catalogue-layout">
        {/* Left Filter Sidebar */}
        <BookFilters
          search={search}
          setSearch={(val) => {
            setSearch(val);
            setPage(1);
          }}
          category={category}
          setCategory={(val) => {
            setCategory(val);
            setPage(1);
          }}
          categories={categories}
          sort={sort}
          setSort={(val) => {
            setSort(val);
            setPage(1);
          }}
          onReset={handleReset}
        />

        {/* Right Books Grid */}
        <section className="catalogue-main">
          {loading ? (
            <div className="catalogue-grid-skeleton">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="book-card-skeleton card">
                  <div className="skeleton-media" />
                  <div className="skeleton-line" style={{ width: '60%' }} />
                  <div className="skeleton-line" style={{ width: '90%' }} />
                  <div className="skeleton-line" style={{ width: '40%' }} />
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="catalogue-empty-state card">
              <span className="empty-icon">📖</span>
              <h3>No books found</h3>
              <p>We couldn't find any books matching your search. Try adjusting your keywords or clearing the filters.</p>
              <button onClick={handleReset} className="btn btn-primary">
                View All Books
              </button>
            </div>
          ) : (
            <>
              <div className="catalogue-grid">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <nav className="pagination-wrapper" aria-label="Catalogue pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    &larr; Previous
                  </button>
                  <span className="page-indicator">
                    Page <strong>{page}</strong> of <strong>{pagination.pages}</strong>
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={page >= pagination.pages}
                    onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  >
                    Next &rarr;
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default CataloguePage;
