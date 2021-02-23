import React, {useState} from 'react';

const Pagination = (props) => {
  const pageNums = [];
  const [activeBtnColor, setActiveBtnColor] = useState(0);

  for (let i = 1; i <= Math.ceil(props.totalRows / props.rowsPerPage); i++) {
    pageNums.push(i);
  }

  const changeBtnColor = index => {
    setActiveBtnColor(index); 
  };
  
  return (
    <div className='pagination'>
      {<button className="prev-btn" onClick={() => {props.prevBtn(); changeBtnColor(props.currentPage-2);}} disabled={props.currentPage == pageNums[0] ? true : false}>Prev</button>}

      {
        pageNums.map((number, index) => (
          (number <= props.maxPageNumLimit  && number > props.minPageNumLimit) ?
            (<button key={index} onClick={() => {props.paginate(number); changeBtnColor(index);}} className={`page-link ${activeBtnColor === index ? "active" : ""}`}>{number}</button>)
            :  (null)
        ))
      }
      <button className="next-btn" onClick={() => {props.nextBtn(); changeBtnColor(props.currentPage);}} disabled={props.currentPage == pageNums[pageNums.length - 1] ? true : false}>Next</button>
    </div>
  );
};

export default Pagination;
