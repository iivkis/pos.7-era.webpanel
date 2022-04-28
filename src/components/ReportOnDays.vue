<template>
	<div
		class="
			col-12 col-md-9
			d-flex
			flex-wrap
			bg-white
			p-2
			m-1
			p-md-3
			m-md-3
			shadow-sm
		"
	>
		<h6 class="col-12 text-center">Метрики по дням</h6>
		<div class="col-12 d-flex justify-content-center m-2">
			<input type="date" class="p-1" @change="chooseDate" />
		</div>

		<div class="col-12">
			<p class="text-muted text-center">
				<i class="bi bi-info-circle"></i>
				Нажмити на смену, чтобы увидеть детальную информацию
				<br />
				<i class="bi bi-exclamation-triangle"></i>
				Открытые в данный момент смены не имеют детальной информации
			</p>
		</div>

		<!-- sessions list -->
		<div class="col-12 d-flex flex-wrap" id="sessions-list">
			<table class="table table-hover table-bordered">
				<thead class="bg-white">
					<tr>
						<th scope="col">
							<i class="bi bi-list-ol"></i>
							ID смены
						</th>
						<th scope="col">
							<i class="bi bi-person-fill"></i>
							Сотрудник
						</th>
						<th scope="col">
							<i class="bi bi-cash-coin"></i>
							Выручка за смену
						</th>
						<th scope="col">
							<i class="bi bi-cart-check"></i>
							Кол-во чеков
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(session, index) in sessions"
						:key="index"
						@click="alertMoreInfo(index)"
					>
						<th scope="row">{{ session.id }}</th>
						<td>
							{{
								$store.getters.getEmployeeByID(
									session.employee_id
								).name || "(удалён)"
							}}
						</td>
						<td>
							{{ session.cash_earned + session.bank_earned }} ₽
						</td>
						<td>
							{{ session.number_of_receipts }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- sessions list -->
	</div>
</template>

<script>
	import http from "@/http";

	export default {
		name: "ReportOnDays",
		data: () => {
			return {
				dateStart: 0,
				dateEnd: 0,

				sessions: [
					{
						id: 0,
						bank_earned: 0,
						cash_close: 0,
						cash_earned: 0,
						cash_open: 0,
						date_close: 0,
						date_open: 0,
						employee_id: 0,
						number_of_receipts: 0,
						outlet_id: 0,
					},
				],
			};
		},

		props: ["selectedOutlet"],

		watch: {
			selectedOutlet() {
				if (this.$data.dateStart != 0) this.loadSessionsWithPeriod();
			},
		},

		methods: {
			alertMoreInfo(id) {
				let sess = this.$data.sessions[id];

				let info =
					`Cессия: id${sess.id}\n` +
					`Cотрудник: id${sess.employee_id}, (${
						this.$store.getters.getEmployeeByID(sess.employee_id)
							.name || "удалён"
					})\n\n` +
					`Кол-во чеков: ${sess.number_of_receipts}\n` +
					`Заработано оплатой наличными: ${sess.cash_earned} ₽\n` +
					`Заработано оплатой по карте: ${sess.bank_earned} ₽\n\n` +
					`Дата открытия: ${new Date(sess.date_open).toString()}\n` +
					`Дата закрытия: ${new Date(sess.date_close).toString()}\n`;

				alert(info);
			},

			chooseDate(e) {
				let unixtime = Date.parse(e.target.value);

				this.$data.dateStart = unixtime;
				this.$data.dateEnd = unixtime + 86_400_000; // add 1 day in ms

				this.loadSessionsWithPeriod();
			},

			loadSessionsWithPeriod() {
				http({
					url: "/sessions",
					method: "GET",
					headers: {
						Authorization: this.$store.state.emplJWT,
					},
					params: {
						start: this.$data.dateStart,
						end: this.$data.dateEnd,
						outlet_id: this.$props.selectedOutlet,
					},
				}).then(({ data }) => {
					console.log(data);
					this.$data.sessions = data.data;
				});
			},
		},
	};
</script>

<style scoped>
	#sessions-list {
		max-height: 300px;
		/* min-width: 400px; */
		overflow: auto;
	}

	#sessions-list thead {
		position: sticky;
		top: 0;
	}
</style>
