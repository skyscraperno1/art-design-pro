import type { App } from 'vue'
import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import { useWorktabStore } from '@/store/modules/worktab'
import Home from '@views/index/index.vue'
import { SystemInfo } from '@/config/setting'
import { useUserStore } from '@/store/modules/user'
import { menuService } from '@/api/menuApi'
import { getIframeRoutes, routerMatch } from '@/utils/menu'
import { useMenuStore } from '@/store/modules/menu'
import { useSettingStore } from '@/store/modules/setting'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isIframe } from '@/utils/utils'

// 创建路由守卫参数类型别名
type GuardParams = {
  to: RouteLocationNormalized
  next: NavigationGuardNext
}

// 顶部进度条配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 600, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  parent: 'body' //指定进度条的父容器
})

// 路由项扩展
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

// 首页
export const HOME_PAGE = '/dashboard/console'

// 不需要权限的路由
const routes = [
  {
    path: '/',
    redirect: HOME_PAGE
  },
  {
    path: '/dashboard',
    component: Home,
    meta: {
      title: '监控中心',
      title_en: 'Dashboard'
    },
    children: [
      {
        path: '/dashboard/console',
        name: 'Console',
        component: () => import(`@views/dashboard/console/index.vue`),
        meta: {
          title: '工作台',
          title_en: 'Workbench',
          title_jp: 'ワークベンチ',
          keepAlive: false
        }
      },
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        component: () => import(`@views/dashboard/analysis/index.vue`),
        meta: {
          title: '分析页',
          title_en: 'Analysis',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@views/login/index.vue'),
    meta: {
      title: '登录',
      title_en: 'Login',
      title_jp: 'ログイン',
      isHideTab: true,
      setTheme: true
    }
  },
  {
    path: '/register',
    component: () => import('@views/register/index.vue'),
    meta: {
      title: '注册',
      title_en: 'Register',
      title_jp: '登録',
      isHideTab: true,
      noLogin: true,
      setTheme: true
    }
  },
  {
    path: '/forget-password',
    component: () => import('@views/forget-password/index.vue'),
    meta: {
      title: '忘记密码',
      title_en: 'Forgot Password',
      title_jp: 'パスワードを忘れた',
      isHideTab: true,
      noLogin: true,
      setTheme: true
    }
  },
  {
    path: '/exception',
    component: Home,
    meta: {
      title: '异常页面',
      title_en: 'Exception'
    },
    children: [
      {
        path: '/exception/403',
        component: () => import('@/views/exception/403.vue'),
        meta: {
          title: '403',
          title_en: '403'
        }
      },
      {
        path: '/exception/404',
        component: () => import('@views/exception/404.vue'),
        meta: {
          title: '404',
          title_en: '404'
        }
      },
      {
        path: '/exception/500',
        component: () => import('@views/exception/500.vue'),
        meta: {
          title: '500',
          title_en: '500'
        }
      }
    ]
  },
  {
    path: '/outside',
    component: Home,
    meta: {
      title: '内嵌页面',
      title_en: 'Outside'
    },
    children: [
      {
        path: '/outside/iframe/:path',
        component: () => import('@/views/outside/Iframe.vue'),
        meta: {
          title: 'iframe',
          title_en: 'iframe'
        }
      }
    ]
  },
  {
    path: '/template/pricing',
    component: () => import('@views/template/pricing.vue'),
    meta: {
      title: '定价',
      title_en: 'Pricing',
      title_jp: '価格設定',
      isHideTab: true
    }
  }
] as AppRouteRecordRaw[]

export const router = createRouter({
  history: createWebHashHistory(), // history 模式
  routes: routes, // 路由表
  scrollBehavior: () => ({ left: 0, top: 0 }) // 页面滚动行为
})

// 需要权限的路由
export const roleRoutes: AppRouteRecordRaw[] = [
  {
    path: '/user',
    name: 'User',
    component: Home,
    meta: {
      title: '用户管理',
      title_en: 'User Management',
      title_jp: 'ユーザー管理'
    },
    children: [
       {
        path: '/user/user',
        name: 'Users',
        component: () => import('@views/user/User.vue'),
        meta: {
          title: '个人中心'
        }
      },
      {
        path: '/user/account',
        name: 'Account',
        component: () => import('@views/user/Account.vue'),
        meta: {
          title: '账号管理',
          title_en: 'Account Management',
          title_jp: 'アカウント管理'
        }
      },
      {
        path: '/user/department',
        name: 'Department',
        component: () => import('@views/user/Department.vue'),
        meta: {
          title: '部门管理',
          title_en: 'Department Management',
          title_jp: '部門管理'
        }
      }
    ]
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Home,
    meta: {
      title: '菜单管理',
      title_en: 'Menu Management',
      title_jp: 'メニュー管理'
    },
    children: [
      {
        path: '/menu/menu',
        name: 'Menus',
        component: () => import('@views/menu/Menu.vue'),
        meta: {
          title: '菜单管理',
          title_en: 'Menu Management',
          title_jp: 'メニュー管理'
        }
      },
      {
        path: '/menu/permission',
        name: 'Permission',
        component: () => import('@views/menu/Permission.vue'),
        meta: {
          title: '权限控制',
          title_en: 'Permission Control',
          title_jp: '権限制御'
        }
      },
      {
        path: '/menu/nested',
        name: 'Nested',
        meta: {
          title: '嵌套菜单',
          title_en: 'Nested Menu',
          title_jp: 'ネストメニュー'
        },
        children: [
          {
            path: '/menu/nested/menu1',
            name: 'NestedMenu1',
            component: () => import('@views/menu/nested/menu1.vue'),
            meta: {
              title: '菜单1',
              title_en: 'Menu 1',
              title_jp: 'メニュー1'
            }
          },
          {
            path: '/menu/nested/menu2',
            name: 'NestedMenu2',
            meta: {
              title: '菜单2',
              title_en: 'Menu 2',
              title_jp: 'メニュー2'
            },
            children: [
              {
                path: '/menu/nested/menu2/menu2-1',
                name: 'NestedMenu2-1',
                component: () => import('@views/menu/nested/menu2/menu2-1.vue'),
                meta: {
                  title: '菜单2-1',
                  title_en: 'Menu 2-1',
                  title_jp: 'メニュー2-1'
                }
              }
            ]
          },
          {
            path: '/menu/nested/menu3',
            name: 'NestedMenu3',
            meta: {
              title: '菜单3',
              title_en: 'Menu 3',
              title_jp: 'メニュー3'
            },
            children: [
              {
                path: '/menu/nested/menu3/menu3-1',
                name: 'NestedMenu3-1',
                component: () => import('@views/menu/nested/menu3/menu3-1.vue'),
                meta: {
                  title: '菜单3-1',
                  title_en: 'Menu 3-1',
                  title_jp: 'メニュー3-1'
                }
              },
              {
                path: '/menu/nested/menu3/menu3-2',
                name: 'NestedMenu3-2',
                meta: {
                  title: '菜单3-2',
                  title_en: 'Menu 3-2',
                  title_jp: 'メニュー3-2'
                },
                children: [
                  {
                    path: '/menu/nested/menu3/menu3-2/menu3-2-1',
                    name: 'NestedMenu3-2-1',
                    component: () => import('@views/menu/nested/menu3/menu3-2/menu3-2-1.vue'),
                    meta: {
                      title: '菜单3-2-1',
                      title_en: 'Menu 3-2-1',
                      title_jp: 'メニュー3-2-1'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/result',
    name: 'Result',
    component: Home,
    meta: {
      title: '结果页面',
      title_en: 'Result Pages',
      title_jp: '結果ページ'
    },
    children: [
      {
        path: '/result/success',
        name: 'Success',
        component: () => import('@views/result/Success.vue'),
        meta: {
          title: '成功页',
          title_en: 'Success Page',
          title_jp: '成功ページ'
        }
      },
      {
        path: '/result/fail',
        name: 'Fail',
        component: () => import('@views/result/Fail.vue'),
        meta: {
          title: '失败页',
          title_en: 'Failure Page',
          title_jp: '失敗ページ'
        }
      }
    ]
  },
  {
    path: '/article',
    component: Home,
    name: 'Article',
    meta: {
      title: '文章管理',
      title_en: 'Article Management',
      title_jp: '記事管理'
    },
    children: [
      {
        path: '/article/article-publish',
        component: () => import('@views/article/ArticlePublish.vue'),
        meta: {
          title: '文章发布',
          title_en: 'Article Publish',
          title_jp: '記事発行'
        }
      },
      {
        path: '/article/article-list',
        component: () => import('@views/article/ArticleList.vue'),
        meta: {
          title: '文章列表',
          title_en: 'Article List',
          title_jp: '記事一覧'
        }
      },
      {
        path: '/article/detail',
        component: () => import('@views/article/ArticleDetail.vue'),
        meta: {
          title: '文章详情',
          title_en: 'Article Detail',
          title_jp: '記事詳細',
          isHideTab: true
        }
      },
      {
        path: '/article/comment',
        component: () => import('@views/article/Comment.vue'),
        meta: {
          title: '留言',
          title_en: 'Comment',
          title_jp: 'コメント'
        }
      }
    ]
  },
  {
    path: '/widgets',
    component: Home,
    name: 'Widgets',
    meta: {
      title: '组件库',
      title_en: 'Widgets',
      title_jp: 'コンポーネントライブラリ'
    },
    children: [
      {
        path: '/widgets/icon-list',
        component: () => import('@views/widgets/IconList.vue'),
        meta: {
          title: '图标库',
          title_en: 'Icon Library',
          title_jp: 'アイコンライブラリ'
        }
      },
      {
        path: '/widgets/icon-selector',
        component: () => import('@views/widgets/IconSelector.vue'),
        meta: {
          title: '图标选择器',
          title_en: 'Icon Selector',
          title_jp: 'アイコンセレクター'
        }
      },
      {
        path: '/widgets/image-crop',
        component: () => import('@views/widgets/ImageCrop.vue'),
        meta: {
          title: '图像裁剪',
          title_en: 'Image Crop',
          title_jp: '画像クロップ'
        }
      },
      {
        path: '/widgets/excel',
        component: () => import('@views/widgets/Excel.vue'),
        meta: {
          title: 'Excel',
          title_en: 'Excel',
          title_jp: 'エクセル'
        }
      },
      {
        path: '/widgets/video',
        component: () => import('@views/widgets/Video.vue'),
        meta: {
          title: '视频播放器',
          title_en: 'Video Player',
          title_jp: 'ビデオプレーヤー'
        }
      },
      {
        path: '/widgets/count-to',
        component: () => import('@views/widgets/CountTo.vue'),
        meta: {
          title: '数字滚动',
          title_en: 'Count To',
          title_jp: 'カウントトゥー'
        }
      },
      {
        path: '/widgets/wang-editor',
        component: () => import('@views/widgets/WangEditor.vue'),
        meta: {
          title: '富文本编辑器',
          title_en: 'Rich Text Editor',
          title_jp: 'リッチテキストエディター'
        }
      },
      {
        path: '/widgets/context-menu',
        component: () => import('@views/widgets/ContextMenu.vue'),
        meta: {
          title: '右键菜单',
          title_en: 'Context Menu',
          title_jp: 'コンテキストメニュー'
        }
      },
      {
        path: '/widgets/watermark',
        component: () => import('@views/widgets/Watermark.vue'),
        meta: {
          title: '水印',
          title_en: 'Watermark',
          title_jp: 'ウォーターマーク'
        }
      },
      {
        path: '/widgets/qrcode',
        component: () => import('@views/widgets/QRcode.vue'),
        meta: {
          title: '二维码',
          title_en: 'QR Code',
          title_jp: 'QRコード'
        }
      },
      {
        path: '/widgets/drag',
        component: () => import('@views/widgets/Drag.vue'),
        meta: {
          title: '拖拽',
          title_en: 'Drag',
          title_jp: 'ドラッグ'
        }
      },
      {
        path: '/widgets/text-scroll',
        component: () => import('@views/widgets/TextScroll.vue'),
        meta: {
          title: '文字滚动',
          title_en: 'Text Scroll',
          title_jp: 'テキストスクロール'
        }
      },
      {
        path: '/widgets/fireworks',
        component: () => import('@views/widgets/Fireworks.vue'),
        meta: {
          title: '礼花',
          title_en: 'Fireworks',
          title_jp: '花火'
        }
      }
    ]
  },
  {
    path: '/template',
    component: Home,
    name: 'Template',
    meta: {
      title: '模板',
      title_en: 'Template',
      title_jp: 'テンプレート'
    },
    children: [
      {
        path: '/template/chat',
        component: () => import('@views/template/chat.vue'),
        meta: {
          title: '聊天',
          title_en: 'Chat',
          title_jp: 'チャット'
        }
      },
      {
        path: '/template/cards',
        component: () => import('@views/template/cards.vue'),
        meta: {
          title: '卡片',
          title_en: 'Cards',
          title_jp: 'カード'
        }
      },
      {
        path: '/template/banners',
        component: () => import('@views/template/banners.vue'),
        meta: {
          title: '横幅',
          title_en: 'Banners',
          title_jp: 'バナー'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Home,
    name: 'System',
    meta: {
      title: '系统设置',
      title_en: 'System Settings',
      title_jp: 'システム設定'
    },
    children: [
      {
        path: '/system/setting',
        component: () => import('@views/system/Setting.vue'),
        meta: {
          title: '系统设置',
          title_en: 'System Settings',
          title_jp: 'システム設定'
        }
      },
      {
        path: '/system/api',
        name: 'Api',
        component: () => import('@views/system/Api.vue'),
        meta: {
          title: 'API管理',
          title_en: 'API Management',
          title_jp: 'API管理'
        }
      },
      {
        path: '/system/log',
        component: () => import('@views/system/Log.vue'),
        meta: {
          title: '系统日志',
          title_en: 'System Log',
          title_jp: 'システムログ'
        }
      }
    ]
  },
  {
    path: '/purchase',
    component: Home,
    name: 'Purchase',
    children: [
      {
        path: '',
        component: () => import('@views/purchase/Purchase.vue'),
        meta: {
          title: 'eSIM购买',
          title_en: ' Purchase eSIM',
          title_jp: 'eSIM購入'
        }
      }
    ]
  },
  {
    path: '/esim',
    component: Home,
    name: 'eSIM',
    children: [
      {
        path: '/esim/import',
        component: () => import('@views/widgets/Excel.vue'),
        meta: {
          title: '导入订单',
          title_en: 'Order Import',
          title_jp: '注文インポート'
        }
      },
      {
        path: '/esim/preview',
        name: 'Preview',
        meta: {
          title: 'eSIM一览',
          title_en: 'eSIM Preview',
          title_jp: 'eSIM一覧'
        },
        children: [
          {
            path: '/esim/preview/binding',
            name: 'Binding Member',
            component: () => import('@views/menu/nested/menu1.vue'),
            meta: {
              title: 'eSIM绑定',
              title_en: 'eSIM Binding',
              title_jp: 'eSIMバインド'
            }
          },
          {
            path: '/esim/preview/info',
            name: 'eSIM Info',
            component: () => import('@views/esim/info.vue'),
            meta: {
              title: 'eSIM信息',
              title_en: 'eSIM Info',
              title_jp: 'eSIM情報'
            }
          },
        ]
      }
    ]
  },
  {
    path: '/recharge',
    component: Home,
    name: 'Recharge',
    children: [
      {
        path: '',
        component: () => import('@views/recharge/Recharge.vue'),
        meta: {
          title: 'eSIM购买',
          title_en: ' Purchase eSIM',
          title_jp: 'eSIM購入'
        }
      }
    ]
  },
]

// 是否注册路由
const isRouteRegistered = ref(false)

// 路由跳转前
router.beforeEach(async (to, from, next) => {
  // 显示顶部进度条
  if (useSettingStore().showNprogress) {
    NProgress.start()
  }

  // 设置登录注册页面主题
  setSystemTheme(to)

  // 检查是否登录或者不需要登录
  checkLogin({ to, next })

  // 获取菜单数据，动态注册路由
  if (await handleRegisterRoutes({ to, next })) {
    return
  }

  // 检查路由是否存在
  checkRouteExist({ to, next })

  // 设置标签页
  setWorktab(to)

  // 设置页面标题
  setPageTitle(to)
  next()
})

// 路由跳转完成
router.afterEach(() => {
  // 隐藏顶部进度条
  if (useSettingStore().showNprogress) {
    NProgress.done()
  }
})

// 设置标签页
function setWorktab(to: RouteLocationNormalized) {
  const worktabStore = useWorktabStore()
  const settingStore = useSettingStore()
  const { meta, path, params, query } = to
  const { title, title_en, title_jp, isHideTab } = meta

  if (!isHideTab) {
    if (isIframe(path)) {
      const iframeRoute = getIframeRoutes().find((route: any) => route.path === to.path)
      
      if (iframeRoute?.meta) {
        const { title, title_en, title_jp } = iframeRoute.meta
        worktabStore.router({
          title,
          title_en,
          title_jp,
          path,
          params,
          query
        })
      }
    } else {

      if (settingStore.showWorkTab) {
        worktabStore.router({
          title: title as string,
          title_en: title_en as string,
          title_jp: title_jp as string,
          path,
          params,
          query
        })
      }
    }
  }
}

import { useTheme } from '@/composables/useTheme'

// 设置登录注册页面主题
function setSystemTheme(to: RouteLocationNormalized) {
  if (to.meta.setTheme) {
    useTheme().switchTheme(useSettingStore().systemThemeType)
  }
}

// 检查路由是否登录或不需要登录
function checkLogin({ to, next }: GuardParams) {
  const userStore = useUserStore()
  const { meta, path } = to
  const { noLogin } = meta

  if (!userStore.isLogin && path !== '/login' && !noLogin) {
    userStore.logOut()
    next('/login')
    return
  }
}

// 检查路由是否存在
function checkRouteExist({ to, next }: GuardParams) {
  if (to.matched.length === 0) {
    next('/exception/404')
    return
  }
}

// 设置页面标题
function setPageTitle(to: RouteLocationNormalized) {
  const { meta } = to

  if (meta.title) {
    if (meta.title === 'iframe') {
      const title2 = to.path.split('/').pop()
      const decodeTitle = decodeURIComponent(title2 || '')
      document.title = `${decodeTitle} - ${SystemInfo.name}`
    } else {
      document.title = `${meta.title} - ${SystemInfo.name}`
    }
  }
}

// 处理路由注册
async function handleRegisterRoutes({ to, next }: GuardParams) {
  if (!isRouteRegistered.value && useUserStore().isLogin) {
    try {
      await registerRoutes()
      next({ ...to, replace: true })
    } catch (error) {
      console.error('Failed to register routes:', error)
      next('/exception/500')
    }
    return true
  }
  return false
}

// 获取菜单，注册路由
async function registerRoutes(): Promise<void> {
  try {
    // 获取菜单列表
    const { menuList, closeLoading } = await menuService.getMenuList()

    // 判断菜单列表是否为空
    if (!Array.isArray(menuList) || menuList.length === 0) {
      throw new Error('获取菜单列表未空')
    }
    // 菜单列表存储到 pinia
    useMenuStore().setMenuList(menuList as [])
    // 注册路由
    routerMatch(menuList, roleRoutes)
    // 注册完成
    isRouteRegistered.value = true
    // 关闭 loading
    closeLoading()
  } catch (error) {
    console.error('获取菜单列表失败:', error)
    throw error
  }
}

export function initRouter(app: App<Element>) {
  app.use(router)
}
