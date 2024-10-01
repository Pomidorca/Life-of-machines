import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/ActiveView.vue')
    },
    {
      path: '/active',
      name: 'active',
      component: () => import('@/views/ActiveView.vue')
    },
    {
      path: '/time',
      name: 'time',
      component: () => import('@/views/TimeView.vue')
    },
    {
      path: '/DynamicsStructure',
      name: 'DynamicsStructure',
      component: () => import('@/views/DynamicsStructureView.vue')
    },
    {
      path: '/TechnicalEconomicIndicators',
      name: 'TechnicalEconomicIndicators',
      component: () => import('@/views/TEIView.vue')
    },
    {
      path: '/MaintenanceRepair',
      name: 'MaintenanceRepair',
      component: () => import('@/views/MaintenanceRepairView.vue')
    },
    {
      path: '/TechnicalCosts',
      name: 'TechnicalCosts',
      component: () => import('@/views/TechnicalCostsView.vue')
    },
    {
      path: '/TechnicalStructure',
      name: 'TechnicalStructure',
      component: () => import('@/views/TechnicalStructureView.vue')
    }
  ]
})

export default router