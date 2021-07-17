import React, { useState } from 'react';

interface IPaginationProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (arg0: number) => void;
}

export const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {
  const { totalRows, rowsPerPage, currentPage, setCurrentPage } = props;

  const pageNums = [];
  const [activeBtnColor, setActiveBtnColor] = useState(0);
  const [pageNumLimit] = useState(5);
  const [maxPageNumLimit, setmaxPageNumLimit] = useState(5);
  const [minPageNumLimit, setminPageNumLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNums.push(i);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const changeBtnColor = (index: number) => {
    setActiveBtnColor(index);
  }

  const nextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumLimit) {
      setmaxPageNumLimit(maxPageNumLimit + pageNumLimit);
      setminPageNumLimit(minPageNumLimit + pageNumLimit);
    }
  }

  const prevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumLimit === 0) {
      setmaxPageNumLimit(maxPageNumLimit - pageNumLimit);
      setminPageNumLimit(minPageNumLimit - pageNumLimit);
    }
  }

  return (
    <div className='pagination'>
      <button
        className="prev-btn"
        onClick={() => { prevBtn(); changeBtnColor(currentPage - 2); }}
        disabled={currentPage === pageNums[0] ? true : false}>
        Prev
      </button>

      {
        pageNums.map((number, index) => (
          (number <= maxPageNumLimit && number > minPageNumLimit) ?
            (
              <button
                key={index}
                onClick={() => { paginate(number); changeBtnColor(index); }}
                className={`page-link ${activeBtnColor === index ? "active" : ""}`}>{number}
              </button>
            )
            : (null)
        ))
      }

      <button
        className="next-btn"
        onClick={() => { nextBtn(); changeBtnColor(currentPage); }}
        disabled={currentPage === pageNums[pageNums.length - 1] ? true : false}>
        Next
      </button>
    </div>
  );
};
