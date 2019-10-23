import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class ListaAsegurados extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ClaimantId: "",
			ClaimantFirstName: "",
			ClaimantLastName: "",
			ClaimantMotherMaidenName: "",
			ClaimantDateOfBirth: "",
			ClaimantStatusId: "",
			ClaimantTypeId: ""
		};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	render() {
		return (
			<div className="card-deck">
				<div className="row">
					<Context.Consumer>
						{({ store, actions }) => {
							if (store.asegurados.length > 0) {
								return store.asegurados.map((item, i) => {
									return (
										<div className="col-md-3" key={i}>
											<div className="card">
												<img src="images/user2.png" className="img-responsive" />
												<div className="card-body">
													<h5 className="card-title">{item.ClaimantFirstName}</h5>
													<p className="card-text">
														{item.ClaimantLastName} {item.ClaimantMotherMaidenName}
													</p>
													<button
														type="button"
														className="btn btn-primary"
														onClick={() => {
															actions.handleAseguradoSelected({
																ClaimantId: this.state.ClaimantId,
																ClaimantFirstName: this.state.ClaimantFirstName,
																ClaimantMiddleName: this.state.ClaimantMiddleName,
																ClaimantLastName: this.state.ClaimantLastName,
																ClaimantMotherMaidenName: this.state
																	.ClaimantMotherMaidenName,
																ClaimantDateOfBirth: this.state.ClaimantDateOfBirth,
																ClaimantStatusId: this.state.ClaimantStatusId,
																ClaimantTypeId: this.state.ClaimantTypeId
															});
														}}>
														Generar reclamo
													</button>
												</div>
												<div className="card-footer">
													<small className="text-muted">
														estado del asegurado {item.ClaimantStatusId}
													</small>
												</div>
											</div>
										</div>
									);
								});
							} else {
								return "";
							}
						}}
					</Context.Consumer>
				</div>
			</div>
		);
	}
}
ListaAsegurados.propTypes = {
	history: PropTypes.array
};
