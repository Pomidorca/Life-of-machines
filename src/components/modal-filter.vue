<template>
  <div class="wrapper-filter-modal" :class="{ 'active-filter': monitorStatusModal }">
    <div class="modal-overlay" @click.self="closeModal">
    </div>
    <div class="modal-content flex flex-col">
      <div class="modal-content-header flex justify-between items-center">
        <span class="title">
          Фильтры
        </span>
        <div class="button-close" @click="closeModal">
          <img src="/img/filter/icon-close.svg">
        </div>
      </div>
      <div class="modal-content-body flex-1">
        <TheFilter/>
      </div>
    </div>
  </div>
</template>

<script>
import TheFilter from "@/components/TheFilter.vue";

export default {
  components: {TheFilter},
  methods: {
    closeModal() {
      const currentQuery = { ...this.$route.query };
      
      delete currentQuery.filter;

      this.$router.replace({ query: currentQuery });
    }
  },
  computed: {
    monitorStatusModal() {
      return this.$route.query.filter === 'selected';
    }
  }
}
</script>
