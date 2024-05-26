import React from 'react'
import { useState } from 'react';
import productData from '../products.json'
import { Link } from 'react-router-dom';
import SelectedCategory from '../components/SelectedCategory';
const title = (
    <h2>Search your one from <span>Thousand</span> of products</h2>
)

const desc="we have the largest collection of products"
const bannerList = [
  {
    iconName: "icofont-users-alt-4",
    text: "1.5 Million Customers",
  },
  {
    iconName: "icofont-notification",
    text: "More then 2000 Marchent",
  },
  {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
  },
];
const Banner = () => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredProducts, setfilteredProducts] = useState(productData);
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        const searchValue = e.target.value.toLowerCase();
        const filteredData = productData.filter((item) => {
          return item.name.toLowerCase().includes(searchValue);
        });
        setfilteredProducts(filteredData);
    };
  return (
    <div className="banner-section style-4">
      <div className="container">
        <div className="banner-content">
          {title}
          <form>
            <SelectedCategory select={"all"}/>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search your product"
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
          <p>{desc}</p>
          <ul className="lab-ui">
            {searchInput &&
              filteredProducts.map((product, i) => (
                <li key={i}>
                  <Link to={`/shop/${product.id}`}>{product.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Banner
