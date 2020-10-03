import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from "axios";
import $ from 'jquery';
import { apiUrl } from "../config.json"
import { toast } from 'react-toastify';
import { logout } from './../services/logoutService';
import * as auth from './../services/authService';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { ImUser } from "react-icons/im";
class NavBar extends Component {
  state = {};

  logout = async () => {
    try {
      if (auth.getJwt()) {
        console.log(auth.getJwt());
        const response = await logout(auth.getJwt());
        console.log(response);
        auth.removeJwt();
        window.location = "/";
      }

    } catch (e) {
      console.log(e.message);
      console.log(e.response);
      toast.error("Something went wrong!!");
    }
  }

  showSidebar = (e) => {
    $("#mainNav").toggleClass("active-sidebar");
    $("#main-content").toggleClass("active-sidebar");
  }

  render() {
    console.log("here goes full url");

    const { user } = this.props;
    console.log("Here goes user in nav");

    console.log(user);
    return <React.Fragment>
      <nav className="navbar navbar-b navbar-trans navbar-expand-md fixed-top bg-dark-blue" id="mainNav">
        <div className="container-fluid">

          <div className="custom-menu">
            <button
              onClick={this.showSidebar}
              type="button" id="sidebarCollapse" className="btn btn-primary">
              <span className="fa fa-bars"></span>
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>

          <div className="navBarSidebar" id="navBarSidebar" >
            <div className="sidebar-header">
              <h3>Bootstrap Sidebar</h3>
            </div>
            <ul>
              <li>Some dummy items goes here</li>
              <li>Some dummy items goes here</li>
              <li>Some dummy items goes here</li>
            </ul>
          </div>
          <div
            className="navbar-collapse collapse justify-content-end"
            id="navbarDefault"
          >
            <ul className="navbar-nav">



              <li className="nav-item nav-profile-wrap">
                {user
                  &&
                  <React.Fragment>

                    <div className="dropdown">
                      <button className="btn btn-primary dropdown-toggle nav-custom-btn" type="button" data-toggle="dropdown">
                        <img className="nav-profile-img" src={user.profileImg} alt={user.userName} />
                        <span className="text-white">{user.userName}</span>
                      </button>
                      <ul className="dropdown-menu profile-dropdown">
                        <li>
                          <Link to="/profile">
                            <ImUser />
                            <span className="link-text">
                              Profile
                             </span>
                          </Link>
                        </li>
                        <li className="nav-item nav-logout-wrap">
                          {user
                            &&
                            <a href="javascript:void(0);" className="nav-btn text-white d-flex align-items-center" onClick={this.logout}>
                              <RiLogoutCircleRLine />
                              <span className="link-text">Logout</span>
                            </a>
                          }
                        </li>
                      </ul>
                    </div>

                  </React.Fragment>

                }
              </li>

            </ul>
          </div>
        </div>
      </nav>



    </React.Fragment>;
  }
}

export default NavBar;
