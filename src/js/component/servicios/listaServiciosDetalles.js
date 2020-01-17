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
					// if (store.servicios.archivoServicio.length < 1) visible = "invisible";
					let activo = store.formulario.estado == "Enviado";
					let icono = <i className="ti-download icono3 linkAzul" />;
					if (store.servicios.length > 0) {
						let columnas = store.servicios.map((servicio, i) => {
							return (
								<div className="col-md-9" key={i}>
									<div className="row row2 border rounded ">
										<div
											className={
												servicio.num_claim == null ? "col-md-12 mt-4 d-none" : "col-md-12 mt-4 "
											}>
											<h5>Nº Reclamo : {servicio.num_claim}</h5>
										</div>
										<div className="col-md-5 mt-2">
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
										<div className="col-md-3 mt-4 offset-md-4 ">
											<button
												type="button"
												className="icono2"
												data-dismiss="modal"
												data-toggle="modal"
												data-target="#modalDetalleServicioUpdate"
												onClick={() => actions.handleSelectedServicioUpdate(servicio)}
												disabled={activo}>
												<u>
													Agregar Tipo de Servicio <i className="ti-plus" />
												</u>
											</button>
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
														<th>Detalle</th>
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
																		$
																		{documentos
																			.map((doc, i) => doc.montodoc)
																			.reduce(
																				(a, b) => parseInt(a) + parseInt(b),
																				0
																			)}
																		.-
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
										<div className="col-12">
											<button
												type="button"
												className="icono2"
												data-toggle="modal"
												data-target="#modalArchivo"
												onClick={() => actions.handleSelectedServicioUpdate(servicio)}
												disabled={activo}>
												<i className="ti-upload icono3" />
												{servicio.archivoServicio.length >= 2 ||
												servicio.file_infomedica.length >= 2 ||
												servicio.file_docgeneral.length >= 2
													? " Modificar Archivos"
													: " Subir Archivos "}
											</button>
										</div>
										<div
											className={
												servicio.archivoServicio.length < 1 ? "col-12file d-none" : "col-12file"
											}>
											<div
												className={
													servicio.archivoServicio.length < 1 ||
													servicio.archivoServicio.length == null
														? "col-12 d-none"
														: "col-12"
												}>
												<span>
													{servicio.archivoServicio.length < 1 ||
													servicio.archivoServicio.length == null
														? ""
														: "Facturas:"}
												</span>
												<button
													type="button"
													className="icono2 linkAzul"
													onClick={() =>
														servicio.archivoServicio.length < 1 ||
														servicio.archivoServicio.length == null
															? this.notifyNotFile()
															: window.open(
																	store.apiUrl + "/media/" + servicio.archivoServicio
															  )
													}>
													<span
														className={
															servicio.archivoServicio.length < 1 ||
															servicio.archivoServicio.length == null
																? "invisible"
																: ""
														}>
														{icono}
													</span>
													{servicio.archivoServicio.length < 1 ||
													servicio.archivoServicio.length == null
														? ""
														: servicio.archivoServicio.slice(27)}
												</button>
											</div>
											<div
												className={
													servicio.file_infomedica.length < 1 ||
													servicio.file_infomedica.length == null
														? "col-12 d-none"
														: "col-12"
												}>
												<span>
													{servicio.file_infomedica.length < 1 ||
													servicio.file_infomedica.length == null
														? ""
														: "Informacion Medica:"}
												</span>
												<button
													type="button"
													className="icono2 linkAzul"
													onClick={() =>
														servicio.file_infomedica.length < 1 ||
														servicio.file_infomedica.length == null
															? this.notifyNotFile()
															: window.open(
																	store.apiUrl + "/media/" + servicio.file_infomedica
															  )
													}>
													<span
														className={
															servicio.file_infomedica.length < 1 ||
															servicio.file_infomedica.length == null
																? "invisible"
																: ""
														}>
														{icono}
													</span>
													{servicio.file_infomedica.length < 1 ||
													servicio.file_infomedica.length == null
														? ""
														: servicio.file_infomedica.slice(27)}
												</button>
											</div>
											<div
												className={
													servicio.file_docgeneral.length < 1 ||
													servicio.file_docgeneral.length == null
														? "col-12 d-none"
														: "col-12"
												}>
												<span>
													{servicio.file_docgeneral.length < 1 ||
													servicio.file_docgeneral.length == null
														? ""
														: "Documentos Generales:"}
												</span>
												<button
													type="button"
													className="icono2 linkAzul"
													onClick={() =>
														servicio.file_docgeneral.length < 1 ||
														servicio.file_docgeneral.length == null
															? this.notifyNotFile()
															: window.open(
																	store.apiUrl + "/media/" + servicio.file_docgeneral
															  )
													}>
													<span
														className={
															servicio.archivoServicio.length < 1 ||
															servicio.archivoServicio.length == null
																? "invisible"
																: ""
														}>
														{icono}
													</span>
													{servicio.file_docgeneral.length < 1 ||
													servicio.file_docgeneral.length == null
														? ""
														: servicio.file_docgeneral.slice(27)}
												</button>
											</div>
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
