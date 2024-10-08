import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Pagination from './Pagination'

const showResults="Showing 01 - 12 of 139 Results"
import Data from "../products.json"
import ProductCards from './ProductCards';
import Search from './Search'
import ShopCategory from './ShopCategory'
import PopularPost from './PopularPost'
import Tags from './Tags'
import NavItems from '@/components/NavItems'
import { useUserStore } from '@/store/userStore'
export default function Shop() {
    const [gridList, setGridList] = useState(true);
    const [products, setproducts] = useState(Data);


    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    //function to  change currentpage
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

// filter product by category
const [selectedcategory, setselectedCategory] = useState("");
const menuItems = [...new Set(Data.map((val)=>val.category))];
const filterItem = (Currentcategory) =>  {
const updatedItems = Data.filter((curElem) => {
    return curElem.category === Currentcategory;
});
  setproducts(updatedItems);
  setselectedCategory(Currentcategory);
}
  return (
    <>
      <NavItems />
      <div>
        <PageHeader title="our shop page" curPage="Shop" />
        {/* shop page */}
        <div className="shop-page padding-tb">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12">
                <article>
                  {/* layout and title */}
                  <div className="shop-title d-flex flex-wrap justify-content-between">
                    <p>{showResults}</p>
                    <div
                      className={`product-view-mode ${
                        gridList ? "gridActive" : "listActive"
                      }`}
                    >
                      <a
                        className="grid"
                        onClick={() => setGridList(!gridList)}
                      >
                        <i className="icofont-ghost"></i>
                      </a>
                      <a
                        className="list"
                        onClick={() => setGridList(!gridList)}
                      >
                        <i className="icofont-listine-dots"></i>
                      </a>
                    </div>
                  </div>
                  {/* product cards */}
                  <div className="">
                    <ProductCards
                      gridList={gridList}
                      products={currentProducts}
                    />
                  </div>
                  <Pagination
                    productsPerpage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </article>
              </div>
              <div className="col-lg-4 col-12">
                <aside>
                  <Search gridList={gridList} products={products} />
                </aside>
                <ShopCategory
                  filterItem={filterItem}
                  menuItems={menuItems}
                  selectedcategory={selectedcategory}
                  setproducts={setproducts}
                  setItem={setproducts}
                />
                <PopularPost />
                <Tags />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
