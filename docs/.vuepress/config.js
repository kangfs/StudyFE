import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress/cli'
import {viteBundler} from '@vuepress/bundler-vite'
import constructSidebar from './sidebars/construct'
import typescriptAxiosSidebar from './sidebars/typescript-axios'
import FrontendSidebar from './sidebars/Front-end'
import FrontsuperSidebar from './sidebars/Front-super'
import FlutterSidebar from './sidebars/Flutter'
import nodeRESTfulSidebar from './sidebars/node-RESTful'
import FullStackFriendCircleSidebar from './sidebars/Full-Stack-FriendCircle'
import jestSidebar from './sidebars/jest'
import AlgorithmSidebar from './sidebars/Algorithm'
import WeiXinRumenSiderbar from './sidebars/WeiXin-Rumen'
import WeiXinCombatSidebar from './sidebars/WeiXinCombat'
import WeiXinMoneySidebar from './sidebars/WeiXinMoney'
import nodeSidebar from './sidebars/node'
import nodeGraphQLSidebar from './sidebars/node-GraphQL'
import nodeWeiboSidebar from './sidebars/node-weibo'
import nodeBFFSidebar from './sidebars/node-BFF'
import WebpackSidebar from './sidebars/Webpack'
import vueSSRSidebar from './sidebars/vue-ssr'
import goSidebar from './sidebars/go'
import BeegoSidebar from './sidebars/Beego'
import goConcurrentSiderbar from './sidebars/go-concurrent'
import goWebSidebar from './sidebars/go-web'
import mysqlSidebar from './sidebars/Mysql'
import protocolSidebar from './sidebars/protocol'
import goReptileSidebar from './sidebars/go-reptile'
import linuxSidebar from './sidebars/Linux'
import prometheusSidebar from './sidebars/prometheus'
import vueInterviewSidebar from './sidebars/vueInterview'
import reactReduxSiderbar from './sidebars/react-redux'
import learnMaterialsSodebar from './sidebars/learnMaterials'
import reactSSRSiderbar from './sidebars/react-ssr'
import FlutterKnowSidebar from './sidebars/Flutter-Know'
import reactAntdSiderbar from './sidebars/react-antd'
import WeiXinQuanZhanSidebar from './sidebars/WeiXin-Quanzhan'
import FrontadvanceSidebar from './sidebars/Front-advance'
import OptimizationSidebar from './sidebars/optimization'
import reactWebAppSiderbar from './sidebars/react-webapp'
import reactSourceSiderbar from './sidebars/react-source'
import reactTypescriptSiderbar from './sidebars/react-typescript'
import webarchitectSiderbar from './sidebars/web-architect'
import bigFrontEndSiderbar from './sidebars/big-front-end'

export default defineUserConfig({
    lang: 'en-US',

    title: 'VuePress',
    description: 'My first VuePress Site',

    theme: defaultTheme({
        logo: 'https://vuejs.press/images/hero.png',
        home: '/',

        navbar: [
            {text: '首页', link: '/'},
            {text: '资料', link: '/learnMaterials/'},
            {text: 'github', link: 'https://github.com/taopoppy/'},
            {text: '小技巧', link: '/construct/'},
            {
                text: 'Flutter',
                children: [
                    {text: 'Flutter入门到实战', link: '/Flutter/'},
                    {text: 'Flutter知识详解', link: '/Flutter-Know/'},
                ]
            },
            //{ text: '算法世界', link: '/Algorithm/'},
            {
                text: '小程序',
                children: [
                    {text: '微信小程序入门和实战', link: '/WeiXin-Rumen/'},
                    // { text: '微信小程序全栈开发实战', link: '/Weixin-quanzhan/'},
                    // { text: '微信小程序云开发实战', link: '/WeiXin-Combat/' },
                    {text: '微信支付和分享', link: '/WeiXin-money/'}
                ]
            },
            {
                text: '工具系列',
                children: [
                    {text: '前端自动化测试', link: '/Jest/'},
                    {text: '前端工程化', link: '/Webpack/'},
                    {text: '前端性能优化', link: '/Optimization/'}
                ]
            },
            // {
            //   text: '全栈',
            //   children: [
            //     { text: '朋友圈', link: '/Full-Stack-FriendCircle/'}
            //   ]
            // },
            {
                text: 'Go',
                children: [
                    {text: 'go语言入门实践', link: '/go/'},
                    {text: 'go并发编程详解', link: '/go-concurrent/'},
                    {text: 'go与web编程实战', link: '/go-web/'},
                    {text: 'go爬虫编程实战', link: '/go-reptile/'},
                    {text: 'Beego框架入门', link: '/Beego/'}
                ]
            },
            {
                text: 'node',
                children: [
                    {text: 'node入门', link: '/node/'},
                    {text: 'node与RESTful', link: '/node-RESTful/'},
                    {text: 'node与GraphQL', link: '/node-GraphQL/'},
                    {text: 'node与BFF', link: '/node-BFF/'},
                    {text: 'node博客后台', link: '/node-blog/'},
                    {text: 'node实战微博', link: '/node-weibo/'},
                    {text: 'node微服务', link: '/node-microService/'}
                ]
            },
            // {
            //   text: 'TS系列',
            //   children: [
            //     { text: 'TypeScript入门与实战', link: '/typescript/' },
            //     { text: 'TS重构axios项目开发', link: '/typescript-axios/' }
            //   ]
            // },
            {
                text: 'react',
                children: [
                    // { text: 'React开发简书项目', link: '/react-junior/' },
                    // { text: 'React实战大众点评WebApp', link: '/react-dazhong/'},
                    // { text: 'React去哪儿网火车票PWA', link: '/react-quna/'},
                    {text: 'React+Redux入门详解', link: '/react-redux/'},
                    {text: 'React+TypeScript的完美结合', link: '/react-typescript/'},
                    {text: 'React网易云Webapp', link: '/react-webapp/'},
                    {text: 'React服务器渲染原理解析', link: '/react-ssr/'},
                    {text: 'React深度剖析和源码解析', link: '/react-source/'},
                    {text: 'React+Typescript开发组件库', link: '/react-antd/'}
                    // { text: 'React+Next.js+Koa2', link: '/react-next/' },
                    // { text: 'React源码深度解析', link: '/react-yuanma/'}
                ]
            },
            {
                text: 'vue',
                children: [
                    // { text: 'Vue2.5开发去哪儿网App', link: '/vue-quna/'},
                    // { text: 'Get全栈技能打造商城系统', link: '/vue-shagncheng/' },
                    // { text: 'Vue 实战商业级读书WebApp', link: '/vue-dushu/'},
                    {text: 'Vue服务端渲染原理解析', link: '/vue-ssr/'},
                    {text: 'Vue3入门和实践', link: '/vue-interview/'}
                    // { text: 'Vue全家桶+SSR+Koa2', link: '/vue-nuxt/' },
                    // { text: 'Vue.js源码全方位深入解析', link: '/vue-yuanma/' }
                ]
            },
            {
                text: '后端系列',
                children: [
                    {
                        text: '数据库',
                        children: [
                            {text: 'mysql', link: '/Mysql/'},
                            {text: 'mysql-Architecture', link: '/Mysql-Architecture/'}
                        ]
                    },
                    {
                        text: 'linux操作系统',
                        children: [
                            {text: 'linux', link: '/Linux/'},
                            {text: 'linux-Architecture', link: '/Linux-Architecture/'}
                        ]
                    },
                    {
                        text: '网络协议',
                        children: [
                            {text: 'protocol', link: '/Protocol/'},
                            {text: 'font-end-protocol', link: 'font-end-protocol'}
                        ]
                    },
                    {
                        text: '运维系统',
                        children: [
                            {text: 'prometheus', link: '/prometheus/'}
                        ]
                    }
                ]
            },
            {
                text: '前端系列',
                children: [
                    {text: '前端初级面试', link: '/Front-end/'},
                    {text: '前端中级面试', link: '/Front-advance/'},
                    {text: '前端高级面试', link: '/Front-super/'}
                ]
            },
            {
                text: '究极全栈',
                children: [
                    {text: '大前端', link: '/Big-Front-End/'},
                    {text: 'web架构课', link: '/Web-Architect/'}
                ]

            }

        ],
        sidebarDepth: 3,
        lastUpdated: 'Last Updated', // string | boolean
        sidebar: {
            '/construct/': constructSidebar,
            '/Algorithm/': AlgorithmSidebar,
            '/Flutter/': FlutterSidebar,
            '/Flutter-Know/': FlutterKnowSidebar,
            '/node-RESTful/': nodeRESTfulSidebar,
            '/node-weibo/':nodeWeiboSidebar,
            '/node-BFF/': nodeBFFSidebar,
            '/Jest/': jestSidebar,
            '/vue-ssr/':vueSSRSidebar,
            '/vue-interview/': vueInterviewSidebar,
            '/Webpack/': WebpackSidebar,
            '/typescript-axios/': typescriptAxiosSidebar,
            '/Front-end/': FrontendSidebar,
            '/Front-advance/': FrontadvanceSidebar,
            '/Front-super/': FrontsuperSidebar,
            '/Optimization/':OptimizationSidebar,
            '/Full-Stack-FriendCircle/': FullStackFriendCircleSidebar,
            '/WeiXin-Rumen/':WeiXinRumenSiderbar,
            '/WeiXin-Combat/': WeiXinCombatSidebar,
            '/WeiXin-money/': WeiXinMoneySidebar,
            '/Weixin-quanzhan/': WeiXinQuanZhanSidebar,
            '/node/': nodeSidebar,
            '/go/': goSidebar,
            '/Linux/': linuxSidebar,
            '/go-reptile/': goReptileSidebar,
            '/Mysql/': mysqlSidebar,
            '/Protocol/': protocolSidebar,
            '/prometheus/': prometheusSidebar,
            '/go-web/': goWebSidebar,
            '/go-concurrent/': goConcurrentSiderbar,
            '/Beego/': BeegoSidebar,
            '/node-GraphQL/': nodeGraphQLSidebar,
            '/learnMaterials/': learnMaterialsSodebar,
            '/react-redux/': reactReduxSiderbar,
            '/react-ssr/':reactSSRSiderbar,
            '/react-antd/': reactAntdSiderbar,
            '/react-webapp/': reactWebAppSiderbar,
            '/react-source/': reactSourceSiderbar,
            '/react-typescript/': reactTypescriptSiderbar,
            '/Web-Architect/': webarchitectSiderbar,
            '/Big-Front-End/': bigFrontEndSiderbar
        }
    }),
    // plugins: ['@vuepress/back-to-top'],               //  配置回到顶部的插件
    bundler: viteBundler(),
})
