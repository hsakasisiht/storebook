import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, getCategories } from '../../services/bookService';
import BookCard from '../../components/books/BookCard';
import './HomePage.css';

export const HomePage = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [bookRes, catList] = await Promise.all([
          getBooks({ featured: true, limit: 4 }),
          getCategories(),
        ]);
        setFeaturedBooks(bookRes.books || []);
        setCategories(catList || []);
      } catch (e) {
        console.error('Home data load error', e);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="home-page">
      {/* Editorial Hero Banner */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">Your Free Online Bookstore</span>
            <h1 className="hero-title">Books for Everyone.<br />Anytime, Anywhere.</h1>
            <p className="hero-subtitle">
              Welcome to Free Book Store — your friendly online bookstore. Discover timeless classics, thrilling mysteries, inspiring stories, and helpful guides. All easily accessible for readers everywhere.
            </p>
            <div className="hero-actions">
              <Link to="/books" className="btn btn-primary hero-btn">
                Browse Books
              </Link>
              <Link to="/books?category=fiction" className="btn btn-secondary">
                Popular Fiction
              </Link>
            </div>
          </div>
          <div className="hero-card-accent">
            <div className="hero-accent-inner">
              <span className="accent-tag">Editor's Pick</span>
              <h3 className="accent-title">Stories That Stay With You</h3>
              <p className="accent-desc">Handpicked favorites loved by readers all over the world.</p>
              <div className="accent-decor-shelf">📚 📖 ☕</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="container categories-strip-section">
        <div className="categories-strip-header">
          <h3>Browse by Category</h3>
          <Link to="/books" className="view-all-link">View all &rarr;</Link>
        </div>
        <div className="categories-pills">
          {categories.map((c) => (
            <Link
              key={c._id || c.slug}
              to={`/books?category=${c.slug}`}
              className="category-pill-item"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="container featured-section">
        <div className="section-head-row">
          <div>
            <span className="section-eyebrow">Handpicked For You</span>
            <h2>Popular Books</h2>
          </div>
          <Link to="/books" className="btn btn-secondary btn-sm">
            See All Books &rarr;
          </Link>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-muted)' }}>Finding great books for you...</p>
        ) : (
          <div className="featured-grid">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Value Pillars */}
      <section className="pillars-section container">
        <div className="pillar-item">
          <span className="pillar-icon">🌿</span>
          <h4>Thoughtfully Picked</h4>
          <p>From timeless masterpieces to contemporary page-turners, find books you'll genuinely enjoy.</p>
        </div>
        <div className="pillar-item">
          <span className="pillar-icon">📦</span>
          <h4>Fast &amp; Easy Ordering</h4>
          <p>Simple ordering with instant confirmation and reliable doorstep delivery.</p>
        </div>
        <div className="pillar-item">
          <span className="pillar-icon">☕</span>
          <h4>Made for Book Lovers</h4>
          <p>Built with care by readers, for readers. No clutter, no hassle, just good books.</p>
        </div>
      </section>

      {/* Browse CTA Card */}
      <section className="container browse-cta-card">
        <div className="browse-cta-text">
          <h2>Ready to find your next great read?</h2>
          <p>Explore our library with quick search by title, author, or category.</p>
        </div>
        <Link to="/books" className="btn btn-primary">
          Browse All Books &rarr;
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
