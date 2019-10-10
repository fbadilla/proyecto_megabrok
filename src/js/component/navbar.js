import React from "react";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
	render() {
		return (
			<nav className="gtco-nav" role="navigation">
				<div className="gtco-container">
					<div className="row">
						<div className="col-sm-4 col-xs-12">
							<div id="gtco-logo">
								<a href="index.html">
									Megabrok <em>.</em>
								</a>
							</div>
						</div>
						<div className="col-xs-8 text-right menu-1">
							<ul>
								<li>
									<Link to="/usuarios">Mi cuenta</Link>
								</li>
								<li>
									<Link to="/anuncios">Personas</Link>
								</li>
								<li>
									<Link to="/">Plan de Ingreso</Link>
								</li>

								<li className="has-dropdown">
									<a href="#">Ingresar</a>
									<ul className="dropdown">
										<li>
											<Link to="/">Agente</Link>
										</li>
										<li>
											<Link to="/">Poliza</Link>
										</li>
										<li>
											<Link to="/ingresareclamo">Reclamo</Link>
										</li>
									</ul>
								</li>
								<li className="has-dropdown">
									<a href="#">Reclamaciones</a>
									<ul className="dropdown">
										<li>
											<Link to="/">Listar Reclamos</Link>
										</li>
										<li>
											<Link to="/creargrupo">Agregar</Link>
										</li>
										<li>
											<Link to="/creargrupo">Modificar</Link>
										</li>
									</ul>
								</li>
								<li className="btn-cta">
									<Link to="/">
										<span>Get started</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}
