import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class crearGrupo extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	componentDidMount() {
		//this.actionsContext.getMiembro();
		//	this.actionsContext.getGrupos();
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<Fragment>
							<header
								id="gtco-header"
								className="gtco-cover gtco-cover-sm"
								role="banner"
								style={{ backgroundImage: "url(images/img_2.jpg)" }}>
								<div className="overlay" />
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12 col-md-offset-0 text-left">
											<div className="row row-mt-15em">
												<div className="col-md-7 mt-text">
													<h1>{store.miembro.userAccount}</h1>
													<span className="intro-text-small">puedes crear un grupo</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</header>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12">
											<div className="col-md-6 ">
												<h3>Crear nuevo grupo</h3>
												<form
													action="#"
													onSubmit={e => actions.handleGrupo(e, this.props.history)}>
													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-thumb-up" />
																</span>
																<div className="feature-copy">
																	<input
																		name="userAccount"
																		id="userAccount"
																		placeholder="ingresa el nombre del grupo"
																		//onChange={e => actions.handleMiembro(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-pencil" />
																</span>
																<div className="feature-copy">
																	<input
																		name="mail"
																		id="mail"
																		placeholder="ingresa los terminos de la comunidad ..."
																		//onChange={e => actions.handleMiembro(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="form-group">
														<input
															type="submit"
															value="modificar"
															className="btn btn-primary"
														/>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
crearGrupo.propTypes = {
	history: PropTypes.object
};
