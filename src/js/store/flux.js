const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "http://127.0.0.1:8000",
			apiUrl2: "https://apy-cors-fcobad.herokuapp.com/https://mobile.bestdoctorsinsurance.com/spiritapi/api",
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
			error: {},
			idReclamo: "",
			formulario: {},
			formularios: [],
			formulariosId: [],
			documento: {},
			documentoid: [],
			documentoid2: [],
			docfile: {},
			pdf: {},
			reclamo: {
				PolicyNumber: "",
				ClaimId: "",
				ClaimForm: "",
				Extension: "png",
				IsBankingInfo: "",
				Comments: ""
			}
		},
		actions: {
			handleChange: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value
				});
			},
			handleForm: e => {
				const { name, value } = e.target;
				const store = getStore();
				let formulario = store.formulario;
				formulario[name] = value;

				setStore({
					formulario
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
			handledocumento: e => {
				const { name, value } = e.target;
				const store = getStore();
				let documento = store.documento;
				documento[name] = value;

				setStore({
					documento
				});
			},
			handleenviodoc: (e, history) => {
				e.preventDefault();
			},

			handleRol: (e, history) => {
				e.preventDefault();
				getActions().postRol(history);
			},
			handleFormulario: (e, history) => {
				e.preventDefault();
				getActions().SaveFormulario(history);
			},

			handleEnvioDocumento: (e, history) => {
				getActions().getDocumentoId(history);
				getActions().SaveDocumentoSinFile(history);
				getActions().getDocumentoId(history);
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
				const store = getStore();
				setStore({
					aseguradoselected: item
				});
			},
			handleReclamo: e => {
				const { name, value } = e.target;
				const store = getStore();
				let reclamo = store.reclamo;
				reclamo[name] = value;
				setStore({
					reclamo
				});
			},
			handledatosfaltantes: e => {
				setStore({
					reclamo
				});
			},
			handleGenerate: (e, history) => {
				e.preventDefault();
				getActions().PostReclamo(history);
			},
			handleFileChange: e => {
				const docfile = e.target.files[0];

				setStore({
					docfile
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

						history.push("/formulariochile");
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
			getDocumentoId: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + store.formulario.id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ documentoid: data }))
					.catch(error => setStore({ error }));
			},
			getDocumentoId2: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ documentoid2: data }))
					.catch(error => setStore({ error }));
			},
			
			getDocumentoAll: () => {
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
			getDoc: ruta => {
				const store = getStore();
				fetch(store.apiUrl + ruta, {
					method: "GET"
				})
					.then(response => {
						window.open(store.apiUrl + ruta);
					})
					.catch(error => {
						console.log(error);
					});
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
			},
			PostReclamo: history => {
				const store = getStore();
				const data = store.reclamo;
				fetch(store.apiUrl2 + "/claim/fileclaim/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic QkQxNzYwMy0wMTpOODVGWlJGU1pDMTFSVFNKT0pRRTQwUVFOM0lHRFQxSg=="
					}
				})
					.then(resp => resp)
					.then(data => {
						setStore({ idReclamo: data });
						alert("reclamo generado con exito" + store.idReclamo.ClaimId);
					});
			},
			SaveFormulario: history => {
				const store = getStore();
				const data = store.formulario;
				fetch(store.apiUrl + "/api/reclamos/" + store.account.id, {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						Authorization: "Bearer " + getStore().token.access,
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ formulario: data });
						history.push("/formdoc");
					});
			},
			SaveDocumento: history => {
				const store = getStore();
				const data = store.documento;
				fetch(store.apiUrl + "/api/documentos/" + store.formulario.id, {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + getStore().token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ documento: data });
					});
			},
			SaveDocumentoSinFile: history => {
				const store = getStore();
				let form_data = new FormData();
				form_data.append("docfile", store.docfile, store.docfile.name);
				form_data.append("datedoc", store.documento.datedoc);
				form_data.append("nombre_proveedor", store.documento.nombre_proveedor);
				form_data.append("tipodoc", store.documento.tipodoc);
				form_data.append("numdoc", store.documento.numdoc);
				form_data.append("montodoc", store.documento.montodoc);
				form_data.append("detalle_tratamiento", store.documento.detalle_tratamiento);
				form_data.append("pago", store.documento.pago);
				const data = store.documento;
				fetch(store.apiUrl + "/api/documentos/" + store.formulario.id, {
					method: "Post",
					body: form_data,
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + getStore().token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ documento: data });
					});
			},
			getFormulario: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/reclamos/" + store.account.id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ formulariosId: data }))
					.catch(error => setStore({ error }));
			}
		}
	};
};

export default getState;
