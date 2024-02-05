import React from "react";

const SideMenu = ( props ) => {

  const { changeMenu } = props;

  return (
    <aside className="app-sidebar">
      <ul className="side-menu">
        <li>
          <div className="side-menu__item" onClick={ () => {changeMenu(0)}}><span className="side-menu__label">Generate Content</span></div>
        </li>
    
        <li>
          <div className="side-menu__item" onClick={() => {changeMenu(1)}}><span className="side-menu__label">Chat</span></div>
        </li> 

        <li>
          <div className="side-menu__item" onClick={() => {changeMenu(3)}}><span className="side-menu__label">Invites</span></div>
        </li> 

        <li>
          <div className="side-menu__item" onClick={() => {changeMenu(4)}}><span className="side-menu__label">Key Metadata</span></div>
        </li> 
      </ul>
    </aside>
  )
}

export default SideMenu
