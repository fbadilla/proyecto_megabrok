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
import { ReclamoView } from "../component/servicios/Reclamoview";
import { toast } from "react-toastify";

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
												<div className="col-md-4 offset-md-4 ">
													<button
														type="button"
														className="btn btn-primary"
														data-toggle="modal"
														data-target="#ModalEnvioReclamo"
														onClick={e => {
															store.formulario.name_estado == "Enviado"
																? this.notifySend2()
																: this.notifySend();
														}}>
														Enviar reclamo
													</button>
												</div>
											</div>
											<ReclamoView />

											<ListaServiciosDetalle />
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
FormDoc.propTypes = {
	history: PropTypes.object
};
