<template>
  <div class="wrapper-info-technic flex flex-col justify-between">
    <div class="py-8 px-6">
      <div class="container-filter flex justify-between items-center">
        <div class="title-filter">
          Выберите машину
        </div>
        <div class="structure-filter">
          <div class="params-radio flex">
            <router-link :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: link.mode } }"
                         v-for="(link, index) in getCurrentPageLinks"
                         :key="link.text">
              <input type="radio" :id="`url-` + index" name="params-structure" :checked="($route.query.mode || getCurrentPageLinks[0].mode) === link.mode">
              <label :for="`url-` + index">
                {{ link.text }}
              </label>
            </router-link>
          </div>
          <div @click="openFilter()" class="button-info button-filter">
            <img src="/img/filter/filter-icon.svg" alt="">
          </div>
          <div class="button-info button-accordion" @click="toggleShowTechniques">
            <img src="/img/filter/arrow-down.svg" :class="{ 'img-rotate': showAccordion }" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-content flex" :class="{ 'accordion-active': showAccordion }">
      <CardsTechnique />
    </div>
    <Teleport to="body">
      <modal-filter/>
    </Teleport>
  </div>
</template>
<script>
import { pages } from '@/utilities/pagesData.js'
import CardsTechnique from './CardsTechnique.vue';
import ModalFilter from "@/components/modal-filter.vue";
import router from "@/router/index.js";

export default {
  components: {
    ModalFilter,
    CardsTechnique
  },
  props: {
    route: Object,
    mode: String
  },
  data() {
    return {
      showAccordion: true
    };
  },
  computed: {
    getCurrentPageLinks() {
      const currentPageName = this.$route.name;
      const currentPage = pages.find(page => page.name === currentPageName);
      return currentPage?.links || [];
    }
  },
  methods: {
    toggleShowTechniques() {
      this.showAccordion = !this.showAccordion
    },
    openFilter() {
      const queryParams = {
        mode: this.$route.query.mode,
        filter: 'selected'
      };

      router.push({ name: this.$route.name, params: { pageName: this.$route.params.pageName }, query: queryParams });
    }
  }
}
</script>
