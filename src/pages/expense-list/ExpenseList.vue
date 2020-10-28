<template>
  <!-- //TODO VERIFICAR REGRAS FB -->
  <div class="months-navigation">
    <div class="month-link" v-for="(month, i) in groupedMounths" :key="i">
      <div class="month-label">{{ month.month }}</div>
      <div class="value-label" v-money-format="month.total" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import groupBy from "lodash.groupby";
import moment from "moment";

export default {
  name: "ExpensiveList",
  data() {
    return {
      expenses: [],
    };
  },
  computed: {
    groupedMounths() {
      if (this.expenses.length) {
        // usando somente o metodo lodash para agrupar valores por data
        const months = groupBy(this.expenses, (i) =>
          moment(i.createdAt).format("MM/YYYY")
        );

        // ordenando o array de datas conforme o ano
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = "MM/YYYY HH";
          if (moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))) {
            return -1;
          } else {
            return +1;
          }
        });

        return sortedMonths.map((month) => ({
          month,
          data: months[month],
          total: months[month]
            .map((i) => +i.value)
            .reduce((acc, cur) => acc + cur, 0),
        }));
      } else {
        return [];
      }
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
    &:hover {
      background-color: var(--featured);
    }
    .value-label {
      color: var(--darker);
      font-size: 8pt;
    }
  }
}
</style>
