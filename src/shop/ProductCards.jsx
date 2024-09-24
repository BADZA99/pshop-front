/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom';
import Ratting from '../components/Ratting';
import { useUserStore } from '@/store/userStore';

export default function ProductCards({ gridList, products }) {
    // console.log(products);
        const { user } = useUserStore();
  return (
    <div
      className={`shop-product-wrap row justify-content-center ${
        gridList ? "grid" : "list"
      }`}
    >
      {products?.map((product, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-12">
          <div className="product-item">
            {/* product images */}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={product.img} alt="" />
              </div>

              {/* product action list */}
              <div className="product-action-link">
                <Link to={`/shop/${product.id}`}>
                  <i className="icofont-eye"></i>
                </Link>
                <a href="#">
                  <i className="icofont-heart"></i>
                </a>
               {user !== null && <Link to={`/cart-page`}>
                  <i className="icofont-cart-alt"></i>
                </Link>}
              </div>
            </div>

            {/* product content */}
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product.id}`}>{product.name}</Link>
              </h5>
              <p className="productRating"><Ratting/></p>
              <h6>${product.price}</h6>
            </div>
          </div>
          {/* list style */}
          <div className="product-list-item">
            {/* product images */}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={product.img} alt="" />
              </div>

              {/* product action list */}
              <div className="product-action-link">
                <Link to={`/shop/${product.id}`}>
                  <i className="icofont-eye"></i>
                </Link>
                <a href="#">
                  <i className="icofont-heart"></i>
                </a>
                <Link to={`/cart-page`}>
                  <i className="icofont-cart-alt"></i>
                </Link>
              </div>
            </div>

            {/* product content */}
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product.id}`}>{product.name}</Link>
              </h5>
              <p className="productRating"><Ratting/></p>
              <h6>${product.price}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
