import React from "react";
import { Context } from "../../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";

export default class ModalServicioUpdate extends React.Component {
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
						if (store.numservice != null || store.numservice == "") {
							return store.documentoid
								.slice(0)
								.reverse()
								.map((item, i) => {
									return (
										<tr key={i}>
											<td scope="row">{item.tipodoc}</td>
											<td>{item.datedoc}</td>
											<td>{item.numdoc}</td>
											<th>{item.montodoc}</th>
											<th>
												<button
													type="button"
													className="btn btn-primary2"
													data-toggle="modal"
													data-target="#modaldeletedocumento"
													onClick={() => actions.handleDelete(item.id)}>
													<i className="ti-trash" />
												</button>
											</th>
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
							id="modalservicioupdate"
							tabIndex="-1"
							role="document"
							aria-labelledby="myLargeModalLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-xl" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<div className="col-md-7">
											<h5 className="modal-title" id="exampleModalLabel">
												<label htmlFor="inputNombre">Modificar Detalle del Servicio </label>
											</h5>
										</div>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="form-row">
												<div className="col-md-5">
													<div className="feature-left">
														<label>Detalle Servicio</label>
														<input
															name="detalle"
															className="form-control"
															rows="5"
															id="detalle"
															value={store.serviceSelected.detalle}
															placeholder="Detalles Del Tratamiento"
															onChange={e => actions.handleServicioMod(e)}
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
																value={store.serviceSelected.pago}
																onChange={e => actions.handleServicioMod(e)}>
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
															className="form-control"
															value={store.documento.datedoc}
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
															placeholder="$100.000.-"
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
															onClick={e => actions.postDocumento()}
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
																<th scope="col">Eliminar</th>
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
												actions.handlePutServicio({});
											}}
											data-dismiss="modal">
											modificar
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
ModalServicioUpdate.propTypes = {
	history: PropTypes.array
};