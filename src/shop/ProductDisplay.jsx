/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, temporibus.'
export default function ProductDisplay({item}) {
//   console.log(item);
  const { name, id, price, seller, ratingsCount, quantity } = item;
  const [prequantity, setQuantity] = useState(quantity);
  // coupon et size
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");
  // handle size change
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  // handleColorChange
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  // handleDecrease
    const handleDecrease = () => {
        if (prequantity > 1) {
        setQuantity(prequantity - 1);
        }
    };
    // handleIncrease
    const handleIncrease = () => {
        setQuantity(prequantity + 1);
    };
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(`size: ${size} color: ${color} quantity: ${prequantity} coupon: ${coupon}`);
        const product = {
            id:id,
            name:name,
            price:price,
            size:size,
            color:color,
            quantity:prequantity,
            coupon:coupon,
            img:img
        }

        // log
        const existingCart= JSON.parse(localStorage.getItem('cart')) || {};
        const existingProductIndex = existingCart.findIndex((item)=>item.id===id);
        if(existingProductIndex !== -1){
            existingCart[existingProductIndex].quantity += prequantity;
        }else{
            existingCart.push(product);
        }
        // update local storage
        localStorage.setItem('cart', JSON.stringify(existingCart));

        // reset fields
        setQuantity(1);
        setSize("Select Size");
        setColor("Select Color");
        setCoupon("");
    };
  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span>{ratingsCount} review</span>
        </p>
        <h4>${price}</h4>
        <p>By: {seller}</p>
        <p>{desc}</p>
      </div>
      {/* cart component */}
      <div className="">
        <form action="" onChange={handleSubmit}>
          <div className="select-product size">
            {/* size */}
            <select name="" id="" value={size} onChange={handleSizeChange}>
              <option value="">select size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          {/* color */}
          <div className="select-product color">
            <select name="" id="" value={color} onChange={handleColorChange}>
              <option value="">select color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
            </select>
          </div>
          {/* cart plius minus */}
          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={prequantity}
              name="qtybutton"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>
          {/* coupon field */}
          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>
          {/* btn section */}
          <button type="submit" className="lab-btn">
            <span>Add to Cart</span>
          </button>

          <Link to={"/cart-page"} className='lab-btn bg-primary'>
            <span>Checkout</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
