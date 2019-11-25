import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class ListaDocumentos extends Component {
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
					if (store.documentoid.length > 0) {
						const columnas = store.documentoid.map((documento, i) => {
							return (
								<tr key={i}>
									<td>{documento.datedoc}</td>
									<td>{documento.numdoc}</td>
									<td>{documento.detalle_tratamiento}</td>
									<td>{documento.pago}</td>
									<td>{documento.montodoc}</td>
									<td>{documento.nombre_proveedor}</td>

									<td>
										<button
											type="button"
											className="btn btn-primary2"
											onClick={() =>
												documento.docfile == null
													? alert("no existe el documento")
													: window.open(store.apiUrl + documento.docfile)
											}>
											<i className="ti-image" />
										</button>
									</td>
									<td>
										<button
											type="button"
											className="btn btn-primary2"
											data-toggle="modal"
											data-target="#modaldocumentoUpdate"
											onClick={() => actions.handleDocumentoData(documento)}>
											<i className="ti-pencil" />
										</button>
									</td>
									<td>
										<button
											type="button"
											className="btn btn-primary2"
											onClick={() => actions.handleDeleteDoc(documento.id)}>
											<i className="ti-trash" />
										</button>
									</td>
								</tr>
							);
						});

						return (
							<table className="table table-striped table-sm">
								<thead>
									<tr>
										<th>Fecha </th>
										<th>documento</th>
										<th>Detalle</th>
										<th>pago</th>
										<th>total</th>
										<th>Proveedor</th>
										<th>Documento</th>
										<th>Modificar</th>
										<th>Eliminar</th>
										<th>
											<button
												type="button"
												className="btn btn-primary2"
												onClick={() => actions.getDocumentoId()}>
												<i className="ti-reload" />
											</button>
										</th>
									</tr>
								</thead>
								<tbody>{columnas}</tbody>
							</table>
						);
					} else {
						return "";
					}
				}}
			</Context.Consumer>
		);
	}
}
ListaDocumentos.propTypes = {
	history: PropTypes.array
};
