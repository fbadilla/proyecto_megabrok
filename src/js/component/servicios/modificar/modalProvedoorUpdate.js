import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";

export default class ModalProveedorUpdate extends React.Component {
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
							id="modalProveedorUpdate"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Modificar Proveedor </label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">
										<div className="form-row">
											<div className="col">
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
										</div>
									</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.handlePutProveedorServicio();
											}}
											data-dismiss="modal">
											Modificar
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
ModalProveedorUpdate.propTypes = {
	history: PropTypes.array
};
