//src/Home/HomePage.tsx
import React, { useState } from 'react';
import Header from '../Header/Header';
import ItemTable from '../Item/ItemTable';
import './home.css'
import CarFilterComponent from './CarFilterComponent';

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({
    brand: '',
    bodyType: '',
    transmission: '',
    typeEngine: '',
    minPrice: 0, 
    maxPrice: 5000, 
  });

  const handleFiltersChange = (
    newFilters:
      {
        brand: string;
        bodyType: string;
        transmission: string,
        typeEngine: string,
        minPrice: number;
        maxPrice: number;
      }) => {
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <Header />
      <div className="content" >
        <div className="sidebar">
          <CarFilterComponent onFiltersChange={handleFiltersChange} />
        </div>
        <div className="main-content">
          <ItemTable filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;