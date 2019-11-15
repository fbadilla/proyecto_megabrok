import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import ModalDocumento from "./modalServices";

export default class ModalViewDocumento extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}

	render() {
		return (
			<div
				className="modal"
				id="modalviewdocumento"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								<label htmlFor="inputNombre">Documentos </label>
							</h5>
						</div>
						<div className="modal-body">
							<button
								type="button"
								className="btn btn-primary"
								data-toggle="modal"
								data-target="#modaldocumento"
								data-dismiss="modal">
								Agregar Servicio
							</button>
							<table className="table table-striped table-sm">
								<thead>
									<tr>
										<th>Fecha </th>
										<th>N° documento</th>
										<th>Detalle</th>
										<th>pago</th>
										<th>total</th>
										<th>Ver documento</th>
									</tr>
								</thead>
								<tbody>
									<Context.Consumer>
										{({ store, actions }) => {
											if (store.documentoid.length > 0) {
												return store.documentoid.map((item, i) => {
													return (
														<tr key={i}>
															<td>{item.datedoc}</td>
															<td>{item.numdoc}</td>
															<td>{item.detalle_tratamiento}</td>
															<td>{item.pago}</td>
															<td>{item.montodoc}</td>
															<td>
																<button
																	type="button"
																	className="btn btn-primary2"
																	data-toggle="modal"
																	data-target="#modalviewdocumento"
																	onClick={() =>
																		window.open(store.apiUrl + item.docfile)
																	}>
																	<i className="ti-image" />
																</button>
															</td>
														</tr>
													);
												});
											} else {
												return "";
											}
										}}
									</Context.Consumer>
								</tbody>
							</table>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-primary" data-dismiss="modal">
								Cerrar
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
ModalViewDocumento.propTypes = {
	history: PropTypes.array
};
