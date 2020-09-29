<template>
  <div class="c-home">
    <div class="row">
      <div class="col-6 c-home-box">
        <small>Despesas</small>
        <div class="money">R$ 900.00</div>
        <small>30 eventos de compra</small>
      </div>
      <div class="col-6 c-home-box">
        <small>A media de gastos</small>
        <div class="money">R$ 90.00</div>
      </div>
      <div class="col-6 c-home-box">
        <small>A maior compra</small>
        <div class="money">R$ 290.00</div>
        <small>No dia 12/09/2020</small>
      </div>
      <div class="col-6 c-home-box">
        <small>A menor compra</small>
        <div class="money">R$ 70.00</div>
        <small>No dia 22/09/2020</small>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
export default {
  name: "Home",
  data() {
    return {
      expenses: [],
    };
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
