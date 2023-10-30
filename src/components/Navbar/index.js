import React from "react";
import Logo from "../../public/images/brand/logo.png"
import Logout from "../../public/images/svgs/logout-variant.svg"
// import Logout from "../../public/images/"
// import { Switch, Route, Redirect } from 'react-router-dom'
// import Cookies from 'js-cookie'
// import { Redirect } from 'react-router-dom'
// import './index.css'

const Navbar = () => {
  return (
    <>
      <div className="app-header header top-header">
        <div className="container-fluid">
          <div className="d-flex">
            <div className="header-brand">
              <img src={Logo} className="header-brand-img desktop-lgo" alt="Clont logo" />
            </div>

            {/* <div className="dropdown side-nav">
              <a aria-label="Hide Sidebar" className="app-sidebar__toggle nav-link icon mt-1" data-toggle="sidebar" href="#">
                <i className="fe fe-align-left"></i>
              </a> */}
            {/* <!-- sidebar-toggle--> */}
            {/* </div> */}
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown" >
                <a className="nav-link icon" href="{{ route('logout') }}">
                  <img src={Logout} className="desktop-lgo" alt="Client logo" />
                </a>
                {/* <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form> */}
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default Navbar
