export default [
    {
      path: '/apply',
      name: 'apply',
      component: () => import('@/view/apply/index'),
      meta: {
        cache: true,
        title: '报名'
      }
    },
    {
      path: '/applydetail/:id',
      name: 'applydetail',
      component: () => import('@/view/apply/detail'),
      meta: {
        cache: true,
        title: '报名详情'
      }
    }
]