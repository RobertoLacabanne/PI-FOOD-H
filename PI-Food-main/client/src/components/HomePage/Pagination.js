import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../redux/actions/actions'; // Importa la acción necesaria de Redux
import './Pagination.css'; // Importa el archivo de estilos correspondiente (si es necesario)

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.page); // Accede a la página actual del estado de Redux
  const totalPages = useSelector((state) => state.pagination.totalPages); // Accede al total de páginas del estado de Redux

  const handleClick = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handleClick(currentPage - 1)}>{'<'}</button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button onClick={() => handleClick(currentPage + 1)}>{'>'}</button>
      )}
    </div>
  );
};

export default Pagination;
