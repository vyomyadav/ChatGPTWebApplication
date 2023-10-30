import React from "react"
import { Route } from "react-router-dom"
import HomePage from "../homepage"

const Routes = () => {
  return (
    <>
      <Route>
        <Route path="/homepage" component={HomePage} />
      </Route>
    </>
  )
}

export default Routes
