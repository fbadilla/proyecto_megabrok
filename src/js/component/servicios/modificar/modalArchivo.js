import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";

export default class ModalArchivo extends React.Component {
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
							id="modalArchivo"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Subir Archivos al Servicio </label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">
										<div className="form-row">
											<div className="col">
												<div className="feature-right">
													<label> Boletas o Facturas</label>
													<input
														type="file"
														name="archivoServicio"
														id="archivoServicio"
														className="form-control"
														onChange={e => actions.handleFileChange(e)}
													/>
												</div>
											</div>
										</div>

										<div className="form-row">
											<div className="col">
												<div className="feature-right">
													<label> Informacion Medica</label>
													<input
														type="file"
														name="file_infomedica"
														id="file_infomedica"
														className="form-control"
														onChange={e => actions.handleFileChange3(e)}
													/>
												</div>
											</div>
										</div>
										<div className="form-row">
											<div className="col">
												<div className="feature-right">
													<label> Documentos Generales</label>
													<input
														type="file"
														name="file_docgeneral"
														id="file_docgeneral"
														className="form-control"
														onChange={e => actions.handleFileChange2(e)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.handlePutServicioArchivo();
											}}
											data-dismiss="modal">
											Cargar Archivo
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
ModalArchivo.propTypes = {
	history: PropTypes.array
};
