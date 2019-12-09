import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export default class ModalDeleteProveedor extends React.Component {
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
							id="ModalDeleteProveedor"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Eliminar Proveedor </label>
										</h5>
									</div>
									<div className="modal-body">Estas seguro que desea eliminar el Proveedor ?</div>

									<div className="modal-footer">
										<button type="button" className="btn btn-primary" data-dismiss="modal">
											Cerrar
										</button>
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.deleteProveedor();
											}}
											data-dismiss="modal">
											Eliminar Proveedor
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
ModalDeleteProveedor.propTypes = {
	history: PropTypes.array
};
