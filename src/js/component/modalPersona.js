import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export default class ModalPersona extends React.Component {
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
							id="ModalAddPersona"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-xl" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Ingresar nuevo cliente </label>
										</h5>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="row form-group">
												<div className="col-md-12">
													<h4>Datos Personales</h4>
												</div>
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-user" />
														</span>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Nombres</label>
															<input
																name="nombre"
																className="form-control"
																id="nombre"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Apellidos</label>
															<input
																name="apellido"
																id="apellido"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label> Rut</label>
															<input
																name="rut"
																id="rut"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-folder" />
														</span>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Nombre de Pila</label>
															<input
																name="nombrePila"
																className="form-control"
																id="nombrePila"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Fecha Nacimiento</label>
															<input
																name="fecha_nacimiento_persona"
																id="fecha_nacimiento_persona"
																onChange={e => actions.handleFormPersona(e)}
																type="date"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label> Isapre</label>
															<input
																name="isapre"
																id="isapre"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-md-12">
													<h4>Datos de Contacto</h4>
												</div>
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-folder" />
														</span>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>E-mail Primario</label>
															<input
																name="emailPrimario"
																className="form-control"
																id="emailPrimario"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>E-mail Secundario</label>
															<input
																name="emailSecundario"
																className="form-control"
																id="emailSecundario"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2" />
													</div>
												</div>
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-home" />
														</span>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Direccion particular</label>
															<input
																name="direccionParticular"
																className="form-control"
																id="direccionParticular"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Direccion Comercial</label>
															<input
																name="direccionComercial"
																id="direccionComercial"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy" />
													</div>
												</div>
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-mobile" />
														</span>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Telefono Celular</label>
															<input
																name="celular"
																className="form-control"
																id="celular"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Telefono Casa</label>
															<input
																name="telefonoCasa"
																id="telefonoCasa"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label> Telefono Oficina</label>
															<input
																name="telefonoOficina"
																id="telefonoOficina"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-md-12">
													<h4>Informacion Adicional</h4>
												</div>
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-id-badge" />
														</span>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Nombre Conyuge</label>
															<input
																name="nombreConyuge"
																className="form-control"
																id="nombreConyuge"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Telefono Conyuge</label>
															<input
																name="telefonoConyuge"
																id="telefonoConyuge"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>E-mail Conyuge</label>
															<input
																name="emailConyuge"
																id="emailConyuge"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-briefcase" />
														</span>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Nombre Secretaria</label>
															<input
																name="nombreSecretaria"
																className="form-control"
																id="nombreSecretaria"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>E-mail Secretaria</label>
															<input
																name="emailSecretaria"
																id="emailSecretaria"
																onChange={e => actions.handleFormPersona(e)}
																type="date"
																className="form-control"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-md-12">
													<h4>Asociacion Poliza</h4>
												</div>
												<div className="col-md-1">
													<div className="feature">
														<span className="icon">
															<i className="ti-archive" />
														</span>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Agente</label>
															<input
																name="direccionParticular"
																className="form-control"
																id="direccionParticular"
																onChange={e => actions.handleFormPersona(e)}
																type="text"
															/>
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Fecha</label>
															<input
																name="direccionComercial"
																id="direccionComercial"
																onChange={e => actions.handleFormPersona(e)}
																type="date"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Tipo de asegurado </label>
															<select
																className="form-control"
																id="name_estado"
																name="name_estado"
																onChange={e => actions.handleFormPersona(e)}>
																<option>Dependiente</option>
																<option>Conyuge</option>
																<option selected>Propietario</option>
																<option>Guardian</option>
															</select>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-primary" data-dismiss="modal">
											Cerrar
										</button>
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.postAddPersona();
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
ModalPersona.propTypes = {
	history: PropTypes.array
};
