import React from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

export default class ModalEnvioReclamo extends React.Component {
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
							id="ModalEnvioReclamo"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Eliminar Reclamo </label>
										</h5>

										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">
										¿Estás seguro de enviar el reclamo?, esta acción no se puede deshacer
									</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => actions.enviarReclamo(store.formulario, store.servicios)}
											data-dismiss="modal">
											Enviar Reclamo
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
ModalEnvioReclamo.propTypes = {
	history: PropTypes.array
};
