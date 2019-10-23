import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numpoliza: ""
		};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					console.log("aqui estoy ahora", store.numpoliza);
					return (
						<div className="gtco-container">
							<div className="row">
								<div className="col-md-12">
									<form action="#" onSubmit={e => actions.handleSearch(e, this.props.history)}>
										<div className="row form-group">
											<h4>Poliza del cliente</h4>
											<div className="col-md-5">
												<div className="feature-left">
													<span className="icon">
														<i className="ti-search" />
													</span>
													<div className="feature-copy">
														<input
															name="numpoliza"
															id="numpoliza"
															placeholder="numero de poliza"
															type="text"
															className="form-control"
															onChange={e => actions.handleChange(e)}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="form-group">
												<input type="submit" value="buscar" className="btn btn-primary" />
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
SearchComponent.propTypes = {
	history: PropTypes.array
};
