import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/active'
    },
    {
      path: '/administration/registration',
      name: '/administration/registration',
      component: () => import('@/views/registration/AdminRegistration.vue'),
    },
    {
      path: '/active',
      name: 'active',
      component: () => import('@/views/ActiveView.vue'),
    },
    {
      path: '/time',
      name: 'time',
      component: () => import('@/views/TimeView.vue')
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
    },
    {
      path: '/STR',
      name: 'STR',
      component: () => import('@/views/STRView.vue')
    },
    {
      path: '/NPV',
      name: 'NPV',
      component: () => import('@/views/NPVView.vue')
    },
    {
      path: '/administration/new-organization',
      name: 'new-organization',
      component: () => import('@/views/registration/SuperAdminOrganizationRegistration.vue')
    },
    {
      path: '/administration/new-user',
      name: 'new-user',
      component: () => import('@/views/registration/AdminUserRegistration.vue')
    },
  ],
  
})

export default router