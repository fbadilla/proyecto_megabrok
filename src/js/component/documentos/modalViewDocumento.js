import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import ModalDocumento from "./modalServicio";
import { ListaDocumentos } from "./listaDocumentos";
export default class ModalViewDocumento extends React.Component {
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
				id="modalviewdocumento"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="myLargeModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								<label htmlFor="inputNombre">Documentos </label>
							</h5>
						</div>
						<div className="modal-body">
							<ListaDocumentos />
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
ModalViewDocumento.propTypes = {
	history: PropTypes.array
};
