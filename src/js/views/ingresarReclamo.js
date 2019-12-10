import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";

export class ingresarReclamo extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.cargarAsegurados();
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					const foo = () => {
						if (store.aseguradosFiltro.length > 0) {
							return store.aseguradosFiltro.map((item, i) => {
								return (
									<tr key={i}>
										<td>{item.id_poliza__nun_poliza}</td>
										<td>{item.id_persona__rut}</td>
										<td>{item.id_persona__nombre + " " + item.id_persona__apellido}</td>
										<td> {item.tipo_asegurado}</td>
										<td>
											<Link
												to="/formulariochile"
												className="btn btn-primary2"
												onClick={() => actions.handleAseguradoSelected(item)}>
												<i className="ti-marker-alt" />
											</Link>
										</td>
									</tr>
								);
							});
						} else {
							return "";
						}
					};
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<Fragment>
							<Animated
								animationIn="bounceInRight"
								animationOut="fadeOut"
								isVisible={true}
								data-animate-effect="fadeInLeft">
								<header
									id="gtco-header"
									className="gtco-cover gtco-cover-sm"
									role="banner"
									style={{ backgroundColor: "#457B9D" }}>
									<div className="overlay" />
									<div className="gtco-container" />
								</header>
							</Animated>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12">
											<h2>Buscar cliente</h2>
											<div className="col-md-10 ">
												<form
													action="#"
													onSubmit={e => actions.handleSearchPersona(e, this.props.history)}>
													<div className="row form-group">
														<div className="col-md-5">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-search" />
																</span>
																<div className="feature-copy">
																	<input
																		name="busqueda"
																		id="busqueda"
																		placeholder="n° poliza, rut, nombre"
																		type="text"
																		className="form-control"
																		onChange={e => actions.handleChange(e)}
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-5">
															<input
																type="submit"
																value="buscar"
																className="btn btn-primary"
															/>
														</div>
													</div>
												</form>

												<h3>Resultados </h3>
												<table className="table">
													<thead>
														<tr>
															<th scope="col">N° Poliza</th>
															<th scope="col">Rut</th>
															<th scope="col">Nombre</th>
															<th scope="col">Tipo Asegurado</th>
															<th scope="col">Generar Reclamo</th>
														</tr>
													</thead>
													<tbody>{foo()}</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
ingresarReclamo.propTypes = {
	history: PropTypes.object
};
