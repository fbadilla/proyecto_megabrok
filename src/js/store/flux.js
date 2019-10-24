const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "https://damp-caverns-92972.herokuapp.com",
			apiUrl2: "https://cors-anywhere.herokuapp.com/https://mobile.bestdoctorsinsurance.com/spiritapi/api",
			token: {
				refresh: "",
				access: ""
			},
			documentos: [],
			Rol: [],
			evento: [],
			accounts: [],
			account: {},
			username: "",
			password: "",
			password2: "",
			email: "",
			asegurados: [],
			aseguradoselected: {},
			numpoliza: "",
			error: {}
		},
		actions: {
			handleChange: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value
				});
			},

			handleaccount: e => {
				const { name, value } = e.target;
				const store = getStore();
				let account = store.account;
				account[name] = value;
				setStore({
					account
				});
			},
			handledocument: e => {
				const { name, value } = e.target;
				const store = getStore();
				let documentos = store.documentos;
				documentos[name] = value;

				setStore({
					documentos
				});
			},
			handleenviodoc: (e, history) => {
				e.preventDefault();
			},

			handleRol: (e, history) => {
				e.preventDefault();
				getActions().postRol(history);
			},
			handleevento: (e, history) => {
				e.preventDefault();
				getActions().postevento(history);
			},

			handleLogin: (e, history) => {
				e.preventDefault();
				const store = getStore();
				getActions().login(store.username, store.password, history);
			},
			handleRegister: e => {
				e.preventDefault();
				const store = getStore();
				getActions().register(store.username, store.email, store.password);
			},
			handleUser: (e, history) => {
				e.preventDefault();
				getActions().putAccount(history);
			},
			handleSearch: (e, history) => {
				e.preventDefault();
				const store = getStore();
				getActions().getPoliza(history);
			},
			handleAseguradoSelected: (item, history) => {
				setStore({
					aseguradoselected: item
				});
			},
			login: (username, password, history) => {
				const store = getStore();
				const data = {
					username: username,
					password: password
				};
				fetch(store.apiUrl + "/api/token/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ token: data, username: "", password: "" });
						localStorage.setItem("token", data.access);

						history.push("/ingresareclamo");
					});
			},
			register: (username, email, password) => {
				const store = getStore();
				const data = {
					username: username,
					email: email,
					password: password
				};
				fetch(store.apiUrl + "/api/registro/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ token: data, username: "", email: "", password: "", password2: "" });
						alert("ya puedes iniciar sesion");
					});
			},
			getDocumento: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ documentos: data }))
					.catch(error => setStore({ error }));
			},
			getEvento: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/reclamos/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ evento: data }))
					.catch(error => setStore({ error }));
			},
			getaccounts: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/account", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ accounts: data }));
			},
			getaccount: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/profile/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ account: data });
						console.log(data);
					});
			},
			putAccount: history => {
				const store = getStore();
				const data = store.account;

				fetch(store.apiUrl + "/api/profile/", {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ account: data });
						alert("Tus datos se actualizaron");
						history.push("/usuarios");
					});
			},
			postRol: history => {
				const store = getStore();
				const data = store.Rol;

				fetch(store.apiUrl + "/api/profile/", {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ rol: data });
						alert("se agregado un nuevo rol");
						history.push("/profile");
					});
			},
			getRol: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/roles/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ Rol: data }));
			},
			SaveDocumento: data => {
				const store = getStore();

				fetch(store.apiUrl + "/api/documentos/", {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						Authorization: "Bearer " + getStore().token.access,
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ documentos: data });
					});

				//reset the global store
				//setStore({ demo: demo });
			},
			getPoliza: () => {
				const store = getStore();
				fetch(store.apiUrl2 + "/claim/policymembers/" + store.numpoliza, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic QkQxNzYwMy0wMTpOODVGWlJGU1pDMTFSVFNKT0pRRTQwUVFOM0lHRFQxSg=="
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ asegurados: data }))
					.catch(error => setStore({ error }));
			}
		}
	};
};

export default getState;
