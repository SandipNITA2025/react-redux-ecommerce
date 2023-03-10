import React, { useEffect, useState } from "react";
import "./productlist.scss";
import ProductCard from "../../components/prodCard/ProductCrad";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  searchProducts,
} from "../../Redux/reducer/productSlice";
import { useSearchParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [query] = useSearchParams();

  const searchInput = query.get("q");

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = searchInput
        ? dispatch(searchProducts(searchInput))
        : dispatch(fetchAllProducts());
      setProduct(products);
    };
    fetchProducts().catch(console.error);
  }, [ searchInput]);

  return (
    <div id="prod-section" className="wrapper-container">
      <h3>All Products</h3>
      <div className="genre">
        <button className="genre-btn">All</button>
        <button className="genre-btn">Cloths</button>
        <button className="genre-btn">Electronics</button>
        <button className="genre-btn">Others</button>
      </div>
      <section className="prod-section">
        {loading && <p style={{ textAlign: "center" }}>loading...</p>}
        {!loading && (!products || !products.length) ? (
          <>
            <div className="empty">
              <p>No products found</p>
              <Link to="/">
                <BiArrowBack /> Back to home
              </Link>
            </div>{" "}
          </>
        ) : (
          <ProductCard products={products} />
        )}
      </section>
    </div>
  );
};

export default ProductList;
