import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./views/home";
import injectContext from "./store/appContext";
import { Usuarios } from "./views/user";
import { modificarUsuario } from "./views/modprofile";
import { ingresarReclamo } from "./views/ingresarReclamo";
import { DashReclamo } from "./views/dashReclamo";
import { Navbar } from "./component/navbar";
import { FormularioChile } from "./views/formularioChile";
import { FormDoc } from "./views/formDoc";
import { FormDocUpdate } from "./views/formDocUpdate";

import { Context } from "./store/appContext";

//create your first component
export class Layout extends React.Component {
	render() {
		//the basename is used when your project is published in a subdirectory and not in the root of the domain
		// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
		const basename = process.env.BASENAME || "";

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
									<Switch>
										<Route exact path="/" component={Home} />
										<Route path="/usuarios" component={Usuarios} />
										<Route path="/modprofile" component={modificarUsuario} />
										<Route path="/ingresareclamo" component={ingresarReclamo} />
										<Route path="/formulariochile" component={FormularioChile} />
										<Route path="/reclamos" component={DashReclamo} />
										<Route path="/formdoc" component={FormDoc} />
										<Route path="/update" component={FormDocUpdate} />
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
