import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
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
											<label htmlFor="inputNombre">Subir Archivo </label>
										</h5>
									</div>
									<div className="modal-body">
										<div className="form-row">
											<div className="col-md-5">
												<div className="feature-left">
													<label>Proveedor</label>
													<Select
														value={store.proveedores[store.servicio.proveedor_id - 1]}
														className="basic-single"
														classNamePrefix="select"
														onChange={value => actions.handleServicioSelect(value)}
														options={store.proveedores}
													/>
												</div>
											</div>
											<div className="col-md-5">
												<div className="feature-right">
													<label> Archivo</label>
													<input
														type="file"
														name="archivoServicio"
														id="docfile"
														className="form-control"
														onChange={e => actions.handleFileChange(e)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="modal-footer">
										<button type="button" className="btn btn-primary" data-dismiss="modal">
											Cerrar
										</button>
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
