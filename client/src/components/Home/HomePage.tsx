//src/Home/HomePage.tsx
import React from 'react';
import Header from '../Header/Header';
import ItemTable from '../Item/ItemTable';

const HomePage: React.FC = () => {
  return (
      <div className="App">
        <Header />
        <div className="content" style={{ marginTop: '100px' }}>
          <ItemTable/>
        </div>
      </div>
  );
}

export default HomePage;