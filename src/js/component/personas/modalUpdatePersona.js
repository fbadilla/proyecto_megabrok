import React from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

export default class ModalUpdatePersona extends React.Component {
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
							id="modalPersonaUpdate"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-xl" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Modificar persona </label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
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
																value={store.persona.nombre}
																type="text"
																readOnly
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Apellidos</label>
															<input
																className="form-control"
																type="text"
																name="apellido"
																id="apellido"
																value={store.persona.apellido}
																readOnly
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
																type="text"
																name="nombrePila"
																className="form-control"
																id="nombrePila"
																value={store.persona.nombrePila}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Fecha Nacimiento</label>
															<input
																type="date"
																className="form-control"
																name="fechaNacimiento"
																id="fechaNacimiento"
																value={store.persona.fechaNacimiento}
																onChange={e => actions.handleFormPersona(e)}
																readOnly
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label> Isapre</label>
															<input
																type="text"
																className="form-control"
																name="isapre"
																id="isapre"
																value={store.persona.isapre}
																onChange={e => actions.handleFormPersona(e)}
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
																type="text"
																name="emailPrimario"
																className="form-control"
																id="emailPrimario"
																value={store.persona.emailPrimario}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>E-mail Secundario</label>
															<input
																type="text"
																name="emailSecundario"
																className="form-control"
																id="emailSecundario"
																value={store.persona.emailSecundario}
																onChange={e => actions.handleFormPersona(e)}
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
																type="text"
																name="direccionParticular"
																className="form-control"
																id="direccionParticular"
																value={store.persona.direccionParticular}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Direccion Comercial</label>
															<input
																type="text"
																className="form-control"
																name="direccionComercial"
																id="direccionComercial"
																value={store.persona.direccionComercial}
																onChange={e => actions.handleFormPersona(e)}
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
																type="text"
																name="celular"
																className="form-control"
																id="celular"
																value={store.persona.celular}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Telefono Casa</label>
															<input
																type="text"
																className="form-control"
																name="telefonoCasa"
																id="telefonoCasa"
																value={store.persona.telefonoCasa}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label> Telefono Oficina</label>
															<input
																type="text"
																className="form-control"
																name="telefonoOficina"
																id="telefonoOficina"
																value={store.persona.telefonoOficina}
																onChange={e => actions.handleFormPersona(e)}
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
																type="text"
																name="nombreConyuge"
																className="form-control"
																id="nombreConyuge"
																value={store.persona.nombreConyuge}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>Telefono Conyuge</label>
															<input
																type="text"
																className="form-control"
																name="telefonoConyuge"
																id="telefonoConyuge"
																value={store.persona.telefonoConyuge}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>E-mail Conyuge</label>
															<input
																type="text"
																className="form-control"
																name="emailConyuge"
																id="emailConyuge"
																value={store.persona.emailConyuge}
																onChange={e => actions.handleFormPersona(e)}
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
																type="text"
																name="nombreSecretaria"
																className="form-control"
																id="nombreSecretaria"
																value={store.persona.nombreSecretaria}
																onChange={e => actions.handleFormPersona(e)}
															/>
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy2">
															<label>E-mail Secretaria</label>
															<input
																type="text"
																className="form-control"
																name="emailSecretaria"
																id="emailSecretaria"
																value={store.persona.emailSecretaria}
																onChange={e => actions.handleFormPersona(e)}
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
												actions.putPersona();
											}}
											data-dismiss="modal">
											Modificar
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
ModalUpdatePersona.propTypes = {
	history: PropTypes.array
};
