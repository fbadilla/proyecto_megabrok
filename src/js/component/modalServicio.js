import React from "react";
import { Context } from "../store/appContext";
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
						if (store.documentos.length > 0) {
							return store.documentos
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
							id="modalservicio"
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
										</div>

										<div className="col-md-5">
											<div className="feature-right">
												<input
													type="file"
													name="archivoServicio"
													id="docfile"
													className="form-control"
													value=""
													onChange={e => actions.handleFileChange(e)}
												/>
											</div>
										</div>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="form-row">
												<div className="col-md-5">
													<div className="feature-left">
														<label>Proveedor</label>
														<Select
															className="basic-single"
															classNamePrefix="select"
															onChange={value => actions.handleServicioSelect(value)}
															options={store.proveedores}
														/>
													</div>
												</div>
												<div className="col-md-5">
													<div className="feature-left">
														<label>Detalle</label>
														<input
															name="detalle"
															className="form-control"
															rows="5"
															id="detalle"
															placeholder="Detalles Del Tratamiento"
															onChange={e => actions.handleServicio(e)}
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
																onChange={e => actions.handleServicio(e)}>
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
															onChange={e => actions.handledocumento(e)}>
															<option>Boleta</option>
															<option>Factura</option>
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
															placeholder="666"
															type="number"
															className="form-control"
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
															placeholder="$100.000.-"
															type="number"
															className="form-control"
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
														<tbody>{foo()}</tbody>
													</table>
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
												actions.handleEnvioServicio({});
											}}
											data-dismiss="modal">
											Guardar
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
ModalServicio.propTypes = {
	history: PropTypes.array
};
