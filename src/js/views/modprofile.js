import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class modificarUsuario extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	componentDidMount() {
		this.actionsContext.getaccount();
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<Fragment>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12">
											<div className="col-md-6 ">
												<h3>Mis Datos</h3>
												<form
													action="#"
													onSubmit={e => actions.handleUser(e, this.props.history)}>
													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-user" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="name">
																		nombre
																	</label>
																	<input
																		name="name_Account"
																		id="name_Account"
																		placeholder={store.account.name_Account}
																		onChange={e => actions.handleaccount(e)}
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
																	<i className="ti-email" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="email">
																		Email
																	</label>
																	<input
																		name="mail"
																		id="mail"
																		placeholder={store.account.mail}
																		onChange={e => actions.handleaccount(e)}
																		type="email"
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
																	<i className="ti-calendar" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="subject">
																		Fecha de Nacimiento
																	</label>
																	<input
																		name="fecha_nacimiento"
																		id="fecha_nacimiento"
																		placeholder={store.account.fecha_nacimiento}
																		onChange={e => actions.handleaccount(e)}
																		type="date"
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
																	<i className="ti-tablet" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="subject">
																		Telefono
																	</label>
																	<input
																		name="phone"
																		id="phone"
																		onChange={e => actions.handleaccount(e)}
																		type="text"
																		className="form-control"
																		placeholder={store.account.phone}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-bolt" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="subject">
																		grupo
																	</label>
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
modificarUsuario.propTypes = {
	history: PropTypes.object
};
