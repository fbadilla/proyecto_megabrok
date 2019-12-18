import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ModalServicioUpdate from "../component/modalServicioUpdate";
import { ListaDocumentos } from "../component/listaDocumentos";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";
import ModalServicio from "../component/modalServicio";
import { ListaServicios } from "../component/listaServicios";
import ModalDeleteServicio from "../component/modalDeleteServicio";
import ModalDeleteDocumento from "../component/modalDeleteDocumento";
import ModalArchivo from "../component/modalArchivo";

export class FormDocUpdate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nameReclamo: "",
			rut: "",
			numpoliza: "",
			detalle_diagnostico: ""
		};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	componentDidMount() {
		// this.actionsContext.getServicios();
		this.actionsContext.getaccount();
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;

					return (
						<Fragment>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row justify-content-center">
										<div className="col-md-10 ">
											<h2>Reclamo Nº {store.formulario.reclamo_id}</h2>
											<form
												action="#"
												onSubmit={e => actions.handleEnvioMod(e, this.props.history)}>
												<div className="row form-group">
													<div className="col-md-8">
														<h4>Datos Personales del Paciente</h4>
													</div>
													<div className="col-md-6">
														<div className="feature-left">
															<span className="icon">
																<i className="ti-user" />
															</span>
															<div className="feature-copy">
																<label>Nombre Completo Paciente</label>
																<input
																	name="nameReclamo"
																	className="form-control"
																	id="nameReclamo"
																	onChange={e => actions.handleForm(e)}
																	value={
																		store.formulario
																			.asociacion_id__id_persona__nombre +
																		store.formulario
																			.asociacion_id__id_persona__apellido
																	}
																	type="text"
																	readOnly
																/>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="feature-left">
															<div className="feature-copy">
																<label>Numero Poliza</label>
																<input
																	name="numpoliza"
																	id="disabledTextInput"
																	onChange={e => actions.handleForm(e)}
																	value={
																		store.formulario
																			.asociacion_id__id_poliza__nun_poliza
																	}
																	type="text"
																	className="form-control"
																	readOnly
																/>
															</div>
														</div>
													</div>
												</div>

												<div className="row form-group">
													<div className="col-md-8">
														<h4>Detalles del Diagnostico / Accidente</h4>
													</div>
													<div className="col-md-6">
														<div className="feature-left">
															<span className="icon">
																<i className="ti-clipboard" />
															</span>
															<div className="feature-copy">
																<label>Diagnostico o tipo de Accidente</label>
																<input
																	name="detalle_diagnostico"
																	id="detalle_diagnostico"
																	onChange={e => actions.handleForm(e)}
																	value={store.formulario.detalle_diagnostico}
																	type="text"
																	className="form-control"
																/>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="feature-left">
															<div className="feature-copy">
																<label>Estado Reclamo </label>
																<select
																	className="form-control"
																	id="name_estado"
																	name="name_estado"
																	value={store.formulario.name_estado}
																	onChange={e => actions.handleForm(e)}>
																	<option>Pendiente</option>
																	<option>Aprobada</option>
																	<option>Rechazada</option>
																	<option>Anulada</option>
																</select>
															</div>
														</div>
													</div>
												</div>
												<div className="row  form-group">
													<div className="col-md-3 offset-md-7">
														<input
															type="submit"
															value="Modificar"
															className="btn btn-primary"
														/>
													</div>
												</div>
												<div className="row form-group">
													<div className="col-md-8">
														<h4>Datos sobre los Servicios Prestados</h4>
													</div>
													<div className="col-md-6">
														<button
															type="button"
															className="btn btn-primary"
															data-toggle="modal"
															data-target="#modalservicio">
															<i className="ti-plus" /> Agregar Servicio
														</button>
													</div>
												</div>
												<ListaServicios />
											</form>
										</div>
									</div>
								</div>
							</div>
							<ModalServicioUpdate />
							<ModalServicio />
							<ModalArchivo />
							<ModalDeleteServicio />
							<ModalDeleteDocumento />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
FormDocUpdate.propTypes = {
	history: PropTypes.object
};
