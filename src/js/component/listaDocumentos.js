import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class ListaDocumentos extends Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	render() {
		return (
			<table className="table table-striped table-sm">
				<thead>
					<tr>
						<th>Fecha </th>
						<th>documento</th>
						<th>Detalle</th>
						<th>pago</th>
						<th>total</th>
					</tr>
				</thead>
				<tbody>
					<Context.Consumer>
						{({ store, actions }) => {
							if (store.documentos.length > 0) {
								return store.documentos.map((item, i) => {
									return (
										<tr key={i}>
											<td>{item.date_doc}</td>
											<td>{item.numdoc}</td>
											<td>{item.detalle_tratamiento}</td>
											<td>{item.pago}</td>
											<td>{item.montodoc}</td>
										</tr>
									);
								});
							} else {
								return "";
							}
						}}
					</Context.Consumer>
				</tbody>
			</table>
		);
	}
}
ListaDocumentos.propTypes = {
	history: PropTypes.array
};
