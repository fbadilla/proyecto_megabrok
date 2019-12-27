import React from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import ModalDocumento from "./crear/modalServicio";
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
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<i className="ti-close" />
							</button>
						</div>
						<div className="modal-body">
							{/* lista no funciona, verificar porque y como mostraremos los datos <ListaServiciosView /> */}
						</div>

						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		);
	}
}
ModalViewServicio.propTypes = {
	history: PropTypes.array
};
