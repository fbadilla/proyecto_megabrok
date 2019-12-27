import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import ModalPersona from "../component/personas/modalPersona";
import PropTypes from "prop-types";
import { ListaPersonas } from "../component/personas/listaPersonas";
import ModalUpdatePersona from "../component/personas/modalUpdatePersona";

export class MantenedorPersonas extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getPersonas();
		this.actionsContext.getaccount();
		this.actionsContext.vaciarFiltro();
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<Fragment>
							<div className="gtco-container">
								<div className="row justify-content-center">
									<div className="col-md-10 ">
										<div className="gtco-section ">
											<div className="row">
												<div className="col-md-8">
													<p>Aca se mostraran todas las personas</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-4">
													<div className="input-group  input-group-lg">
														<div className="input-group-prepend">
															<span className="input-group-text" id="basic-addon1">
																<i className="ti-search" />
															</span>
														</div>
														<input
															name="busqueda"
															type="busqueda"
															className="form-control"
															placeholder="Buscar"
															onChange={e => actions.handleChange(e)}
														/>
													</div>
												</div>
												<div className="col-md-2">
													<input
														type="submit"
														value="Buscar persona"
														className="btn btn-primary"
														onClick={e => actions.handleFiltroPersona(e)}
													/>
												</div>
												<div className="col-md-3 offset-3">
													<button
														type="button"
														className="btn btn-primary"
														data-toggle="modal"
														data-target="#ModalAddPersona">
														Agregar Persona
													</button>
												</div>
											</div>
										</div>

										<ListaPersonas />
									</div>
								</div>
							</div>
							<ModalPersona />
							<ModalUpdatePersona />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
MantenedorPersonas.propTypes = {
	history: PropTypes.object
};
