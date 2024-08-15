/* eslint-disable react/prop-types */
import React from 'react'
import Data from "../products.json";
const ShopCategory = ({
    filterItem,
                menuItems,
                selectedcategory,
                setproducts,
                setItem
}) => {
  return (
    <>
      <div className="widget-heqder">
        <h5 className="ms-2">All Categories</h5>
      </div>
      <div className="">
        <button
          className={`m-2 ${selectedcategory === "All" ? "bg-warning" : ""}`}
            onClick={() => setproducts(Data)}
        >
          All
        </button>
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`m-2 ${selectedcategory === "All" ? "bg-warning" : ""}`}
            onClick={() => filterItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default ShopCategory
