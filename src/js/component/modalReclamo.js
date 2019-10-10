import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export default class ModalReclamo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date_doc: "",
			nombre_proveedor: "",
			tipodoc: "",
			numdoc: "",
			montodoc: "",
			detalle_tratamiento: "",
			pago: ""
		};
		this.props.history;
	}
	handleInputChange(event) {}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<div
							className="modal fade"
							id="modaldocumento"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Ingresar Servicio </label>
										</h5>
									</div>
									<div className="modal-body">
										<form action="#" onSubmit={e => actions.handleGrupo(e, this.props.history)}>
											<div className="form-row">
												<div className="col-md-6">
													<div className="feature-left">
														<span className="icon2">
															<i className="ti-calendar" />
														</span>
														<div className="feature-copy">
															<label>Fecha </label>
															<input
																name="date_doc"
																id="date_doc"
																type="date"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-5">
													<div className="feature-left">
														<span className="icon2">
															<i className="ti-package" />
														</span>
														<div className="feature-copy">
															<label>Proveedor</label>
															<input
																name="nombre_proveedor"
																id="nombre_proveedor"
																placeholder="Clinica de prueba"
																type="text"
																className="form-control"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-md-3">
													<div className="feature-left">
														<span className="icon2">
															<i className="ti-receipt" />
														</span>
														<div className="feature-copy">
															<label>Tipo </label>
															<select className="form-control" id="tipodoc">
																<option>Boleta</option>
																<option>Factura</option>
																<option>Otro</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-left">
														<span className="icon2">
															<i className="ti-archive" />
														</span>
														<div className="feature-copy">
															<label>Nº Doc</label>
															<input
																name="numdoc"
																id="numdoc"
																placeholder="666"
																//onChange={e => actions.handleMiembro(e)}
																type="number"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<span className="icon2">
															<i className="ti-money" />
														</span>
														<div className="feature-copy">
															<label>Monto</label>
															<input
																name="montodoc"
																id="montodoc"
																placeholder="$100.000.-"
																//onChange={e => actions.handleMiembro(e)}
																type="number"
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-md-8">
													<div className="feature-left">
														<span className="icon2">
															<i className="ti-write" />
														</span>
														<div className="feature-copy">
															<label>Descripción</label>
															<textarea
																name="detalle_tratamiento"
																className="form-control"
																rows="5"
																id="detalle_tratamiento"
																placeholder="Ingrese detalles del Tratamiento"
															/>

															<span>
																<i className="ti-pencil" />
																Ingresar los detalles del Tratamiento, Asistencia
																Prestada e Insumos Médicos
															</span>
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="feature-left">
														<div className="feature-copy">
															<label>Pago </label>
															<select className="form-control" id="pago">
																<option>COB</option>
																<option>REM</option>
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
												actions.SaveDocumento({
													date_doc: this.state.date_doc,
													nombre_proveedor: this.state.nombre_proveedor,
													tipodoc: this.state.media,
													numdoc: this.state.date_anuncio,
													montodoc: this.state.anuncio_nameID,
													detalle_tratamiento: this.state.ubication
												});
											}}
											data-dismiss="modal">
											{""}
											Ingresar Documento
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
ModalReclamo.propTypes = {
	history: PropTypes.object
};
