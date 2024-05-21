//src/Home/HomePage.tsx
import React from 'react';
import Header from '../Header/Header';
import ItemTable from '../Item/ItemTable';
import './home.css'
import CarFilterComponent from './CarFilterComponent';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="content" >
        <div className="sidebar">
          <CarFilterComponent />
        </div>
        <div className="main-content">
          <ItemTable />
        </div>
      </div>
    </div>
  );
}

export default HomePage;