import Vue from 'vue';
import Router from 'vue-router';
import {
  getLocalStorage
} from '@/core/utils/local-storage';

Vue.use(Router);


const routes = [{
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('../view/home'),
    meta: {
      title: '首页',
    }
  },
  
  {
    name: 'search',
    component: () => import('../view/home/search'),
    meta: {
      title: '搜索'
    }
  },

  {
    name: 'detailbook',
    component: () => import('../view/home/detailbook'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'comment',
    component: () => import('../view/home/detailbook/comment'),
    meta: {
      title: '评论'
    }
  },

  // 地址
  {
    name: 'address',
    component: () => import('../view/address'),
    meta: {
      title: '收货地址',
    }
  },
  {
    name: 'editaddress',
    component: () => import('../view/address/editaddress'),
    meta: {
      title: '编辑地址',
    }
  },
  //我的订单
  {
    name: 'order',
    component: () => import('../view/order'),
    meta: {
      title: '我的订单',
    }
  },

  {
    name: 'setting',
    component: () => import('../view/user/setting'),
    meta: {
      title: '设置',
    }
  },
  {
    name: 'user',
    component: () => import('../view/user'),
    meta: {
      title: '个人中心',
    }
  },
  {
    name: 'news',
    component: () => import('../view/user/news'),
    meta: {
      title: '客服',
    }
  },
  {
    name: 'cart',
    component: () => import('../view/cart'),
    meta: {
      title: '购物车'
    }
  },
  
  
  {
    name: 'my',
    component: () => import('../view/my'),
    meta: {
      title: '个人信息',
      // login: true
    }
  },
  
  //  登录相关页面
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login/login')
  },
  {
    path: '/login/registerGetCode',
    name: 'registerGetCode',
    component: () => import('../view/login/register-getCode')
  },
  {
    path: '/login/registerLogon',
    name: 'registerLogon',
    component: () => import('../view/login/register-logon')
  },
  {
    path: '/login/registerSubmit',
    name: 'registerSubmit',
    component: () => import('../view/login/register-submit')
  },
  {
    path: '/login/registerStatus/:status',
    name: 'registerStatus',
    props: true,
    component: () => import('../view/login/register-status')
  },
  {
    path: '/login/forget',
    name: 'forget',
    component: () => import('../view/login/forget')
  },
  {
    path: '/login/forget/reset',
    name: 'forgetReset',
    component: () => import('../view/login/forget-reset')
  },
  {
    path: '/login/forget/reset/:status',
    name: 'forgetStatus',
    props: true,
    component: () => import('../view/login/forget-status')
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  const {
    Authorization,
    user_id
  } = getLocalStorage(
    'Authorization',
    'user_id'
  );
  if (!Authorization && !user_id) {
    if (to.meta.login) {
      next({
        name: 'login',
        query: {
          redirect: to.name
        }
      });
      return;
    }
  }
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};