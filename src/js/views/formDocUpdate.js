import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import ModalDeleteServicio from "../component/modalDeleteServicio";
import ModalDeleteDocumento from "../component/modalDeleteDocumento";
import ModalArchivo from "../component/modalArchivo";
import ModalServicio from "../component/modalServicio";
import ModalServicioUpdate from "../component/modalServicioUpdate";
import ModalDetalleServicio from "../component/modalDetalleServicio";
ModalDetalleServicioUpdate;
import { ListaServiciosDetalle } from "../component/listaServiciosDetalles";
import ModalDetalleServicioUpdate from "../component/servicios/modalDetalleServicioUpdate";

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
		this.actionsContext.getServicios();
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
											<div className="row">
												<div className="col-md-4">
													<h2>Reclamo Nº {store.formulario.reclamo_id}</h2>
												</div>
												<div className="col-md-4">
													<button
														type="button"
														className="btn btn-primary"
														//data-toggle="modal"
														//data-target="#modalservicio"
														onClick={e => actions.enviarReclamo(store.formulario)}>
														Enviar reclamo
													</button>
												</div>
											</div>
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
																	value={
																		store.formulario.nombreReclamante +
																		store.formulario.apellidoReclamante
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
																	name="numPoliza"
																	id="disabledTextInput"
																	onChange={e => actions.handleForm(e)}
																	value={store.formulario.numPoliza}
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
																	name="estado"
																	value={store.formulario.estado}
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
															data-target="#modalservicio"
															onClick={e => actions.cleanService()}>
															<i className="ti-plus" /> Agregar Servicio
														</button>
													</div>
												</div>
												<ListaServiciosDetalle />
											</form>
										</div>
									</div>
								</div>
							</div>
							<ModalServicioUpdate />
							<ModalServicio />
							<ModalDetalleServicio />
							<ModalArchivo />
							<ModalDeleteServicio />
							<ModalDeleteDocumento />
							<ModalDetalleServicioUpdate />
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
