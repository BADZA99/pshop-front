import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PageHeader from '../components/PageHeader';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// autoplay
import  { Autoplay } from 'swiper/modules';
import ProductDisplay from './ProductDisplay';

export default function SingleProduct() {
    const [product,setProduct]=useState([]);
    const {id}=useParams();
    useEffect(() => {
        fetch(`/src/products.json`)
        .then((res)=>res.json())
        .then((data)=>setProduct(data))
    }
    , [])
    console.log(product);
    // filter les produit par lid
    const productData=product.filter((val)=>val.id==id);
  return (
    <div>
      <PageHeader title={"OUR SHOP PAGE"} curPage={"Shop/single Product"} />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <aside>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            Loap={"true"}
                            autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                            }}
                            modules={{ Autoplay }}
                            //   navigation
                            navigation={{
                              nextEl: ".pro-signle-next",
                              prevEl: ".pro-signle-prev",
                            }}
                            className="mySwiper"
                          >
                            {productData.map((val) => (
                              <SwiperSlide key={val.id}>
                                <div className="single-thumb">
                                  <img src={val.img} alt="" />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                            <div className="pro-single-next">
                                <i className="icofont-rounded-left"></i>
                            </div>
                            <div className="pro-single-prev">
                                <i className="icofont-rounded-right"></i>
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                        <div className="post-content">
                            <div>
                                {
                                    productData.map(item => <ProductDisplay key={item.id} item={item}/>)
                                }
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="review"></div>
              </aside>
            </div>
            {/* rtight side */}
            <div className="col-lg-4 col-12">right SIDE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
