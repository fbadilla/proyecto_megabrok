import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

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
			<Animated animationIn="fadeInLeft" animationOut="bounceOutLeft" animationInDuration={1000} isVisible={true}>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Id Reclamo</th>
							<th scope="col">Estado</th>
							<th scope="col">Reclamante</th>
							<th scope="col">Rut</th>
							<th scope="col">Poliza</th>
							<th scope="col">Ver más</th>
							<th scope="col">Editar</th>
						</tr>
					</thead>
					<tbody>
						<Context.Consumer>
							{({ store, actions }) => {
								if (store.formulariosId.length > 0) {
									return store.formulariosId
										.slice(0)
										.reverse()
										.map((item, i) => {
											return (
												<tr key={i}>
													<th scope="row"> {item.id}</th>
													<th>{item.name_estado}</th>
													<td> {item.nameReclamo}</td>
													<td>{item.rut}</td>
													<td>{item.numpoliza}</td>

													<td>
														<button
															type="button"
															className="btn btn-primary2"
															data-toggle="modal"
															data-target="#modalviewdocumento"
															onClick={() => actions.getDocumentoId2(item.id)}>
															<i className="ti-eye" />
														</button>
													</td>
													<td>
														<Link
															to="/update"
															className="btn btn-primary2"
															onClick={() => actions.handleModReclamo(item)}>
															<i className="ti-marker-alt" />
														</Link>
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
			</Animated>
		);
	}
}
ListaReclamos.propTypes = {
	history: PropTypes.object
};
