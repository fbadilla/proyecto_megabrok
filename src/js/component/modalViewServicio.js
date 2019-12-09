import React from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import ModalDocumento from "./modalServicio";
import { ListaServiciosView } from "./listaServiciosView";

export default class ModalViewServicio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}

	render() {
		return (
			<div
				className="modal fade"
				id="modalviewservicio"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="myLargeModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								<label htmlFor="inputNombre">Servicios </label>
							</h5>
						</div>
						<div className="modal-body">
							<ListaServiciosView />
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-primary" data-dismiss="modal">
								Cerrar
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
ModalViewServicio.propTypes = {
	history: PropTypes.array
};
