import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SearchInput from "./Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <FaBagShopping /> E-Commerce app
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to={`/categories`}>
                    All Categories
                  </Link>
                  {categories?.map((c) => {
                    return (
                      <li key={c._id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role == 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          className="dropdown-item"
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart.length} showZero>
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
