import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class ListaServiciosView extends Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.props.history;
	}
	render() {
		return (
			<Context.Consumer>
				{({ store }) => {
					if (store.servicios.length > 0) {
						let columnas = store.servicios.DetalleServicio.map(row => {
							const { detalle, documentos, pago, id, proveedor_id } = row;
							return (
								<tr key={}>
									<td>{detalle}</td>
									<td>{documentos.map((doc, i) => doc.numdoc).join(" - ")}</td>
									<td>
										{documentos
											.map((doc, i) => doc.montodoc)
											.reduce((a, b) => parseInt(a) + parseInt(b), 0)}
									</td>
									<td>{pago}</td>
									<td>
										<button
											type="button"
											className="btn btn-primary2"
											data-toggle="modal"
											data-target="#modalservicioupdate"
											onClick={() =>
												actions.handleSelectedServicio({ id }, { detalle, pago, proveedor_id })
											}>
											<i className="ti-pencil" />
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
