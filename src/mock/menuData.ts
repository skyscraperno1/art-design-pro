import { MenuListType } from '@/types/menu'

export const menuData: MenuListType[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    meta: {
      title: '仪表盘',
      title_en: 'Dashboard',
      title_jp: 'ダッシュボード',
      icon: '&#xe721;'
    },
    children: [
      {
        id: 101,
        path: '/dashboard/console',
        meta: {
          title: '工作台',
          title_en: 'Workbench',
          title_jp: 'ワークベンチ',
          keepAlive: true
        }
      }
    ]
  },
  {
    id: 2,
    name: 'User',
    path: '/user',
    meta: {
      title: '用户管理',
      title_en: 'User manguage',
      title_jp: 'ユーザー管理',
      icon: '&#xe86e;',
      keepAlive: true
    },
    children: [
      {
        id: 304,
        path: '/user/user',
        meta: {
          title: '个人中心',
          title_en: 'User center',
          title_jp: 'ユーザーセンター',
          keepAlive: true
        }
      },
      {
        id: 301,
        path: '/user/account',
        meta: {
          title: '账号管理',
          title_en: 'Account manguage',
          title_jp: 'アカウント管理',
          keepAlive: true
        }
      }
    ]
  },
  {
    id: 3,
    path: '/purchase',
    name: 'Purchase',
    meta: {
      title: 'eSIM购买',
      title_en: 'Purchase eSIM',
      title_jp: 'eSIM購入',
      icon: '&#xe7ef;',
      keepAlive: true
    }
  },
  {
    id: 4,
    path: '/recharge',
    name: 'Recharge',
    meta: {
      title: '充值管理',
      title_en: 'Recharge Management',
      title_jp: 'リチャージ管理',
      icon: '&#xe6f6;',
      keepAlive: true
    }
  },
  {
    id: 11,
    path: '/esim',
    name: 'eSIM',
    meta: {
      title: 'eSIM管理',
      title_en: 'eSIM Manage',
      title_jp: 'eSIM管理',
      icon: '&#xe712;'
    },
    children: [
      {
        id: 1110,
        path: '/esim/import',
        name: 'Import',
        meta: {
          title: '订单导入',
          title_en: 'Order Import',
          title_jp: '注文インポート',
          keepAlive: true
        }
      },
      {
        id: 1111,
        path: '/esim/preview',
        name: 'Preview',
        meta: {
          title: 'eSIM一览',
          icon: '&#xe676;',
          title_en: 'eSIM Preview',
          title_jp: 'eSIM一覧',
          keepAlive: true
        },
        children: [
          {
            id: 111101,
            path: '/esim/preview/binding',
            name: 'Binding Member',
            meta: {
              title: 'eSIM绑定',
              title_en: 'eSIM Binding',
              title_jp: 'eSIMバインディング',
              keepAlive: true
            }
          },
          {
            id: 111102,
            path: '/esim/preview/info',
            name: 'eSIM Info',
            meta: {
              title: 'eSIM信息',
              title_en: 'eSIM Info',
              title_jp: 'eSIM情報',
              keepAlive: true
            }
          }
        ]
      }
    ]
  }
]
