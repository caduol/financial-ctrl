<template>
  <nav class="nav flex-column">
    <div>
      <router-link
        exact
        exact-active-class="active"
        :key="i"
        v-for="(router, i) in routerLinks"
        class="nav-link"
        :to="{ name: router.name }"
      >
        <i class="fa" :class="`fa-${router.meta.icon}`"></i>
        {{ router.meta.title }}
      </router-link>
    </div>

    <layout-logout />
  </nav>
</template>

<script>
/* eslint-disable */
import LayoutLogout from "./LayoutLogout";

export default {
  name: "LayoutNavigation",
  components: {
    LayoutLogout,
  },
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter(
        (route) => route.name !== "login"
      );
    },
  },
};
</script>


<style lang="scss" scoped>
.nav {
  margin-left: -15px;
  width: calc(100% + 30px);
  height: calc(100vh - 46px);
  justify-content: space-between;
  &-link {
    color: var(--light);
    transition: 0.4s;
    &.active {
      color: var(--featured);
      background-color: tranparent;
    }
    &:hover {
      color: var(--darker);
      background-color: var(--featured);
    }
  }
}
</style>
