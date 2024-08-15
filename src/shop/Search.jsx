/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Search = ({
    gridList,
    products
}) => {
  const [searchTerm, setsearchTerm] = useState('');
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className='widget widget-search'>
     <form className='search-wrapper mb-3'>
        <input
          type='text'
          placeholder='Search here...'
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <button type='submit'>
          <i className='icofont-search-2'></i>
        </button>
     </form>
{/* showing search results */}
      <div className='search-results'>
      
          {
            searchTerm && filteredProducts.map((product) => (
              <a key={product.id} href={`/shop/${product.id}`}>
              <div className="d-flex gap-3 p-2">
                <div className="">
                  <div className="pro-thumb h-25">
                    <img src={product.img} alt="" width={70} className='flex-(grow|shrink-0)'/>
                  </div>
                </div>
                  <div className="product-content">
                    <p>
                      <Link to={`/shop/${product.id}`}>
                        {product.name}
                      </Link>
                    </p>
                    <h6>${product.price}</h6>
                  </div>
              </div>
              </a>
            ))
          }
        
      </div>
    </div>
  )
}

export default Search
