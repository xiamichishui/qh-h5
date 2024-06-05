import { createRouter, createWebHashHistory } from 'vue-router';
import IndexView from '@/views/index.view.vue';
import PayResultView from '@/views/pay-result.view.vue';

const router = createRouter({
  history: createWebHashHistory(''),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: {
        title: '充值中心'
      }
    },
    {
      name: 'payResult',
      path: '/pay-result',
      component: PayResultView,
      meta: {
        title: '支付结果'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title;
  if (title) {
    document.title = title as string;
  }
  next();
});

export default router;
