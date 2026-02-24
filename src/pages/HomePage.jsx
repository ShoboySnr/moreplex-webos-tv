import React, { useEffect, useState } from 'react';
import { getFeaturedMovies, getCategories } from '../services/api';
import MovieRow from '../components/MovieRow';
import FeaturedBanner from '../components/FeaturedBanner';
import './HomePage.css';

const HomePage = () => {
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [featuredData, categoriesData] = await Promise.all([
        getFeaturedMovies(),
        getCategories(),
      ]);

      if (featuredData?.data?.length > 0) {
        setFeatured(featuredData.data[0]);
      }

      if (categoriesData?.data) {
        setCategories(categoriesData.data);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-page content-area">
      {featured && <FeaturedBanner movie={featured} />}
      
      <div className="movie-rows">
        {categories.map((category) => (
          <MovieRow
            key={category.id}
            title={category.name}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
