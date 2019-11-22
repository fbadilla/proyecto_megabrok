import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export default class ModalDocumento extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datedoc: "",
			nombre_proveedor: "",
			tipodoc: "",
			numdoc: "",
			montodoc: "",
			detalle_tratamiento: "",
			pago: "",
			docfile: null
		};
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
							className="modal"
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
										<form action="#">
											<div className="form-row">
												<div className="col-md-6">
													<div className="feature-left">
														<span className="icon2">
															<i className="ti-calendar" />
														</span>
														<div className="feature-copy">
															<label>Fecha </label>
															<input
																name="datedoc"
																id="datedoc"
																type="date"
																className="form-control"
																onChange={e => actions.handledocumento(e)}
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
																onChange={e => actions.handledocument(e)}
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
															<select
																className="form-control"
																id="tipodoc"
																name="tipodoc"
																onChange={e => actions.handledocumento(e)}>
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
																onChange={e => actions.handleChange(e)}
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
																onChange={e => actions.handledocument(e)}
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
																onChange={e => actions.handledocument(e)}
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
															<select
																className="form-control"
																name="pago"
																id="pago"
																onChange={e => actions.handledocument(e)}>
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
												actions.handleEnvioDocumento({});
											}}
											data-dismiss="modal">
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
ModalDocumento.propTypes = {
	history: PropTypes.array
};
