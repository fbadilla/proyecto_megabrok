const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "https://8000-be081a0a-e93c-4781-986f-793517b79813.ws-us1.gitpod.io",
			token: {
				refresh: "",
				access: ""
			},
			avisos: [],
			grupos: [],
			evento: [],
			miembros: [],
			miembro: {},
			username: "",
			password: "",
			password2: "",
			email: "",
			error: {}
		},
		actions: {
			handleChange: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value
				});
			},

			handleMiembro: e => {
				const { name, value } = e.target;
				const store = getStore();
				let miembro = store.miembro;
				miembro[name] = value;
				setStore({
					miembro
				});
			},

			handleGrupo: (e, history) => {
				e.preventDefault();
				getActions().postgrupo(history);
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
				getActions().putMiembro(history);
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

						history.push("/usuarios");
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
				fetch(store.apiUrl + "/api/anuncios/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ document: data }))
					.catch(error => setStore({ error }));
			},
			getEvento: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/eventos/", {
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
			getMiembros: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/miembros", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ miembros: data }));
			},
			getMiembro: () => {
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
						setStore({ miembro: data });
						console.log(data);
					});
			},
			putMiembro: history => {
				const store = getStore();
				const data = store.miembro;

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
						setStore({ miembro: data });
						alert("Tus datos se actualizaron");
						history.push("/usuarios");
					});
			},
			postgrupo: history => {
				const store = getStore();
				const data = store.grupos;

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
						setStore({ grupos: data });
						alert("se a creado tu nuevo grupo");
						history.push("/usuarios");
					});
			},
			getGrupos: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/grupos/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ grupos: data }));
			},
			SaveDocumento: data => {
				const store = getStore();
				if (data != "") {
				} else {
					alert("INGRESA DATOS");
				}
				console.log(data);

				fetch(store.apiUrl + "/api/anuncios/", {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						Authorization: "Bearer " + getStore().token.access,
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(resp => {
						getActions().getDocumento();
					});

				//reset the global store
				//setStore({ demo: demo });
			},
			SaveEvento: history => {
				const store = getStore();
				const data = store.grupos;

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
						setStore({ grupos: data });
						alert("se a creado tu nuevo grupo");
						history.push("/eventos");
					});

				//reset the global store
				//setStore({ demo: demo });
			},
			postevento: history => {
				const store = getStore();
				const data = store.grupos;

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
						setStore({ grupos: data });
						alert("se a creado tu nuevo evento");
						history.push("/eventos");
					});
			}
		}
	};
};

export default getState;
