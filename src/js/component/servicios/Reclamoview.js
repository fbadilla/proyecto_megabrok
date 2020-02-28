import React, { Component, Fragment } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export class ReclamoView extends Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	notifyNotFile = () =>
		toast.error("⚠️ Este servicio no posee Archivo Adjunto, carge un archivo haciendo click en la imagen del PDF", {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
	notify = () =>
		toast.info("Se han Realizado las modificaciones", {
			position: "bottom-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
	notify2 = () =>
		toast.info("⚠️ Este reclamo ya se envió, solo puedes modificar su estado", {
			position: "bottom-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
	notifySend = () =>
		toast.success("✅ Recuerda llenar todos los campos antes de enviar el formulario", {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
	notifySend2 = () =>
		toast.error("❌ este reclamo ya se envio bajo el Nº" + this.storeContext.formulario.num_claim, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					let activo = store.formulario.estado == "Enviado";
					return (
						<Fragment>
							<form action="#" onSubmit={e => actions.handleEnvioMod(e, this.props.history)}>
								<div className="row form-group">
									<div className="col-md-12">
										<h4>Datos Personales del Paciente</h4>
									</div>
									<div className="col-md-4">
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
														" " +
														store.formulario.apellidoReclamante
													}
													type="text"
													readOnly
												/>
											</div>
										</div>
									</div>
									<div className="col-md-2">
										<div className="feature-left">
											<div className="feature-copy">
												<label>Numero Poliza</label>
												<input
													name="numPoliza"
													id="numPoliza"
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
									<div className="col-md-12">
										<h4>Detalles del Diagnostico / Accidente</h4>
									</div>
									<div className="col-md-4">
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
													readOnly={store.formulario.estado == "Enviado" ? "activo" : ""}
												/>
											</div>
										</div>
									</div>
									<div className="col-md-2">
										<div className="feature-left">
											<div className="feature-copy">
												<label>Estado Reclamo </label>
												<select
													className="form-control"
													id="name_estado"
													name="estado"
													value={
														store.formulario.estado == "Pendiente"
															? store.formulario.estado
															: store.formulario.estado
													}
													onChange={e => actions.handleForm(e)}>
													<option>Pendiente</option>
													<option>Enviado</option>
													<option>Aprobada</option>
													<option>Rechazada</option>
												</select>
											</div>
										</div>
									</div>
									<div className="col-md-2">
										<div className="feature-left">
											<div className="feature-copy">
												<label>Fecha de Recepción</label>
												<input
													name="Fecha_recepcion"
													id="Fecha_recepcion"
													value={store.formulario.Fecha_recepcion}
													onChange={e => actions.handleForm(e)}
													type="date"
													className="form-control"
													readOnly={store.formulario.estado == "Enviado" ? "activo" : ""}
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
											onClick={e => {
												store.formulario.estado == "Enviado" ? this.notify2() : this.notify();
											}}
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
											disabled={activo}
											data-toggle="modal"
											data-target="#modalservicio"
											onClick={e => actions.cleanService()}>
											<i className="ti-plus" /> Agregar Servicio
										</button>
									</div>
								</div>
							</form>
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
ReclamoView.propTypes = {
	history: PropTypes.object
};
