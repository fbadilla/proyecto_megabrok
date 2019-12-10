import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export class Navbar extends React.Component {
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.actioncontext = actions;
					this.storecontext = store;

					if (!store.access) {
						return (
							<nav className="gtco-nav" role="navigation">
								<div className="gtco-container">
									<div className="row">
										<div className="col-5 col-xs-12">
											<div id="gtco-logo">
												<Link to="/">
													<span>Best Health International</span>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</nav>
						);
					}

					return (
						<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
							<a className="navbar-brand" href="#">
								Best Health International
							</a>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarNavDropdown"
								aria-controls="navbarNavDropdown"
								aria-expanded="false"
								aria-label="Toggle navigation">
								<span className="navbar-toggler-icon" />
							</button>
							<div className="collapse navbar-collapse" id="navbarNavDropdown">
								<ul className="navbar-nav">
									<li className="nav-item dropdown">
										<Link to="/usuarios">Mi cuenta</Link>
									</li>
									{/* <li>
												<Link to="/ingresareclamo">PRUEBAS</Link>
											</li> */}
									<li className="nav-item dropdown">
										<Link to="/ingresareclamo">Crear Reclamo</Link>
									</li>
									<li className="nav-item dropdown">
										<Link to="/personas">Personas</Link>
									</li>
									<li className="nav-item dropdown">
										<Link to="/proveedores">Proveedores</Link>
									</li>
									<li className="nav-item dropdown">
										<Link to="/reclamos">Reclamos</Link>
									</li>
									<li className="btn-cta">
										<Link to="/">
											<span
												type="buttom"
												onClick={() => {
													actions.clean({});
												}}>
												Cerrar Sesion
											</span>
										</Link>
									</li>
								</ul>
							</div>
						</nav>
					);
				}}
			</Context.Consumer>
		);
	}
}
