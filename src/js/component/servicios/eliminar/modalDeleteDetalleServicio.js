import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext";
import PropTypes from "prop-types";

export default class ModalDeleteDetalleServicio extends React.Component {
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
							id="modaldeletedetalleservicio"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Eliminar Servicio </label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">¿Estas seguro que desea eliminar el Servicio ?</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => {
												actions.handleDeleteDetalleServicio();
											}}
											data-dismiss="modal">
											Eliminar Servicio
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
ModalDeleteDetalleServicio.propTypes = {
	history: PropTypes.array
};
