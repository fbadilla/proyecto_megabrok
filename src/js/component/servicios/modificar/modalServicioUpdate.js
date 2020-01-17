import React from "react";
import { Context } from "../../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";
import { toast } from "react-toastify";

export default class ModalServicioUpdate extends React.Component {
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
													className="icono"
													data-toggle="modal"
													data-dismiss="modal"
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
										<div className="col">
											<h5 className="modal-title" id="exampleModalLabel">
												<label htmlFor="inputNombre">Modificar Detalle del Servicio. </label>
												<button
													type="button"
													className="close"
													data-dismiss="modal"
													aria-label="Close">
													<i className="ti-close" />
												</button>
											</h5>
										</div>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="form-row">
												<div className="col-md-5">
													<div className="feature-left">
														<label>Detalle Servicio</label>
														<select
															name="detalle"
															className="form-control"
															id="detalle"
															value={store.detalle}
															onChange={e => actions.handleChange(e)}>
															<option>Consulta</option>
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
																value={store.pago}
																onChange={e => actions.handleChange(e)}>
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
																onChange={e => actions.handleServicioMod(e)}>
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
																onChange={e => actions.handleServicioMod(e)}>
																<option value="False">Chile</option>
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
															placeholder="$..."
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
																	? actions.postDocumento()
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
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.handlePutServicio({});
											}}
											data-dismiss="modal">
											Modificar
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
