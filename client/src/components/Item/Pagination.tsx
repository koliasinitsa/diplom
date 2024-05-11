import React from 'react';

interface PaginationProps {
    currentPage: number;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, goToPreviousPage, goToNextPage }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center',  }}>
            <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    borderRadius: '50%', // Радиус равен половине высоты кнопки
                    border: '1px solid #dddddd',
                    width: '40px', // Ширина кнопки
                    height: '40px', // Высота кнопки
                    backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                    color: currentPage === 1 ? '#ccc' : '#3f51b5',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s, color 0.3s, border-radius 0.3s',
                    pointerEvents: currentPage === 1 ? 'none' : 'auto',
                }}
                onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                        e.currentTarget.style.backgroundColor = '#3f51b5';
                        e.currentTarget.style.color = '#fff';
                    }
                }}
                onMouseLeave={(e) => {
                    if (currentPage !== 1) {
                        e.currentTarget.style.backgroundColor = currentPage === 1 ? '#f5f5f5' : '#fff';
                        e.currentTarget.style.color = currentPage === 1 ? '#ccc' : '#3f51b5';
                    }
                }}
            >
                {'<'}
            </button>
            <span style={{ margin: '0 10px', fontSize: '24px', color: '#000000' }}>{currentPage}</span>
            <button
                onClick={goToNextPage}
                style={{
                    borderRadius: '50%', // Радиус равен половине высоты кнопки
                    border: '1px solid #dddddd',
                    width: '40px', // Ширина кнопки
                    height: '40px', // Высота кнопки
                    backgroundColor: '#fff',
                    color: '#3f51b5',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s, border-radius 0.3s',
                    fontWeight: 'bold',
                    fontSize: '18px',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3f51b5';
                    e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#3f51b5';
                }}
            >
                {'>'}
            </button>
        </div>
    );
}

export default Pagination;
