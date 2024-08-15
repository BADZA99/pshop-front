/* eslint-disable react/prop-types */
import React from 'react'

export default function Pagination({
  productsPerpage,
  totalProducts,
  paginate,
  currentPage

}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerpage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className='default-pagination lab-ul'>
      <li className='prev'>
        <a onClick={() => {
          if (currentPage > 1) {
            paginate(currentPage - 1);
          }

        }}>
          <i className="icofont-rounded-left"></i>
         
        </a>
        </li>
      
     {
        pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'bg-warning' : ''}`}>
            <button onClick={() => paginate(number)} href="#" className='bg-transparent'>
              {number}
            </button>
          </li>
        ))
     }


      <li className='next'>
        <a onClick={() => {
          if (currentPage < pageNumbers.length) {
            paginate(currentPage + 1);
          }
        }}>
          <i className="icofont-rounded-right"></i>
        </a>
      </li>
     
    </ul>
  )
}
