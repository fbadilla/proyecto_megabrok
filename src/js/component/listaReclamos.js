import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
			<div className="card-deck">
				<div className="row">
					<Animated
						animationIn="bounceIn"
						animationOut="bounceOutLeft"
						animationInDuration={1000}
						isVisible={true}>
						<Context.Consumer>
							{({ store, actions }) => {
								if (store.formulariosId.length > 0) {
									return store.formulariosId.map((item, i) => {
										return (
											<div className="col-md-4 col-sm-6" key={i}>
												<div className="feature-center">
													<span className="icon">
														<i className="ti-archive" />
													</span>
													<h3>Reclamo ID: {item.id}</h3>
													<p>
														Reclamante:
														{item.nameReclamo} <br />
														Rut:
														{item.rut}{" "}
													</p>
													<h5>Detalle: {item.detalle_diagnostico}</h5>

													<h3>
														Poliza: <br />
														{item.numpoliza}
													</h3>
													<button
														type="button"
														className="btn btn-danger"
														data-toggle="tooltip"
														data-placement="top"
														title="Tooltip on top">
														Ver <i className="ti-eye" />
													</button>
												</div>
											</div>
										);
									});
								} else {
									return "";
								}
							}}
						</Context.Consumer>
					</Animated>
				</div>
			</div>
		);
	}
}
ListaReclamos.propTypes = {
	history: PropTypes.object
};
