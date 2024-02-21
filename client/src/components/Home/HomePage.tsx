//src/Home/HomePage.tsx
import React from 'react';
import Header from '../Header/Header';

const HomePage: React.FC = () => {
  return (
      <div className="App">
        <Header />
        <div className="content">
          {/* Ваш остальной контент */}
        </div>
      </div>
  );
}

export default HomePage;