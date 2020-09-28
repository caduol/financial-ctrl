<template>
  <div>
    <h1>login</h1>
    <form class="c-form" @submit.prevent="doLogin">
      <div class="card c-form-card">
        <div class="card-header">
          <h1 class="h1">Financial</h1>
        </div>
        <div class="card-body">
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="E-mail"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Senha"
              v-model="password"
              required
            />
          </div>
          <button class="btn btn-primary btn-block" :disabled="loading">
            <template v-if="loading">
              Verificando ...
              <i class="fa fa-spinner fa-spin"></i>
            </template>
            <template v-else> Entrar </template>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Login",
  data() {
    return {
      email: "adm@financial.com",
      password: "123123",
      loading: false,
    };
  },
  methods: {
    async doLogin() {
      this.loading = true;
      const { email, password } = this;

      try {
        let res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        //global
        // res.user.uid >> se estiver vazio o usuario não estara logado
        window.uid = res.user.uid;
      } catch (err) {
        console.log(err);
      }

      setTimeout(() => {
        this.loading = false;

        if (window.uid !== null) this.$router.push({ name: "home" });
      }, 2000);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (window.uid) {
        vm.$router.push({ name: "home" });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.c-form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  &-card {
    flex-basis: 25%;
    color: var(--darker);
    .card-header {
      display: flex;
      justify-content: center;
      .h1 {
        font-size: 22pt;
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>
