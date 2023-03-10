import React, { useState } from "react";
import { Link, useNavigate,createSearchParams } from "react-router-dom";
import "./navbar.scss";
import logo from "../../assets/logo.png";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../Redux/reducer/productSlice";

const Navbar = () => {
  const { carts } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {

    
    setSearchInput(e.target.value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchInput.trim().length){
      
      navigate(`/search/?${createSearchParams({ q: searchInput })}`);
      dispatch(searchProducts(searchInput));
    }
    setSearchInput("")
  };

  return (
    <nav className="nav-container">
      {/* desktop */}
      <div className="wrapper-desk">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">
            <h3>Redux</h3>
          </Link>
        </div>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Search here..."
              value={searchInput}
              onChange={handleInput}
            />
          </form>
        </div>
        <div className="links">
          <div className="user">
            <a href="">
              User <FaUser />
            </a>
          </div>
          {/* <a href="">Register</a> */}

          <Link to="/cart">
            <div className="cart">
              <span className="count">{carts.length}</span>
              <FaShoppingCart />
            </div>
          </Link>
        </div>
      </div>
      {/* desktop */}
      {/* mobile */}
      <div className="wrapper-mob">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">
            <h3>Redux</h3>
          </Link>
        </div>

        <div className="links">
          <div className="user">
            <a href="">
              User <FaUser />
            </a>
          </div>
          {/* <a href="">Register</a> */}

          <Link to="/cart">
            <div className="cart">
              <span className="count">{carts.length}</span>
              <FaShoppingCart />
            </div>
          </Link>
        </div>
      </div>
      <div className="search-mobile">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search here..."
            value={searchInput}
            onChange={handleInput}
          />
          {/* <button>go</button> */}
        </form>
      </div>
      {/* mobile */}
    </nav>
  );
};

export default Navbar;
