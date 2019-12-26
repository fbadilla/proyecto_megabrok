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

export class FormDoc extends React.Component {
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
		this.actionsContext.getaccount();
		this.actionsContext.getServicios();
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
														onClick={() =>
															actions.enviarReclamo(store.formulario, store.servicios)
														}>
														Enviar reclamo
													</button>
												</div>
											</div>
											<form
												action="#"
												onSubmit={e => actions.handleFormulario(e, this.props.history)}>
												<div className="row form-group">
													<div className="col-md-6">
														<div className="feature-left">
															<span className="icon">
																<i className="ti-user" />
															</span>
															<div className="feature-copy">
																<label>Nombre Completo Paciente</label>
																<input
																	name="nameReclamo"
																	readOnly
																	className="form-control"
																	id="static"
																	placeholder={store.formulario.nameReclamo}
																	type="text"
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
																	placeholder={store.formulario.numpoliza}
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
												<div className="row">
													<div className="col-md-12">
														<ListaServiciosDetalle />
													</div>
												</div>
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
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
FormDoc.propTypes = {
	history: PropTypes.object
};
