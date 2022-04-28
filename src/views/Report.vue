<template>
	<div class="report d-flex flex-wrap justify-content-center">
		<!-- select outlet -->
		<div
			class="
				col-12 col-md-9
				d-flex
				justify-content-between
				bg-white
				p-2
				m-1 m-md-3
				shadow-sm
			"
		>
			<select
				class="col-5 p-2"
				name="outlets"
				v-model.number="selectedOutlet"
				@change="changeOutlet"
			>
				<option
					v-for="(outlet, index) in $store.state.outlets"
					:key="index"
					:value="outlet.id"
				>
					{{ outlet.name }}
				</option>
			</select>

			<button class="btn btn-outline-dark" @click="reportOnLastSession">
				<i class="bi bi-arrow-repeat"></i>
			</button>
		</div>
		<!-- /select outlet -->

		<!-- report on last session -->
		<report-last-session :lastSession="lastSession" />
		<!-- report on last session -->

		<!-- report on days -->
		<report-on-days :selectedOutlet="selectedOutlet" />
		<!-- /report on days -->
	</div>
</template>

<script>
	import http from "@/http";

	import ReportLastSession from "@/components/ReportLastSession.vue";
	import ReportOnDays from "@/components/ReportOnDays.vue";

	export default {
		name: "ReportView",
		components: {
			ReportLastSession,
			ReportOnDays,
		},
		data: () => {
			return {
				selectedOutlet: 0,

				outlets: [
					{
						id: 0,
						name: "Загрузка...",
					},
				],

				lastSession: {
					id: 0,
					cash_earned: 0,
					bank_earned: 0,
					number_of_receipts: 0,
					cash_open: 0,
					cash_close: 0,
					date_open: 0,
					date_close: 0,
					employee_id: 0,
					outlet_id: 0,
				},
			};
		},

		mounted() {
			this.loadOutlets();
			this.reportOnLastSession();
		},

		watch: {
			lastSession: function (val) {
				let date;

				this.lastSession = val;

				//transform open date
				if (this.lastSession.date_open === 0)
					this.lastSession.date_open = "-";
				else {
					date = new Date(this.lastSession.date_open);
					this.lastSession.date_open = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
				}

				//transform close date
				if (this.lastSession.date_close === 0)
					this.lastSession.date_close = "-";
				else {
					date = new Date(this.lastSession.date_close);
					this.lastSession.date_close = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
				}
			},
		},

		methods: {
			changeOutlet() {
				this.reportOnLastSession();
			},

			loadOutlets() {
				http({
					url: "/outlets",
					method: "get",
					headers: {
						Authorization: this.$store.state.orgJWT,
					},
				}).then((res) => {
					this.$data.outlets = res.data.data;
					this.$data.selectedOutlet = res.data.data[0].id;
				});
			},

			reportOnLastSession() {
				http({
					url: "/sessions.Last",
					params: { outlet_id: this.$data.selectedOutlet },
					method: "get",
					headers: {
						Authorization: this.$store.state.emplJWT,
					},
				}).then((res) => {
					this.$data.lastSession = res.data.data;
					if (
						this.$data.lastSession.date_close === 0 &&
						this.$data.lastSession.date_open != 0
					) {
						this.calculateReceiptsByLastSession();
						this.calculateProfitByLastSession();
					}
				});
			},

			calculateReceiptsByLastSession() {
				http({
					url: "/orderInfo",
					params: { session_id: this.$data.lastSession.id },
					method: "get",
					headers: {
						Authorization: this.$store.state.emplJWT,
					},
				}).then((res) => {
					this.$data.lastSession.number_of_receipts =
						res.data.data.length;
				});
			},

			calculateProfitByLastSession() {
				http({
					url: "/orderList.Calc",
					params: { session_id: this.$data.lastSession.id },
					method: "get",
					headers: {
						Authorization: this.$store.state.emplJWT,
					},
				}).then((res) => {
					this.$data.lastSession.bank_earned = res.data.data.total;
				});
			},
		},
	};
</script>

<style>
	b {
		color: var(--color-lime);
		font-size: 1.05em;
	}
</style>