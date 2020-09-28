<template>
  <button class="btn btn-logout" @click="logout">
    <i class="fa fa-power-off"></i>
    Sair
  </button>
</template>

<script>
/* eslint-disable */
export default {
  name: "Logout",
  methods: {
    async logout() {
      this.$root.$emit("spinner-show");

      await this.$firebase.auth().signOut();

      this.$router.push({ name: "login" });

      this.$root.$emit("spinner-hide");
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-logout {
  width: 100%;
  cursor: pointer;
  color: var(--light);
  &:hover {
    color: var(--featured);
  }
}
</style>
