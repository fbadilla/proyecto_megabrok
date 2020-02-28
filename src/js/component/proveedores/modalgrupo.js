import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export default class ModalGrupo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };

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

					return (
						<div
							className="modal fade"
							id="ModalAddgrupo"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-md" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Ingresar Grupo </label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="row form-group">
												<div className="col-10 offset-1">
													<div className="feature-left">
														<span className="icon">
															<i className="ti-user" />
														</span>
														<div className="feature-copy">
															<label>Nombre </label>
															<input
																name="nombre_grupo"
																id="nombre_grupo"
																placeholder="Ingrese nombre Grupo"
																type="text"
																className="form-control"
																onChange={e => actions.handlegrupo(e)}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row form-group">
												<div className="col-10 offset-1">
													<div className="feature-left">
														<span className="icon">
															<i className="ti-package" />
														</span>
														<div className="feature-copy">
															<label>Abreviacion</label>
															<input
																name="Abreviacion"
																id="Abreviacion"
																placeholder="Ingrese Abreviacion"
																type="text"
																className="form-control"
																onChange={e => actions.handlegrupo(e)}
															/>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.postAddgrupo();
											}}
											data-dismiss="modal"
											data-toggle="modal"
											data-target="#ModalAddProveedor">
											Agregar
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
ModalGrupo.propTypes = {
	history: PropTypes.array
};
