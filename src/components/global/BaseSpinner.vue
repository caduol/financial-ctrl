<template>
  <div class="base-spinner fa-3x" v-if="visible">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  name: "BaseSpinner",
  data() {
    return {
      visible: true,
    };
  },
  created() {
    // eventos de escuta global
    this.$root.$on("spinnerShow", () => (this.visible = true));
    this.$root.$on("spinnerHide", () => (this.visible = false));
  },
};
</script>

<style lang="scss" scoped>
.base-spinner {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--dark-medium);
  color: var(--featured);
  z-index: 1000;
}
</style>
