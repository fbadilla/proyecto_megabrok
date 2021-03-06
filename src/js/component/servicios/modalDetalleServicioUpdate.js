import React from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";
import { toast } from "react-toastify";

export default class ModalDetalleServicioUpdate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	notify3 = () =>
		toast.error("⚠️ Debes agregar el numero y monto del documento", {
			position: "top-center",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
	componentDidMount() {
		this.actionsContext.getProveedoresAutocompletar();
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					const foo = () => {
						if (store.detalleServicio.documentos.length > 0) {
							return store.detalleServicio.documentos
								.slice(0)
								.reverse()
								.map((documento, i) => {
									return (
										<tr key={i}>
											<td scope="row">{documento.tipodoc}</td>
											<td>{documento.datedoc}</td>
											<td>{documento.numdoc}</td>
											<th>{documento.montodoc}</th>
										</tr>
									);
								});
						} else {
							return "";
						}
					};

					return (
						<div
							className="modal fade"
							id="modalDetalleServicioUpdate"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="myLargeModalLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-xl" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Agregar Nuevo Detalle</label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="form-row">
												<div className="col-md-5">
													<div className="feature-left">
														<label>Detalle</label>
														<select
															name="detalle"
															className="form-control"
															id="detalle"
															onChange={e => actions.handleDetalle(e)}>
															<option selected>Consulta</option>
															<option>Examen</option>
															<option>Insumos Medicos</option>
															<option>Otro</option>
														</select>
													</div>
												</div>
												<div className="col-md-2">
													<div className="feature-left">
														<div className="feature-copy">
															<label>Pago </label>
															<select
																className="form-control"
																name="pago"
																id="pago"
																value={store.serviceSelected.pago}
																onChange={e => actions.handleDetalle(e)}>
																<option>COB</option>
																<option>REM</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-2">
													<div className="feature-left">
														<div className="feature-copy">
															<label>Moneda </label>
															<select
																className="form-control"
																name="moneda"
																id="moneda"
																value={store.serviceSelected.moneda}
																onChange={e => actions.handleDetalle(e)}>
																<option>CLP</option>
																<option>USD</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-2">
													<div className="feature-left">
														<div className="feature-copy">
															<label>Pais</label>
															<select
																className="form-control"
																name="InsideUSA"
																id="InsideUSA"
																value={
																	store.serviceSelected.InsideUSA != "True"
																		? "Otro"
																		: "USA"
																}
																onChange={e => actions.handleDetalle(e)}>
																<option selected value="False">
																	Otro
																</option>
																<option value="True">USA</option>
															</select>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-md-2">
													<div className="feature-copy">
														<label>
															<span className="icon2">
																<i className="ti-receipt" /> Tipo
															</span>
														</label>
														<select
															className="form-control"
															id="tipodoc"
															name="tipodoc"
															value={store.documento.tipodoc}
															onChange={e => actions.handledocumento(e)}>
															<option>Boleta</option>
															<option>Factura</option>
															<option>Bono</option>
															<option>Reembolso</option>
															<option>Otro</option>
														</select>
													</div>
												</div>

												<div className="col-md-3">
													<div className="feature-copy">
														<label>
															<span className="icon2">
																<i className="ti-calendar" /> Fecha
															</span>
														</label>
														<input
															name="datedoc"
															id="datedoc"
															type="date"
															value={store.documento.datedoc}
															className="form-control"
															onChange={e => actions.handledocumento(e)}
														/>
													</div>
												</div>

												<div className="col-md-2">
													<div className="feature-copy">
														<label>
															<span className="icon2">
																<i className="ti-archive" /> Nº Doc
															</span>
														</label>
														<input
															name="numdoc"
															id="numdoc"
															placeholder="Nº"
															type="number"
															className="form-control"
															value={store.documento.numdoc}
															onChange={e => actions.handledocumento(e)}
														/>
													</div>
												</div>
												<div className="col-md-3">
													<div className="feature-copy">
														<label>
															<span className="icon2">
																<i className="ti-money" /> Monto
															</span>
														</label>
														<input
															name="montodoc"
															id="montodoc"
															placeholder="$"
															type="number"
															className="form-control"
															value={store.documento.montodoc}
															onChange={e => actions.handledocumento(e)}
														/>
													</div>
												</div>
												<div className="col-md-2">
													<div className="feature-copy mt-3">
														<input
															type="button"
															className="btn btn-primary mt-3"
															value="Aceptar"
															onClick={e => {
																store.documento.montodoc != "" &&
																store.documento.numdoc != ""
																	? actions.handleAceptarDocumento()
																	: this.notify3();
															}}
														/>
													</div>
												</div>
											</div>
											<div className="form-row">
												<div className="col-md-12">
													<table className="table">
														<thead>
															<tr>
																<th scope="col">Tipo</th>
																<th scope="col">Fecha</th>
																<th scope="col">N°Doc</th>
																<th scope="col">Monto</th>
															</tr>
														</thead>
														<tbody> {foo()} </tbody>
													</table>
												</div>
											</div>
											<div className="modal-footer">
												<button
													type="submit"
													className="btn btn-primary"
													onClick={() => {
														actions.handleEnvioDetalle({});
													}}
													data-dismiss="modal">
													Agregar Servicio
												</button>
											</div>
										</form>
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
ModalDetalleServicioUpdate.propTypes = {
	history: PropTypes.array
};
