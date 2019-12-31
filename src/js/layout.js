import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Home } from "./views/home";
import injectContext from "./store/appContext";
import { Usuarios } from "./views/user";
import { modificarUsuario } from "./views/modprofile";
import { ingresarReclamo } from "./component/reclamos/crear/ingresarReclamo";
import { DashReclamo } from "./views/dashReclamo";
import { Navbar } from "./component/navbar";
import { FormularioChile } from "./views/formularioChile";
import { FormDoc } from "./views/formDoc";
import { FormDocUpdate } from "./views/formDocUpdate";
import PrivateRoute from "./PrivateRoute";
import { MantenedorPersonas } from "./views/dashPersonas";

import { Context } from "./store/appContext";
import { DashProveedor } from "./views/dashProveedor";
import { DashPolizas } from "./views/dashPolizas";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//create your first component
export class Layout extends React.Component {
	render() {
		//the basename is used when your project is published in a subdirectory and not in the root of the domain
		// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
		const basename = "";
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<div className="page-inner">
							<BrowserRouter basename={basename}>
								<Fragment>
									<Navbar />
									<ToastContainer />
									<Switch>
										<Route exact path="/" component={Home} />
										<PrivateRoute path="/usuarios" component={Usuarios} access={store.access} />
										<PrivateRoute
											path="/modprofile"
											component={modificarUsuario}
											access={store.access}
										/>
										<PrivateRoute
											path="/ingresareclamo"
											component={ingresarReclamo}
											access={store.access}
										/>
										<PrivateRoute
											path="/formulariochile"
											component={FormularioChile}
											access={store.access}
										/>
										<PrivateRoute path="/reclamos" component={DashReclamo} access={store.access} />
										<PrivateRoute path="/formdoc" component={FormDoc} access={store.access} />
										<PrivateRoute path="/update" component={FormDocUpdate} access={store.access} />
										<PrivateRoute
											path="/proveedores"
											component={DashProveedor}
											access={store.access}
										/>
										<PrivateRoute
											path="/personas"
											component={MantenedorPersonas}
											access={store.access}
										/>
										<PrivateRoute path="/polizas" component={DashPolizas} access={store.access} />
										<Route render={() => <h1>Not found!</h1>} />
									</Switch>
								</Fragment>
							</BrowserRouter>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

export default injectContext(Layout);
