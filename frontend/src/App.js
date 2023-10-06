import React, { Fragment } from "react";
import "./App.css";
import NavBar from "./components/nav_bar/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login/Login";

function App() {
    return (
        <Fragment>
             <Router>
            <Switch>
                <Route path="/productos">
                    <NavBar/>
                </Route>
                <Route path="/">
                    <Login/>
                </Route>
            </Switch>
            </Router>
        </Fragment>
    );
}

export default App;
