<template>
  <div class="c-home">
    <div class="row">
      <div class="col-6 c-home-box">
        <small>Despesas</small>
        <div class="money" v-money-format="totals.totalSpend" />
        <small>30 eventos de compra</small>
      </div>
      <div class="col-6 c-home-box">
        <small>A media de gastos</small>
        <div class="money" v-money-format="totals.average" />
      </div>
      <div class="col-6 c-home-box">
        <small>A maior compra</small>
        <div class="money" v-money-format="totals.biggest.value" />
        <small>No dia 12/09/2020</small>
      </div>
      <div class="col-6 c-home-box">
        <small>A menor compra</small>
        <div class="money" v-money-format="totals.lowest.value" />
        <small>No dia 22/09/2020</small>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
// fazer merge com develop
export default {
  name: "Home",
  data() {
    return {
      expenses: [],
    };
  },
  computed: {
    totals() {
      const { expenses: exp } = this;

      const values = {
        totalSpend: 0,
        average: 0,
        biggest: {},
        lowest: {},
      };

      if (exp.length) {
        values.totalSpend = exp
          .map((e) => +e.value)
          .reduce((acc, cur) => acc + cur, 0);

        values.average = values.totalSpend / exp.length;

        values.biggest = exp.sort((a, b) => b.value - a.value)[0];
        values.lowest = exp.sort((a, b) => a.value - b.value)[0];
      }

      return values;
    },
  },
  methods: {
    getData() {
      // buscando os dados do usuario logado
      const ref = this.$firebase.database().ref(`/${window.uid}`);
      // o ref.on ira escutar as mudancas em realtime
      // o metodo data.val() pega os valores da consulta a atribui em values
      ref.on("value", (data) => {
        const values = data.val();
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
.c-home {
  padding: 15px;
  &-box {
    width: 100%;
    height: calc(50vh - 15px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30pt;
    border: 1px solid var(--dark-medium);
    flex-direction: column;
    small {
      font-size: 1.3rem;
    }
    &:nth-child(even) {
      border-left: none;
    }
    &:nth-child(n + 3) {
      border-top: none;
    }
    .money {
      color: var(--featured);
    }
  }
}
</style>
