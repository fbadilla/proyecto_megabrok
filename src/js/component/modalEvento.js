import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export default class ModalEvento extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name_event: "",
			date_event: "",
			cost: "",
			event_id: 1
		};
		this.props.history;
	}
	handleInputChange(event) {}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<div
							className="modal fade"
							id="exampleModal1"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Crear Evento</label>
										</h5>
									</div>
									<div className="modal-body">
										<form action="#" onSubmit={e => actions.handleGrupo(e, this.props.history)}>
											<div className="form-row">
												<div className="form-group col-md-6">
													<label htmlFor="inputNombre">Nombre</label>
													<input
														type="text"
														name="name_event"
														//onChange={this.handleInputChange}
														className="form-control"
														id="inputNombre"
														placeholder=""
													/>
												</div>
												<div className="form-row">
													<div className="form-group col-md-6">
														<div className="form-group">
															<label htmlFor="inputDireccion">Direccion</label>
															<input
																name=""
																//onChange={this.handleInputChange}
																type="text"
																className="form-control"
																id="inputdireccion"
																placeholder=""
															/>
														</div>

														<div />
													</div>
												</div>
											</div>
											<div className="form-row">
												<div className="form-group col-md-6">
													{" "}
													<label htmlFor="inputTime">hora Evento</label>
													<input
														type="time"
														name="usr_time"
														className="form-control"
														id="inputTime"
													/>
													<label htmlFor="inputDate">Fecha Evento</label>
													<input
														id="date"
														name="date_event"
														//onChange={this.handleInputChange}
														type="date"
														className="form-control"
													/>
												</div>{" "}
												<div className="form-group col-md-4">
													<label htmlFor="inputCity">Costo</label>
													<input
														name="cost"
														//onChange={this.handleInputChange}
														type="text"
														className="form-control"
														id="inputCity"
													/>
												</div>
											</div>
										</form>
									</div>

									<div className="modal-footer">
										<button type="button" className="btn btn-primary btn-lg" data-dismiss="modal">
											Close
										</button>
										<button
											className="btn btn-primary btn-lg"
											onSubmit={e => actions.handleevent(e, this.props.history)}
											data-dismiss="modal">
											o Save changes
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
ModalEvento.propTypes = {
	history: PropTypes.object
};
