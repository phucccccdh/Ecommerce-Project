import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";

import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  HddOutlined,
  PhoneOutlined
} from "@ant-design/icons";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const [menu, setMenu] = useState(true);

  const handleSignout = () => {
    dispatch(SignoutUser());
  };

  console.log(userInfo);

  const SearchProduct = async (e) => {
    e.preventDefault()
    await history.push("/search");
    dispatch(searchProduct(search));
    setSearch('')
  };

  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/"> TechStore </Link>
          </span>
        </div>
        <div className="hotline">
          <span>
            <Link to="/product"> Sản Phẩm </Link>
          </span>
        </div>
        <div className="search">
          <form onSubmit={(e) => SearchProduct(e)}>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm ..."
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <SearchOutlined onClick={(e) => SearchProduct(e)}></SearchOutlined>
    
          </form>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="active background">
            <Link to="/"> Trang Chủ </Link>
          </li>
          <li className="active background">
            <Link to="/myOrder"> My Order </Link>
            <HddOutlined style={{color:'white', margin:'2px 10px 0 -7px', fontSize:'20px'}}/>
          </li>
          <li className=" background">
            <a href="https://zalo.me/0901954583" target="blank" className=" background"> Hotline </a>
            <PhoneOutlined style={{color:'white', margin:'2px 10px 0 -7px', fontSize:'20px'}}/>
          </li>
          {userInfo ? (
            <li onClick={() => setShowAccount2(!showAccount2)}>
              <Link>
                {userInfo.name}
                <DownOutlined style={{ fontSize: "14px" }} />
              </Link>
              {showAccount2 ? (
                <div className="menu-drop">
                  {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
                  <Link to="/myOrder">Đơn hàng</Link>
                  <Link onClick={() => handleSignout()}>Đăng xuất</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          ) : (
            <li onClick={() => setShowAccount(!showAccount)}>
              <Link className=" background">
                Tai Khoan
                <DownOutlined style={{ fontSize: "16px" }} />
              </Link>

              {showAccount ? (
                <div className="menu-drop">
                  <Link to="register">Đăng kí</Link>
                  <Link to="login">Đăng nhập</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          )}
          <li className="shop-cart background">
            <Link to="/cart" className="shop-cart">
              <span>Cart</span>
              <ShoppingCartOutlined
                style={{ fontSize: "30px" }}
              ></ShoppingCartOutlined>
              <span className="count"> {amount} </span>
            </Link>
          </li>
        </ul>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Header;
