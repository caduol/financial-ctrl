<template>
  <div
    class="alert alert-dismissible fade show"
    v-if="show"
    :class="`alert-${type}`"
  >
    {{ message }}
    <button type="button" class="close" @click="close">
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      type: "danger",
      message: "",
    };
  },
  methods: {
    close() {
      this.message = "";
      this.type = "danger";
      this.show = false;
    },
  },
  created() {
    this.$root.$on("notificationShow", (payload) => {
      this.show = true;
      this.type = payload.type;
      this.message = payload.message;

      setTimeout(() => {
        this.close();
      }, payload.timeout || 4000);
    });
  },
};
</script>

<style scoped>
.alert {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}
</style>
