<template>
	<div class="auth d-flex flex-wrap justify-content-center">
		<form class="col col-md-4 mt-5 p-5 bg-white shadow-sm">
			<div class="d-flex justify-content-center">
				<img :src="logo" alt="logo" />
			</div>
			<!-- email -->
			<div class="row mt-3">
				<input
					autocomplete="on"
					type="text"
					class="form-control"
					placeholder="Е-мейл"
					v-model.trim="email"
				/>
			</div>

			<!-- password -->
			<div class="row mt-3">
				<input
					autocomplete="on"
					type="password"
					class="form-control"
					placeholder="Пароль организации"
					v-model.trim="password"
				/>
			</div>

			<!-- pin -->
			<div class="row mt-3">
				<input
					autocomplete="on"
					class="form-control"
					placeholder="PIN владельца"
					v-model.trim="securepin"
					@keyup="enterPIN"
					@keyup.delete="delPIN"
					maxlength="6"
				/>
			</div>

			<!-- signIn btn -->
			<div class="row mt-3">
				<button class="btn btn-outline-primary" @click.prevent="signIn">
					Вход
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import logo from "@/assets/logo.png";
	import http from "@/http";

	export default {
		name: "AuthView",

		data: () => {
			return {
				email: "",
				password: "",
				pin: "",
				securepin: "",

				logo: logo,
			};
		},

		methods: {
			async loadOutlets() {
				let { data } = await http({
					url: "/outlets",
					method: "get",
					headers: {
						Authorization: this.$store.state.orgJWT,
					},
				});
				this.$store.commit("setOutlets", data.data);
			},

			async loadEployees() {
				let { data } = await http({
					url: "/employees",
					method: "get",
					headers: {
						Authorization: this.$store.state.orgJWT,
					},
				});
				this.$store.commit("setEmployees", data.data);
			},

			//Запрос на вход
			async signIn() {
				let ownerID;

				//auth in org
				try {
					let res = await http({
						url: "/auth/signIn.Org",
						method: "post",
						data: {
							email: this.$data.email,
							password: this.$data.password,
						},
					});
					this.$store.commit("setOrgJWT", res.data.data.token);
				} catch {
					alert("неверные данные для входа");
					return;
				}

				//get employess & find ownerID
				await this.loadEployees();

				for (let i = 0; i < this.$store.state.employees.length; i++) {
					if (this.$store.state.employees[i]["role"] === "owner") {
						ownerID = this.$store.state.employees[i]["id"];
						break;
					}
				}

				//signIn in owner
				try {
					let res = await http({
						url: "/auth/signIn.Employee",
						method: "post",
						headers: {
							Authorization: this.$store.state.orgJWT,
						},
						data: {
							id: ownerID,
							password: this.$data.pin,
						},
					});
					this.$store.commit("setEmplJWT", res.data.data.token);
					this.$store.commit("setAffiliate", res.data.data.affiliate);
				} catch {
					alert("ошибка при входе в аккаунт владельца");
					return;
				}

				await this.loadOutlets();

				// localStorage.setItem("org", this.$store.state.orgJWT);
				// localStorage.setItem("empl", this.$store.state.emplJWT);

				this.$router.push({ name: "report" });
			},

			enterPIN(e) {
				if (this.$data.pin.length < 6) {
					this.$data.pin += e.target.value.slice(-1);
					this.$data.securepin = "*".repeat(this.$data.pin.length);
				}
			},

			delPIN() {
				this.$data.pin = "";
				this.$data.securepin = "";
			},
		},
	};
</script>

<style scoped>
</style>