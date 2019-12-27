import React, { Component, Fragment } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";

export class ListaPersonas extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}

	render() {
		return (
			<Animated animationIn="fadeInLeft" animationOut="bounceOutLeft" animationInDuration={500} isVisible={true}>
				<Context.Consumer>
					{({ store, actions }) => {
						if (store.personasFiltro.length > 0) {
							let personas = store.personasFiltro.map((item, i) => {
								return (
									<tr key={i}>
										<td scope="row">{item.nombre + " " + item.apellido}</td>
										<td>{item.emailPrimario}</td>
										<td>{item.direccionParticular}</td>
										<td>{item.celular + " / " + item.telefonoCasa}</td>
										<td>{item.telefonoOficina}</td>
										<td>
											<button
												type="button"
												className="btn btn-primary2"
												data-toggle="modal"
												data-target="#modalPersonaUpdate"
												onClick={() => actions.handleUpdatePersona(item)}>
												<i className="ti-marker-alt" />
											</button>
										</td>
										<td>
											<button
												type="button"
												className="btn btn-primary3"
												data-toggle="modal"
												data-target="#ModalDeleteProveedor">
												<i className="ti-trash" />
											</button>
										</td>
									</tr>
								);
							});
							return (
								<div className="gtco-section ">
									<div className="table-responsive">
										<table className="table">
											<thead>
												<tr>
													<th scope="col">Nombres</th>
													<th scope="col">E-mail Primario</th>
													<th scope="col">Direccion Particular</th>
													<th scope="col">Telefonos </th>
													<th scope="col">Oficina </th>
													<th scope="col">Editar</th>
													<th scope="col">Eliminar</th>
												</tr>
											</thead>
											<tbody>{personas}</tbody>
										</table>
									</div>
								</div>
							);
						} else {
							return "";
						}
					}}
				</Context.Consumer>
			</Animated>
		);
	}
}
ListaPersonas.propTypes = {
	history: PropTypes.object
};
