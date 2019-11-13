import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ModalViewDocumento from "./modalViewDocumento";
import { Animated } from "react-animated-css";

export class ListaReclamos extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}

	render() {
		return (
			<Animated animationIn="bounceIn" animationOut="bounceOutLeft" animationInDuration={1000} isVisible={true}>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Id Reclamo</th>
							<th scope="col">Reclamante</th>
							<th scope="col">Rut</th>
							<th scope="col">Poliza</th>
							<th scope="col">Ver más</th>
						</tr>
					</thead>
					<tbody>
						<Context.Consumer>
							{({ store, actions }) => {
								if (store.formulariosId.length > 0) {
									return store.formulariosId.map((item, i) => {
										return (
											<tr key={i}>
												<th scope="row"> {item.id}</th>
												<td> {item.nameReclamo}</td>
												<td>{item.rut}</td>
												<td>{item.numpoliza}</td>
												<td>
													{console.log("id:" + item.id)}
													<button
														type="button"
														className="btn btn-primary"
														data-toggle="modal"
														data-target="#modalviewdocumento"
														onClick={() => actions.getDocumentoId2(item.id)}>
														<i className="ti-eye" />
														Ver documentos
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
						<ModalViewDocumento />
					</tbody>
				</table>
			</Animated>
		);
	}
}
ListaReclamos.propTypes = {
	history: PropTypes.object
};
