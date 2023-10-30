import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";

const HomePage = () => {

  const [menu, changeMenu] = useState(0);

  return (
    <>
      <div>
        <Navbar />
        <SideMenu changeMenu={changeMenu} />
        <div>
          {menu === 0 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Generate Content</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Generate Content</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}

                {/* <!--Row--> */}
                <div className="row display-flex justify-content-center">
                  <div className="col-lg-6 col-md-12">

                    {/* {{-- Tab 1 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate CV</h3>
                      </div>
                    </div>

                    {/* {{-- Tab 2 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate Contract</h3>
                      </div>
                    </div>

                    {/* {{-- Tab 3 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate Synthesis</h3>
                      </div>
                    </div>

                    {/* {{-- Tab 4 --}} */}
                    <div className="card">
                      <div className="card-header flex justify-content-center" onClick={() => changeMenu(2)}>
                        <h3 className="card-title">Generate Email</h3>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--End row--> */}
              </div>
            </div>
          )}
          {menu === 1 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Chat</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item active">Chat</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}

                <div className="row display-flex justify-content-center">
                  <div className="col-lg-8 col-md-12">
                    <div>
                      <div>
                        <div className="flex justify-content-center">
                          <input type="text" className="search-text" placeholder="Ask me?" />
                          <input type="button" className="search-btn btn-info" value="Send" />
                        </div>
                      </div>
                      <div className="flex justify-content-center">
                        <textarea id="chatText" name="chatText" className="textarea-text"  disabled/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {menu === 2 && (
            <div className="app-content">
              <div className="side-app">
                {/* <!--Page header--> */}
                <div className="page-header">
                  <div className="page-leftheader">
                    <h4 className="page-title">Generate Content</h4>
                    <ol className="breadcrumb pl-0">
                      <li className="breadcrumb-item" onClick={ () => changeMenu(0)}>Generate Content</li>
                      <li className="breadcrumb-item active" aria-current="page">Generate CV</li>
                    </ol>
                  </div>
                </div>
                {/* <!--End Page header--> */}

                <div className="row display-flex justify-content-center">
                  <div className="col-lg-8 col-md-12">
                    <div>
                      <div className="flex justify-content-center">
                        <textarea id="chatText" name="chatText" className="textarea-text" />
                      </div>
                      <div>
                        <div className="flex justify-content-center">
                          <input type="button" className="textarea-btn btn-info" value="Edit" />
                          <input type="button" className="textarea-btn btn-info" value="Download" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
