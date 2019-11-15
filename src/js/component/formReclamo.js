import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class FormReclamo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			PolicyNumber: "",
			ClaimantId: "",
			ClaimForm: "",
			Extension: "",
			IsBankingInfo: "",
			Comments: ""
		};
		this.handleChange2 = this.handleChange2.bind(this);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	handleChange2(event) {
		this.setState({ value: event.target.value });
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<div className="col-md-12 ">
							<h2>Ingresar Formulario</h2>
							<form action="#" onSubmit={e => actions.handleGenerate(e, this.props.history)}>
								<div className="row form-group">
									<h4>Datos Personales del Reclamante</h4>
									<div className="col-md-3">
										<div className="feature-left">
											<span className="icon">
												<i className="ti-user" />
											</span>
											<div className="feature-copy">
												<label>poliza</label>
												<input
													name="PolicyNumber"
													id="PolicyNumber"
													value={store.numpoliza}
													type="text"
													className="form-control"
													onLoad={e => actions.handleReclamo(e)}
													readOnly
												/>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="feature-left">
											<div className="feature-copy">
												<label>Nombre Asegurado</label>
												<input
													name="ClaimantFirstName"
													id="ClaimantFirstName"
													value={
														store.aseguradoselected.ClaimantFirstName +
														" " +
														store.aseguradoselected.ClaimantLastName
													}
													type="text"
													className="form-control"
												/>
											</div>
										</div>
									</div>
									<div className="col-md-3">
										<div className="feature-left">
											<div className="feature-copy">
												<label>ID asegurado</label>
												<input
													name="ClaimantId"
													id="ClaimantId"
													value={store.aseguradoselected.ClaimantId}
													type="text"
													className="form-control"
													onChange={e => actions.handleReclamo(e)}
												/>
											</div>
										</div>
									</div>
									<div className="col-md-8">
										<div className="feature-left">
											<div className="feature-copy">
												<label>Comentarios</label>
												<textarea
													className="form-control"
													name="Comments"
													id="Comments"
													rows="5"
													placeholder="comentarios"
													onChange={e => actions.handleReclamo(e)}
												/>
												<span>
													<i className="ti-pencil" />
													Ingresar los detalles del Tratamiento, Asistencia Prestada e Insumos
													Médicos
												</span>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="feature-left">
											<div className="feature-copy" />
										</div>
									</div>
									<div className="col-md-4">
										<div className="feature-left">
											<div className="feature-copy">
												<input
													className="form-check-input"
													type="checkbox"
													value="True"
													id="IsBankingInfo"
													name="IsBankingInfo"
													onChange={e => actions.handleReclamo(e)}
													required
												/>
												<label className="form-check-label" htmlFor="invalidCheck2">
													<h5>Posee Informacion Bancaria</h5>
												</label>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="form-group">
										<input type="submit" value="Generar" className="btn btn-primary" />
									</div>
								</div>
							</form>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
FormReclamo.propTypes = {
	history: PropTypes.object
};
