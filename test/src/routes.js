import Login from './views/Login'
import NotFound from './views/404'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

let routes=[
  {
    path:'/login',
    component:Login,
    name:'',
    hidden:true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  { path: '/main', component: Main },
  {
    path: '/',
    component: Home,
    name: '导航一',
    iconCls: 'el-icon-message',//图标样式class
    // children: [
    //   { path: '/main', component: Main, name: '主页', hidden: true },
    //   { path: '/table', component: Table, name: 'Table' },
    //   { path: '/form', component: Form, name: 'Form' },
    //   { path: '/user', component: user, name: '列表' },
    // ]
  },
];

export default routes;
