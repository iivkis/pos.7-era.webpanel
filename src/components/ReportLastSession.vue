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
		<h6 class="col-12 text-center">Метрики по последней смене</h6>

		<div class="col d-flex flex-column">
			<span>
				<i class="bi bi-person-fill"></i> Сотрудник:
				<b>{{
					$store.getters.getEmployeeByID(
						$props.lastSession.employee_id
					).name
				}}</b>
			</span>
			<span>
				<i class="bi bi-bar-chart-line"></i> Статус смены:
				<b>
					{{ lastSession.date_close === "-" ? "открыта" : "закрыта" }}
				</b>
			</span>

			<hr />

			<span>
				<i class="bi bi-door-open"></i> Открыта:
				<b>{{ lastSession.date_open }}</b>
			</span>
			<span>
				<i class="bi bi-door-closed"></i> Закрыта:
				<b>{{ lastSession.date_close }}</b>
			</span>

			<hr />

			<span>
				<i class="bi bi-cash-coin"></i>
				Наличные на момент открытия кассы:
				<b>{{ lastSession.cash_open }}</b>
			</span>
			<span>
				<i class="bi bi-cash-coin"></i>
				Наличные на момент закрытия кассы:
				<b>{{ lastSession.cash_close }}</b>
			</span>

			<hr />

			<span>
				<i class="bi bi-cart-check"></i> Кол-во чеков:
				<b>
					{{ lastSession.number_of_receipts }}
				</b>
			</span>
			<span>
				<i class="bi bi-piggy-bank"></i> Выручка:
				<b>
					{{
						(
							lastSession.cash_earned + lastSession.bank_earned
						).toFixed(2)
					}}
					₽
				</b>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ReportLastSession",
		props: {
			lastSession: {},
		},
	};
</script>

<style>
</style>