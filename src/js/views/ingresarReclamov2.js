import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ModalDocumento from "../component/modalDocumento";
import { ListaDocumentos } from "../component/listaDocumentos";
import { ListaAsegurados } from "../component/listaAsegurados";
import { SearchComponent } from "../component/search";
import { FormReclamo } from "../component/formReclamo";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";

export class ingresarReclamov2 extends React.Component {
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
										<td>{item.id_persona__rutCliente}</td>
										<td>
											{item.id_persona__nombreCliente} {item.id_persona__apellidoCliente}
										</td>
										<td> {item.tipo_asegurado}</td>
										<td>
											<button
												type="button"
												className="btn btn-primary"
												onClick={() => {
													actions.handleAseguradoSelected(item);
												}}>
												Generar reclamo
											</button>
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
											<div className="col-md-10 ">
												<h2>Bucar datos del cliente por poliza</h2>

												<form
													action="#"
													onSubmit={e => actions.handleSearchPersona(e, this.props.history)}>
													<div className="row form-group">
														<h4>Busqueda</h4>
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
													</div>
													<div className="row">
														<div className="form-group">
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
												<h3>Generar Reclamo</h3>
												<FormReclamo />
											</div>
										</div>
									</div>
								</div>
							</div>
							<ModalDocumento />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
ingresarReclamov2.propTypes = {
	history: PropTypes.object
};
