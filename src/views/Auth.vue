<template>
	<div class="auth d-flex flex-wrap justify-content-center">
		<h1 class="col-12 text-center p-2">7Era POS System</h1>
		<form class="col col-md-4 mt-3 p-4 bg-white">
			<!-- email -->
			<div class="row mt-3">
				<input
					name="email"
					type="text"
					class="form-control"
					placeholder="Е-мейл"
					v-model="email"
				/>
			</div>

			<!-- password -->
			<div class="row mt-3">
				<input
					name="org_password"
					type="password"
					class="form-control"
					placeholder="Пароль организации"
					v-model="password"
				/>
			</div>

			<!-- pin -->
			<div class="row mt-3">
				<input
					autocomplete="false"
					name="owner_pin"
					type="password"
					class="form-control"
					placeholder="PIN владельца"
					v-model="pin"
				/>
			</div>

			<!-- signIn btn -->
			<div class="row mt-3">
				<button class="btn btn-primary" @click.prevent="signIn">
					Вход
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import http from "@/openapi";

	export default {
		name: "AuthView",

		data: () => {
			return {
				email: "",
				password: "",
				pin: "",
			};
		},

		methods: {
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
				try {
					let res = await http({
						url: "/employees",
						method: "get",
						headers: {
							Authorization: this.$store.state.orgJWT,
						},
						data: {
							email: this.$data.email,
							password: this.$data.password,
						},
					});

					for (let i = 0; i < res.data.data.length; i++) {
						if (res.data.data[i]["role"] === "owner") {
							ownerID = res.data.data[i]["id"];
							break;
						}
					}
				} catch {
					alert("ошибка получения списка сотрудников");
					return;
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
					console.info("success auth!");
				} catch {
					alert("ошибка при входе в аккаунт владельца");
					return;
				}

				this.$router.push({ name: "report" });
			},
		},
	};
</script>
