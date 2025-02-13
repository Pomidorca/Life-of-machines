<template>
    <div class="wrapper-info-technic flex flex-col justify-between py-8 px-6">
      <div class="container-filter flex justify-between items-center">
        <div class="title-filter">
          Выберите машину
        </div>
        <div class="structure-filter flex">
          <div class="params-radio">
            <input type="radio" id="structure" name="params-structure" checked>
            <label for="structure">
              Структура парка
            </label>
            <input type="radio" id="params" name="params-structure">
            <label for="params">
              Параметры парка
            </label>
          </div>
          <div class="button-info button-filter">
            <img src="/img/filter/filter-icon.svg" alt="">
          </div>
          <div class="button-info button-accordion" @click="toggleShowTechniques">
            <img src="/img/filter/arrow-down.svg" :class="{ 'img-rotate': showAccordion }" alt="">
          </div>
        </div>
      </div>
      <div class="accordion-content" :class="{ 'accordion-active': showAccordion }">
        <CardsTechnique />
      </div>
    </div>
</template>
<script>
import CardsTechnique from './CardsTechnique.vue';

export default {
  components: {
    CardsTechnique
  },
  data() {
    return {
      showAccordion: true
    };
  },
  methods: {
    toggleShowTechniques() {
      this.showAccordion = !this.showAccordion
    }
  }
}
</script>
