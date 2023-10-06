import React, { Fragment } from "react";
import "./App.css";
import NavBar from "./components/nav_bar/Nav";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/login/Login";

function App() {
    return (
        <Fragment>
             <Router>
            <Switch>
                
                    <Route path={"/productos"}>
                    {document.cookie ? <NavBar/> : <Redirect  to={"/"}/> }
                    </Route>
                    <Route path="/">
                    {document.cookie ? <Redirect  to={"/productos"} /> :  <Login/>  }
                    </Route>
            </Switch>
            </Router>
        </Fragment>
    );
}

export default App;
