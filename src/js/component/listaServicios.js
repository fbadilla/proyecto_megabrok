import React, { Component, Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class ListaServicios extends Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					if (store.servicios.length > 0) {
						const columnas = store.servicios.map((servicio, i) => {
							return (
								<div
									className="row justify-content-center"
									key={servicio.proveedor_id__nombre_proveedor}>
									<div className="container">
										<div className="row">
											<div className="col-md-12">
												<span />
											</div>
										</div>
									</div>
									<div className="col-md-8">
										<table className="table2 table-striped table-sm">
											<thead>
												<tr>
													<th>Proveedor</th>
													<th>Detalle </th>
													<th>Documentos</th>
													<th>Monto</th>
													<th>Pago</th>
													<th>Eliminar</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>{servicio.proveedor_id__nombre_proveedor}</td>
													<td>{servicio.detalle}</td>
													<td>
														{servicio.documentos.map((doc, i) => doc.numdoc).join(" - ")}
													</td>
													<td>
														{servicio.documentos
															.map((doc, i) => doc.montodoc)
															.reduce((a, b) => parseInt(a) + parseInt(b), 0)}
													</td>
													<td>{servicio.pago}</td>
													<td>
														<button
															type="button"
															className="btn btn-primary2"
															data-toggle="modal"
															data-target="#modaldeleteservicio"
															onClick={() => actions.handleDelete(servicio.id)}>
															<i className="ti-trash" />
														</button>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="col-md-4">
										<div className="row">
											<div className="col-md-4">
												<button
													type="button"
													className="btn btn-primary5"
													data-toggle="modal"
													data-target="#modalArchivo"
													onClick={() => actions.handleSelectedServicio(servicio, i)}>
													<i className="ti-plus" />
													Subir archivo
												</button>
											</div>
										</div>
										<div className="row">
											<div className="col-md-2">
												<button
													type="button"
													className="btn btn-primary2"
													onClick={() =>
														servicio.archivoServicio.length < 1 ||
														servicio.archivoServicio.length == null
															? alert("no existe el documento")
															: window.open(
																	store.apiUrl + "/media/" + servicio.archivoServicio
															  )
													}>
													<i className="ti-image" />
												</button>
											</div>
											<div className="col-md-2">
												<button
													type="button"
													className="btn btn-primary2"
													data-toggle="modal"
													data-target="#modalservicioupdate"
													onClick={() => actions.handleSelectedServicio(servicio, i)}>
													<i className="ti-pencil" />
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
								<div className="row">
									<div className="col-md-3">
										<div className="feature-left">
											<button
												type="button"
												className="btn btn-primary"
												onClick={e =>
													actions.handlePDFFormulario(e, store.formulario.reclamo_id)
												}>
												CREAR FORMULARIO
											</button>
										</div>
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
ListaServicios.propTypes = {
	history: PropTypes.array
};
