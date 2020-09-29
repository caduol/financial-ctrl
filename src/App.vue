<template>
  <div id="app">
    <base-spinner />
    <layout-notification />
    <div class="container-fluid c-navigation" v-if="isLogged">
      <div class="row">
        <div class="col-2 c-navigation-sidebar">
          <h1 class="c-navigation-title">Menu</h1>
          <layout-navigation />
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
/* eslint-disable */
import BaseSpinner from "./components/global/BaseSpinner";
import LayoutNavigation from "./components/layout/LayoutNavigation";
import LayoutNotification from "./components/layout/LayoutNotification";

export default {
  name: "App",
  data() {
    return {
      isLogged: false,
    };
  },
  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification,
  },
  mounted() {
    // listener handler que assiste quando ha login ou logout
    this.$firebase.auth().onAuthStateChanged((user) => {
      // se user existe
      window.uid = user ? user.uid : null;

      this.isLogged = !!user;

      this.$router
        .push({ name: window.uid ? "home" : "login" })
        .catch(() => {});

      setTimeout(() => {
        this.$root.$emit("spinnerHide");
      }, 300);
    });
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: var(--light);
  background-color: var(--darker);
}

.c-navigation {
  &-sidebar {
    background-color: var(--dark-medium);
  }
  &-title {
    font-size: 24px;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
