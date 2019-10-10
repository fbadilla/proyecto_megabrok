import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class ListaMiembros extends Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		console.log("load group", this.storeContext);
		this.actionsContext.GetUser({}, this.props.history);
		console.log(this.props);
	}
	render() {
		return (
			<table className="table table-striped table-sm">
				<thead>
					<tr>
						<th>ID </th>
						<th>User</th>
						<th>Mail</th>
						<th>fecha</th>
						<th>telefono</th>
					</tr>
				</thead>
				<tbody>
					<Context.Consumer>
						{({ store, actions }) => {
							this.storeContext = store;
							this.actionsContext = actions;
							console.log("render", store.miembros);
							const peo2 = store.miembros.map((item, i) => {
								return (
									<tr key={i}>
										<td>{item.id}</td>
										<td>{item.userAccount}</td>
										<td>{item.mail}</td>
										<td>{item.fecha_nacimiento}</td>
										<td>{item.phone}</td>
									</tr>
								);
							});
							return <>{peo2}</>;
						}}
					</Context.Consumer>
				</tbody>
			</table>
		);
	}
}
ListaMiembros.propTypes = {
	history: PropTypes.array
};
