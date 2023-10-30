import React from "react"
import "./public/css/App.css"
import "./public/css/main.css"
import "./public/css/skins.css"
import "./public/css/style.css"
import "./public/css/sidemenu.css"

import {Route, Redirect} from "react-router-dom"

import Routes from "./container/routes"

const App = () => (
  <>
    <Route>
      <Route exact path="">
        <Redirect to="/homepage" />
      </Route>
      <Route path="/" component={Routes} />
    </Route>
  </>
)

export default App
