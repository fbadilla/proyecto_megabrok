import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";

export default class ModalProveedor extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };

		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;

					return (
						<div
							className="modal fade"
							id="ModalAddProveedor"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-md" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Ingresar nuevo proveedor </label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="row form-group">
												<div className="col-10 offset-1">
													<div className="feature-left">
														<span className="icon">
															<i className="ti-user" />
														</span>
														<div className="feature-copy">
															<label>Nombre </label>
															<input
																name="nombre_proveedor"
																id="nombre_proveedor"
																placeholder="Ingrese nombre"
																type="text"
																className="form-control"
																value={store.proveedor.nombre_proveedor}
																onChange={e => actions.handleProveedor(e)}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-10 offset-1">
													<div className="feature-left">
														<span className="icon">
															<i className="ti-package" />
														</span>
														<div className="feature-copy">
															<label>Grupo</label>
															<input
																name="grupo"
																id="grupo"
																placeholder="Ingrese grupo"
																type="text"
																className="form-control"
																value={store.proveedor.grupo}
																onChange={e => actions.handleProveedor(e)}
															/>
														</div>
													</div>
												</div>
											</div>

											<div className="row form-group">
												<div className="col-10 offset-1">
													<div className="feature-left">
														<span className="icon">
															<i className="ti-archive" />
														</span>
														<div className="feature-copy">
															<label>Rut</label>
															<input
																name="rut_proveedor"
																id="rut_proveedor"
																placeholder="Ingrese rut"
																type="text"
																className="form-control"
																value={store.proveedor.rut_proveedor}
																onChange={e => actions.handleProveedor(e)}
															/>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.postAddProveedor();
											}}
											data-dismiss="modal">
											Ingresar
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
ModalProveedor.propTypes = {
	history: PropTypes.array
};
