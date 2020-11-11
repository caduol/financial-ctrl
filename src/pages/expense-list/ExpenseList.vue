<template>
  <!-- //TODO VERIFICAR REGRAS FB -->
  <div>
    <div class="months-navigation">
      <div
        class="month-link"
        v-for="(month, i) in groupedMounths"
        :key="i"
        :class="{ active: month.month == activeMonth.month }"
        @click="setActiveMonth(month)"
      >
        <div class="month-label">{{ month.month }}</div>
        <div class="value-label" v-money-format="month.total" />
      </div>
    </div>

    <div class="container-group">
      <div class="container">
        <div v-if="!activeMonth.data">
          Você não cadastrou nenhuma despesa esse mês
        </div>
        <template v-else>
          <expense-list-item
            :key="index"
            :data="item"
            v-for="(item, index) in activeMonth.data"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import groupBy from "lodash.groupby";
import moment from "moment";
import ExpenseListItem from "./ExpenseListItem";

export default {
  name: "ExpensiveList",
  components: {
    ExpenseListItem,
  },
  data() {
    return {
      expenses: [],
      activeMonth: {},
    };
  },
  mounted() {
    this.setActiveMonth();
  },
  computed: {
    groupedMounths() {
      let groupedMounths = [];
      const pattern = "MM/YYYY HH";

      const addCurrentMonth = () => {
        groupedMounths.push({
          data: [],
          total: 0,
          month: moment().format("MM/YYYY"),
        });
      };

      if (this.expenses.length) {
        // usando somente o metodo lodash para agrupar valores por data
        const months = groupBy(this.expenses, (i) =>
          moment(i.createdAt).format("MM/YYYY")
        );

        // ordenando o array de datas conforme o ano
        const sortedMonths = Object.keys(months).sort((a, b) => {
          return moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))
            ? -1
            : +1;
        });

        groupedMounths = sortedMonths.map((month) => ({
          month,
          data: months[month],
          total: months[month]
            .map((i) => +i.value)
            .reduce((acc, cur) => acc + cur, 0),
        }));

        const lastMonth = moment(
          groupedMounths[groupedMounths.length - 1].month,
          "MM/YYYY"
        );

        // se o ultimo mes não for o mes atual
        if (!lastMonth.isSame(moment(), "month")) {
          addCurrentMonth();
        }
      } else {
        addCurrentMonth();
      }

      return groupedMounths;
    },
  },
  methods: {
    getData() {
      // buscando no banco as informações
      const ref = this.$firebase.database().ref(`/${window.uid}`);

      ref.on("value", (snapshot) => {
        const values = snapshot.val(); // recuperando as informações

        // recebendo os objetos e transformando em array
        this.expenses = Object.keys(values).map((i) => values[i]);
      });
    },
    setActiveMonth(month = null) {
      // exibindo o mes pelo click ou o ultimo mes no load da page
      this.activeMonth =
        month || this.groupedMounths[this.groupedMounths.length - 1];
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.months-navigation {
  display: flex;
  margin-left: -15px;
  width: calc(100% + 30px);
  background-color: var(--featured-dark);
  .month-link {
    padding: 15px;
    transition: 0.4s;
    text-align: center;
    cursor: pointer;
    &.active {
      background-color: var(--featured);
    }
    &:hover {
      background-color: var(--featured);
    }
    .value-label {
      color: var(--darker);
      font-size: 8pt;
    }
  }
}

.container-group {
  width: calc(100% + 15px);
  height: calc(100vh - 70px);
  overflow: hidden auto;
}

.container {
  font-size: 15pt;
  padding: 15px 0;
}
</style>
