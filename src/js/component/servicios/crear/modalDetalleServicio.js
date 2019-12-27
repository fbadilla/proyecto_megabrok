import React from "react";
import { Context } from "../../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";

export default class ModalServicio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
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
							id="modalDetalleServicio"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="myLargeModalLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-xl" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<div className="col-md-7">
											<h5 className="modal-title" id="exampleModalLabel">
												<label htmlFor="inputNombre">Ingreso servicio </label>
											</h5>
											<button
												type="button"
												className="close"
												data-dismiss="modal"
												aria-label="Close">
												<i className="ti-close" />
											</button>
										</div>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="form-row">
												<div className="col-md-5">
													<div className="feature-left">
														<label>Detalle</label>
														<input
															name="detalle"
															className="form-control"
															rows="5"
															id="detalle"
															value={store.detalleServicio.detalle}
															placeholder="Detalles Del Tratamiento"
															onChange={e => actions.handleDetalle(e)}
														/>
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
																value={store.detalleServicio.pago}
																onChange={e => actions.handleDetalle(e)}>
																<option>COB</option>
																<option>REM</option>
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
													<div className="feature-copy">
														<label>
															<span>
																<i className="ti-money" /> Guardar
															</span>
														</label>
														<input
															type="button"
															className="btn btn-primary"
															value="Aceptar"
															onClick={e => actions.handleAceptarDocumento(e)}
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
													type="button"
													className="btn btn-primary"
													onClick={() => {
														actions.handleAddDetalle();
													}}>
													Añadir detalle
												</button>
												<button
													type="submit"
													className="btn btn-primary"
													onClick={() => {
														actions.handleEnvioServicio({});
													}}
													data-dismiss="modal">
													Finalizar
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
ModalServicio.propTypes = {
	history: PropTypes.array
};
