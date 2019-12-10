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
						<nav
							className="gtco-nav"
							role="navigation"
							style={{ backgroundImage: "url(images/img_6.jpg)" }}>
							<div className="gtco-container">
								<div className="row">
									<div className="col-5 col-xs-12">
										<div id="gtco-logo">
											<Link to="/">
												<span>Best Health International</span>
											</Link>
										</div>
									</div>
									<div className="col-7 text-right menu-1">
										<ul>
											<li>
												<Link to="/usuarios">Mi cuenta</Link>
											</li>
											{/* <li>
												<Link to="/ingresareclamo">PRUEBAS</Link>
											</li> */}
											<li>
												<Link to="/ingresareclamo">Crear Reclamo</Link>
											</li>
											<li>
												<Link to="/personas">Personas</Link>
											</li>
											<li>
												<Link to="/proveedores">Proveedores</Link>
											</li>
											<li>
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
								</div>
							</div>
						</nav>
					);
				}}
			</Context.Consumer>
		);
	}
}
