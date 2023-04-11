import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paginado  } from '../../redux/actions/actions'; // Importa la acción necesaria de Redux

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.recipes.page); // Cambiado de state.pagination.page a state.recipes.page
  const totalPages = useSelector((state) => state.recipes.totalPages); // Cambiado de state.pagination.totalPages a state.recipes.totalPages

  const handleClick = (pageNumber) => {
    console.log("Clic en el botón de paginación:", pageNumber);
    dispatch(paginado(pageNumber));
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
