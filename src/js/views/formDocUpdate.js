import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import ModalDeleteServicio from "../component/servicios/eliminar/modalDeleteServicio";
import ModalDeleteDetalleServicio from "../component/servicios/eliminar/modalDeleteDetalleServicio";
import ModalDeleteDocumento from "../component/documentos/eliminar/modalDeleteDocumento";
import ModalArchivo from "../component/servicios/modificar/modalArchivo";
import ModalProveedorUpdate from "../component/servicios/modificar/modalProvedoorUpdate";
import ModalServicio from "../component/servicios/crear/modalServicio";
import ModalServicioUpdate from "../component/servicios/modificar/modalServicioUpdate";
import ModalDetalleServicio from "../component/servicios/crear/modalDetalleServicio";
import { ListaServiciosDetalle } from "../component/servicios/listaServiciosDetalles";
import ModalDetalleServicioUpdate from "../component/servicios/modalDetalleServicioUpdate";
import ModalEnvioReclamo from "../component/reclamos/modalEnvioReclamo";

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
					let visible = "visible";
					if (store.formulario.estad == "Enviado") visible = "invisible";

					return (
						<Fragment>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row justify-content-center">
										<div className="col-md-10 ">
											<div className="row">
												<div className="col-md-4">
<<<<<<< HEAD
													<h2>Reclamo {store.formulario.num_claim}</h2>
=======
													<h2>Reclamo Nº {store.formulario.num_claim}</h2>
>>>>>>> d019cef7bfaf948873a52a9fcceaa6e6367b7322
												</div>
												<div className={visible}>
													<div className="col-md-4">
														<button
															type="button"
															className="btn btn-primary"
															data-toggle="modal"
															data-target="#ModalEnvioReclamo">
															Enviar reclamo
														</button>
													</div>
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
																	<option>Enviado</option>
																	<option>Aprobada</option>
																	<option>Rechazada</option>
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
														<h4>Servicios Prestados</h4>
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
							<ModalDeleteDetalleServicio />
							<ModalDeleteDocumento />
							<ModalDetalleServicioUpdate />
							<ModalProveedorUpdate />
							<ModalEnvioReclamo />
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
