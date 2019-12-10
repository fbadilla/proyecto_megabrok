import React, { Component, Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

export class ListaProveedores extends Component {
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
											<td scope="row">{item.nombre_proveedor}</td>
											<td>{item.grupo}</td>
											<td>{item.rut_proveedor}</td>
											<td>
												<Link
													to="/update"
													className="btn btn-primary2"
													onClick={() => actions.handleModReclamo(item)}>
													<i className="ti-marker-alt" />
												</Link>
											</td>
											<td>
												<button
													type="button"
													className="btn btn-primary3"
													data-toggle="modal"
													data-target="#ModalDeleteProveedor"
													onClick={() => actions.handleDelete(item.id)}>
													<i className="ti-trash" />
												</button>
											</td>
										</tr>
									);
								});
							} else {
								return store.proveedores.slice(0).map((item, i) => {
									return (
										<tr key={i}>
											<td scope="row">{item.nombre_proveedor}</td>
											<td>{item.grupo}</td>
											<td>{item.rut_proveedor}</td>
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
													onClick={() => actions.handleDelete(item.id)}>
													<i className="ti-trash" />
												</button>
											</td>
										</tr>
									);
								});
							}
						};
						// -------------------------------------------------------------
						if (store.proveedores.length > 0) {
							return (
								<Fragment>
									<div className="gtco-section ">
										<div className="row">
											<div className="col-md-6">
												<div className="input-group  input-group-lg">
													<div className="input-group-prepend">
														<span className="input-group-text" id="basic-addon1">
															<i className="ti-search" />
														</span>
													</div>
													<input
														name="filtroValue"
														type="text"
														className="form-control"
														placeholder="Buscar"
														onChange={e => actions.handleFiltroProveedor(e)}
													/>
												</div>
											</div>
											<div className="col-md-2 offset-4">
												<div className="float-right">
													<button
														type="button"
														className="btn btn-primary"
														data-toggle="modal"
														data-target="#ModalAddProveedor">
														AGREGAR
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="gtco-section ">
										<table className="table">
											<thead>
												<tr>
													<th scope="col">Nombre</th>
													<th scope="col">Grupo</th>
													<th scope="col">Rut</th>
													<th scope="col">Editar</th>
													<th scope="col">Eliminar</th>
												</tr>
											</thead>
											<tbody>{foo()}</tbody>
										</table>
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
ListaProveedores.propTypes = {
	history: PropTypes.object
};
