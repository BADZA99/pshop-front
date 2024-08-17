import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import delImgUrl from '../assets/images/shop/del.png';
export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
      const storedCartItems=JSON.parse(localStorage.getItem('cart')) || [];
      console.log(storedCartItems);
        setCartItems(storedCartItems);
        console.log(cartItems);
    }, [])

    // calculate pricers
    const calculateTotalPrice = (item) => {
        return item.price* item.quantity;
    }

    // handle quantity increase
    const handleIncrease=(item)=>{
        item.quantity+=1;
        setCartItems([...cartItems]);

        // update local storage
        localStorage.setItem('cart',JSON.stringify(cartItems));
    }

    // handle quantity decrease
    const handleDecrease=(item)=>{
        if(item.quantity>1){
            item.quantity-=1;
            setCartItems([...cartItems]);
        }
        // update local storage
        localStorage.setItem('cart',JSON.stringify(cartItems));
    }

    // handle remove item
    const handleRemove=(item)=>{
        const updatedCart=cartItems.filter((val)=>val.id!==item.id);
        setCartItems(updatedCart);

      updateLocalStorage(updatedCart);
    }

    const updateLocalStorage =(cart)=>{
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    // calculate total price
    const cartSubtotal=cartItems.reduce((total,item)=>{
        return total + calculateTotalPrice(item);
    },0)

    // order total
    const orderTotal=cartSubtotal;
    
  return (
    <div>
      <PageHeader title={"CART PAGE"} curPage={"Shop/Cart"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart shop */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-product">Price</th>
                    <th className="cat-product">Quantity</th>
                    <th className="cat-product">Total</th>
                    <th className="cat-product">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, index) => (
                    <tr key={index}>
                      <td className="product-item cart-product">
                        <div className="p-thumb">
                          <Link to={"/shop"}>
                            <img src={item.img} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to={"/shop"}>{item.name}</Link>
                        </div>
                      </td>
                      <td className="cat-price">${item.price}</td>
                      <td className="cat-product">
                        <div className="cart-plus-minus">
                          <div
                            className="desc qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            value={item.quantity}
                            className="cart-plus-minus-box"
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cat-toprice">
                        ${calculateTotalPrice(item)}
                      </td>
                      <td className="cat-edit">
                        <a href="">
                          <img
                            src={delImgUrl}
                            onClick={() => handleRemove(item)}
                            alt="delete"
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* cart bottom */}
            <div className="cart-bottom">
              {/* checkout box */}
              <div className="cart-checkout-box">
                <form action="" className="coupon">
                  <input
                    type="text"
                    className="cart-page-input-text"
                    placeholder="coupon code ..."
                  />
                  <input type="submit" className="" value="apply coupon" />
                </form>
                <form action="" className="cart-checkout">
                  <input
                    type="text"
                    className="cart-page-input-text"
                    placeholder="coupon code ..."
                  />
                  <input type="submit" className="" value="update cart" />
                  <div className="">checkoutPage</div>
                </form>
              </div>

              {/* shopping box */}
              <div className="shiping-box">
                <div className="row g-3">
                    <div className="col-md-6 col-12">
                        <div className="calculate-shiping">
                          <h3>calculate shipping</h3>
                          <div className="outline-select">
                                  <select name="" id="">
                                      <option value="">Bangladesh</option>
                                      <option value="">India</option>
                                      <option value="">Pakistan</option>
                                      <option value="">Srilanka</option>
                                  </select>
                                  <span className='select-icon'>
                                      <i className="icofont-rounded-down"></i>
                                  </span>
                          </div>
                          <div className="outline-select shipping-select">
                                  <select name="" id="">
                                      <option value="">capital</option>
                                      <option value="">India</option>
                                      <option value="">Pakistan</option>
                                      <option value="">Srilanka</option>
                                  </select>
                                  <span className='select-icon'>
                                      <i className="icofont-rounded-down"></i>
                                  </span>
                          </div>
                          <input type="text" placeholder='postcode/ZIP' className='cart-page-input-text'/>
                          <button type='submit' className='default-button'>update total</button>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="cart-overview">
                           <h3>Cart Total</h3>
                           <ul className='lab-ul'>
                            <li>
                                <span className='pull-left'>Subtotal</span>
                                <span className='pull-right'>${cartSubtotal}</span>
                            </li>
                            <li>
                                <span className='pull-left'>shiping and handling</span>
                                <span className='pull-right'>free shiping</span>
                            </li>
                            <li>
                                <span className='pull-left'>Order total</span>
                                <span className='pull-right'>
                                    ${orderTotal.toFixed(2)}
                                </span>
                            </li>
                           </ul>
                        </div>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
