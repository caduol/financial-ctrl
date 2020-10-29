<template>
  <div class="expense-list-item row">
    <div class="col-10">
      <small v-date-format="data.createdAt" />
      <span>{{ data.description }}</span>
      <button class="btn btn-sm btn-outline-primary">Ver comprovante</button>
    </div>

    <div class="col-2">
      <div v-money-format="data.value" />
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  props: {
    data: { type: Object, required: true },
  },
};
</script>
<style lang="scss" scoped>
.expense-list-item {
  padding: 10px 0;
  border-bottom: 1px solid var(--dark-medium);
  .description {
    display: flex;
    justify-content: space-between;
  }
}
</style>
