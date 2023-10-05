import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Productos from "../productos/Productos";
import Conceccionarios from "../conceccionarios/Conceccionarios";
import Proveedores from "../proveedores/Proveedores";
import Empleados from "../empleados/Empleados";
import Ventas from "../ventas/Ventas";

const NavBar = () => {
    return (
        <Fragment>
            <Router>
                <nav>
                    <div className="log">
                        <div className="canvas">
                            <canvas id="canvas"></canvas>
                        </div>
                        <h1>Alejandro</h1>
                    </div>
                    <div className="links">
                        <ul>
                            <li>
                                <Link to="/productos">Productos</Link>
                            </li>
                            <li>
                                <Link to="/conceccionarios">
                                    Conceccionarios
                                </Link>
                            </li>
                            <li>
                                <Link to="/proveedores">Proveedores</Link>
                            </li>
                            <li>
                                <Link to="/empleados">Empleados</Link>
                            </li>
                            <li>
                                <Link to="/ventas">Ventas</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="salir">
                        <Link to="/login">
							<span>Logout</span><svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_10_246)"><path d="M23.3333 13.3333V9.99999C23.3333 9.11593 22.9821 8.26809 22.357 7.64297C21.7319 7.01785 20.8841 6.66666 20 6.66666H8.33333C7.44928 6.66666 6.60143 7.01785 5.97631 7.64297C5.35119 8.26809 5 9.11593 5 9.99999V30C5 30.884 5.35119 31.7319 5.97631 32.357C6.60143 32.9821 7.44928 33.3333 8.33333 33.3333H20C20.8841 33.3333 21.7319 32.9821 22.357 32.357C22.9821 31.7319 23.3333 30.884 23.3333 30V26.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 20H35L30 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 25L35 20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_10_246"><rect width="40" height="40" fill="white"/></clipPath></defs></svg>
						</Link>
                    </div>
                </nav>
                <Switch>
                    <Route path="/productos">
                        <Productos />
                    </Route>
                    <Route path="/conceccionarios">
                        <Conceccionarios />
                    </Route>
                    <Route path="/proveedores">
                        <Proveedores />
                    </Route>
                    <Route path="/empleados">
                        <Empleados />
                    </Route>
                    <Route path="/ventas">
                        <Ventas />
                    </Route>
                    <Route path="/login">
                        <h1>login prro</h1>
                    </Route>
                </Switch>
            </Router>
        </Fragment>
    );
};

export default NavBar;
