import React, { useState } from 'react'
import Ratting from '../components/Ratting';
const reviwtitle = "Add a Review";

let ReviewList = [
  {
    imgUrl: "/src/assets/images/instructor/01.jpg",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/02.jpg",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/03.jpg",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/04.jpg",
    imgAlt: "Client thumb",
    name: "Cher Daviau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
];
export default function Review() {
    const [reviewShow,setreviewShow]=useState(true);
  return (
    <>
      <ul
        className={`review-nav lab-ul ${
          reviewShow ? "RevActive" : "DescActive"
        }`}
      >
        {/* description reviews */}
        <li className="desc" onClick={() => setreviewShow(!reviewShow)}>
          Description
        </li>
        <li className="rev" onClick={() => setreviewShow(!reviewShow)}>
          Review 4
        </li>
      </ul>
      {/* desc and content */}
      <div
        className={`review-content ${
          reviewShow ? "review-content-show" : "description-show"
        }`}
      >
        <div className="review-showing">
            <ul className='content lab-ul'>
                {
                    ReviewList.map((review,index) => (
                        <li key={index}>
                            <div className="post-thumb">
                                <img src={review.imgUrl} alt={review.imgAlt} />
                            </div>
                            <div className="post-content">
                              <div className="entry-meta">
                                <div className="posted-on">
                                    <a href="#">{review.name}</a>
                                    <p>{review.date}</p>
                                </div>
                              </div>
                              <div className="entry-content">
                                <p>{review.desc}</p>
                              </div>
                            </div>
                        </li>
                    ))
                }
            </ul>

            {/* add review field */}
            <div className="client-review">
                <div className="review-form">
                    <div className="review-title">
                        <h5>{reviwtitle}</h5>
                    </div>
                    <form action="" className='row'>
                        <div className="col-md-4 col-12">
                            <input type="text" placeholder='Name'/>
                        </div>
                        <div className="col-md-4 col-12">
                            <input type="email" placeholder='Email'/>
                        </div>
                        <div className="col-md-4 col-12">
                          <div className="rating">
                              <span className='ml-12'>your rating</span>
                              <Ratting/>
                          </div>
                        </div>
                        <div className="col-md-12 col-12">
                            <textarea name="" id="" cols="30" rows="10" placeholder='Your Review'>type here message</textarea>
                        </div>

                        <div className="col-12">
                            <button type='submit' className='default-button'>
                                <span>Submit review</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

        {/* description */}
        <div className="description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quidem minus nemo!</p>

            <div className="post-item">
                <div className="post-thumb">
                    <img src="/src/assets/images/shop/01.jpg" alt="" />
                </div>
                <div className="post-content">
               <ul className='lab-ui'>
                     <li>100% cotton</li>
                     <li>Imported</li>
                     <li>Machine wash cold with like colors, dry low heat</li>
                     <li>Lightweight, Classic fit, Double-needle sleeve and bottom hem</li>
               </ul>
                </div>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsam blanditiis quo vel, aut ad voluptate totam quia dicta, assumenda accusantium explicabo impedit alias illum ut eaque odio! Voluptatum, ab. Modi dignissimos quod mollitia aliquam, voluptates, magni deleniti fuga quidem libero suscipit sunt maiores optio exercitationem unde, cumque doloremque atque velit? Odit tenetur molestias numquam pariatur ducimus aliquam veniam suscipit repellat assumenda atque reiciendis quam aliquid quaerat quasi</p>
            </div>
        </div>
      </div>
    </>
  );
}
