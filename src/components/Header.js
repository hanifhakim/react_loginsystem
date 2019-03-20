import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onLogoutUser } from "../actions";

class Header extends Component {
  // onLogoutUser = () => {
  //   this.props.onLogout();
  // };

  render() {
    const { username } = this.props.user;
    if (username === "") {
      return (
        <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light mb-3">
          <div className="container">
            <Link className="navbar-brand" to="/">
              RSCH COPY
            </Link>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarNav2"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse row p-2" id="navbarNav2">
              <form className="input-group col-12 col-md-7 ml-auto">
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </form>
              <ul className="navbar-nav ml-auto col-12 col-md-5">
                <li className="nav-item mt-2">
                  <Link className="nav-a" to="/">
                    All Product
                  </Link>
                </li>

                <li className="nav-item m-1">
                  <Link className="nav-a" to="/register">
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link className="nav-a" to="/login">
                    <button className="btn btn-success">Login</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <div>
          {/* <Redirect to="/" /> */}
          <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-info mb-3">
            <div className="container">
              <Link className="navbar-brand text-dark" to="/">
                RSCH COPY
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse row p-2" id="navbarNav2">
                <form className="input-group col-12 col-md-7 ml-auto">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search"
                  />
                  <button className="btn btn-outline-dark">Search</button>
                </form>
                <ul className="navbar-nav ml-auto col-12 col-md-5">
                  <li className="nav-item mt-2">
                    <Link className="nav-link text-dark" to="/">
                      All Product
                    </Link>
                  </li>
                  <li className="nav-item dropdown mt-2">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle text-capitalize text-dark"
                      data-toggle="dropdown"
                    >
                      Hallo {username}
                    </Link>
                    <div className="dropdown-menu">
                      <Link to="/manageproduct" className="dropdown-item text-dark">
                        Manage Product
                      </Link>
                      <Link to="/cart" className="dropdown-item text-dark">
                        Cart
                      </Link>
                      <button
                        onClick={this.props.onLogoutUser}
                        className="dropdown-item text-dark"
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                  {/* <li className="nav-item m-1">
                                    <Link className="nav-link" to="/register"><button className="btn btn-primary">Register</button></Link>
                                </li>
                                <li className="nav-item m-1">
                                    <Link className="nav-link" to="/login"><button className="btn btn-success">Login</button></Link>
                                </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  { onLogoutUser }
)(Header);
