import React, { Component, Fragment } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export class ListaServiciosDetalle extends Component {
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
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					let visible = "visible";
					if (store.formulario.estado == "Enviado") visible = "invisible";
					let activo = store.formulario.estado == "Enviado";

					if (store.servicios.length > 0) {
						let columnas = store.servicios.map((servicio, i) => {
							return (
								<div className="col-md-9" key={i}>
									<div className="row row2 border rounded ">
										<div className="col-md-5 mt-4">
											<h6>
												<button
													type="button"
													className="icono"
													data-toggle="modal"
													data-target="#modalProveedorUpdate"
													onClick={() => actions.handleSelectedServicioUpdate(servicio)}
													disabled={activo}>
													<i className="ti-settings" />
												</button>
												{servicio.proveedor_id__nombre_proveedor}:
											</h6>
										</div>
										<div className="col-md-2 mt-4 offset-md-5 ">
											<button
												type="button"
												className="close"
												data-dismiss="modal"
												data-toggle="modal"
												data-target="#modaldeleteservicio"
												onClick={() => actions.handleDelete(servicio.id)}
												disabled={activo}>
												<i className="ti-close" />
											</button>
										</div>
										<div className="col-md-12">
											<table className="table2 table-striped table-sm">
												<thead>
													<tr>
														<th>
															Detalle
															<button
																type="button"
																className="icono2"
																data-dismiss="modal"
																data-toggle="modal"
																data-target="#modalDetalleServicioUpdate"
																onClick={() =>
																	actions.handleSelectedServicioUpdate(servicio)
																}
																disabled={activo}>
																<i className="ti-plus" />
															</button>
														</th>
														<th>Documentos</th>
														<th>Monto</th>
														<th>Pago</th>
													</tr>
												</thead>
												<tbody>
													{servicio.DetalleServicio.map(row => {
														const { detalle, documentos, pago, id, servicioid } = row;
														return (
															<Fragment key={i}>
																<tr>
																	<td>{detalle}</td>
																	<td>
																		{documentos
																			.map((doc, i) => doc.numdoc)
																			.join(" - ")}
																	</td>
																	<td>
																		{documentos
																			.map((doc, i) => doc.montodoc)
																			.reduce(
																				(a, b) => parseInt(a) + parseInt(b),
																				0
																			)}
																	</td>
																	<td>{pago}</td>
																	<td>
																		<button
																			type="button"
																			className="icono"
																			data-toggle="modal"
																			data-target="#modalservicioupdate"
																			onClick={() =>
																				actions.handleSelectedServicio(
																					{ id },
																					row,
																					servicio.id
																				)
																			}
																			disabled={activo}>
																			<i className="ti-settings" />
																		</button>
																		<button
																			type="button"
																			className="icono"
																			data-toggle="modal"
																			data-target="#modaldeletedetalleservicio"
																			onClick={() => actions.handleDelete({ id })}
																			disabled={activo}>
																			<i className="ti-trash" />
																		</button>
																	</td>
																</tr>
															</Fragment>
														);
													})}
												</tbody>
											</table>
										</div>
										<div className="col-12file">
											<img
												src="images/PDF.png"
												className="rounded-sm w-3 cursor-pointer "
												data-toggle="modal"
												data-target="#modalArchivo"
												onClick={() => actions.handleSelectedServicioUpdate(servicio)}
											/>
											<a
												className="stretched-link2 cursor-pointer linkAzul"
												onClick={() =>
													servicio.archivoServicio.length < 1 ||
													servicio.archivoServicio.length == null
														? this.notifyNotFile()
														: window.open(
																store.apiUrl + "/media/" + servicio.archivoServicio
														  )
												}>
												{servicio.archivoServicio.length >= 2
													? servicio.archivoServicio.slice(11)
													: "Servicio sin PDF Adjunto"}
											</a>
										</div>
									</div>
								</div>
							);
						});

						return (
							<Fragment>
								{columnas}
								<div className="col-md-4 my-2 offset-md-7 ">
									<div className="feature-left">
										<button
											type="button"
											className="btn btn-primary "
											onClick={e => actions.handlePDFFormulario(e, store.formulario.reclamo_id)}
											disabled={activo}>
											CREAR FORMULARIO
										</button>
									</div>
								</div>
							</Fragment>
						);
					} else {
						return "";
					}
				}}
			</Context.Consumer>
		);
	}
}
ListaServiciosDetalle.propTypes = {
	history: PropTypes.array
};
