import React, { Component, Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

export class ListaPersonas extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}

	render() {
		return (
			<Animated animationIn="fadeInLeft" animationOut="bounceOutLeft" animationInDuration={500} isVisible={true}>
				<Context.Consumer>
					{({ store, actions }) => {
						const foo = () => {
							if (store.filtro) {
								return store.coleccion.slice(0).map((item, i) => {
									return (
										<tr key={i}>
											<td scope="row">{item.nombre + item.apellido}</td>
											<td>{item.rut}</td>
											<td>{item.emailPrimario}</td>
											<td>{item.direccionParticular}</td>
											<td>{item.celular + " / " + item.telefonoCasa}</td>
											<td>{item.telefonoOficina}</td>
											<td>
												<button
													type="button"
													className="btn btn-primary2"
													data-toggle="modal"
													data-target="#modalProveedorUpdate"
													onClick={() => actions.handleUpdateProveedor(item)}>
													<i className="ti-marker-alt" />
												</button>
											</td>
											<td>
												<button
													type="button"
													className="btn btn-primary3"
													data-toggle="modal"
													data-target="#ModalDeleteProveedor"
													//onClick={() => actions.handleDelete(item.id)}
												>
													<i className="ti-trash" />
												</button>
											</td>
										</tr>
									);
								});
							} else {
								return "";
							}
						};
						// -------------------------------------------------------------
						if (store.personas.length > 0) {
							return (
								<Fragment>
									<div className="gtco-section ">
										<div className="row">
											<div className="col-md-10 ">
												<form action="#" onSubmit={e => actions.handleFiltroPersona(e)}>
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
																		placeholder=""
																		type="text"
																		className="form-control"
																		onChange={e => actions.handleChange(e)}
																	/>
																</div>
															</div>
														</div>
														<div className="form-group">
															<div className="col-md-5">
																<input
																	type="submit"
																	value="buscar"
																	className="btn btn-primary"
																/>
															</div>
														</div>
													</div>
												</form>
											</div>
											<div className="gtco-section ">
												<div className="col-md-8">
													<table className="table">
														<thead>
															<tr>
																<th scope="col">Nombres</th>
																<th scope="col">Rut</th>
																<th scope="col">E-mail Primario</th>
																<th scope="col">Direccion Particular</th>
																<th scope="col">Telefonos </th>
																<th scope="col">Oficina </th>
																<th scope="col">Editar</th>
																<th scope="col">Eliminar</th>
															</tr>
														</thead>
														<tbody>{foo()}</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</Fragment>
							);
						} else {
							return "";
						}
					}}
				</Context.Consumer>
			</Animated>
		);
	}
}
ListaPersonas.propTypes = {
	history: PropTypes.object
};
