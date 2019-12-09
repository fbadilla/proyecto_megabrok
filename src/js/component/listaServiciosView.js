import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class ListaServiciosView extends Component {
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
								<tr key={i}>
									<td>{servicio.detalle}</td>
									<td>{servicio.documentos.map((doc, i) => doc.numdoc).join(" - ")}</td>
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
											onClick={() =>
												servicio.archivoServicio.length < 1
													? alert("no existe el documento")
													: window.open(store.apiUrl + "/media/" + servicio.archivoServicio)
											}>
											<i className="ti-image" />
										</button>
									</td>
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
							);
						});

						return (
							<div className="gtco-container">
								<div className="row">
									<table className="table table-striped table-sm">
										<thead>
											<tr>
												<th>Detalle </th>
												<th>Documentos</th>
												<th>Monto</th>
												<th>Pago</th>
												<th>Archivo</th>
												<th>Eliminar</th>
											</tr>
										</thead>
										<tbody>{columnas}</tbody>
									</table>
								</div>
							</div>
						);
					} else {
						return "";
					}
				}}
			</Context.Consumer>
		);
	}
}
ListaServiciosView.propTypes = {
	history: PropTypes.array
};
