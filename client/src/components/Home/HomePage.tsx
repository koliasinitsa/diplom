//src/Home/HomePage.tsx
import React from 'react';
import Header from '../Header/Header';
import ItemTable from '../Item/ItemTable';
import './home.css'

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="content" >
        <ItemTable />
      </div>
    </div>
  );
}

export default HomePage;