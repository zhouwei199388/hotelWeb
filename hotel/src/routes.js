import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav1/HotelList.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/User.vue'
import Page6 from './views/nav3/Order.vue'
import echarts from './views/charts/echarts.vue'
import RoomList from './views/nav1/RoomList'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    {
        path: '/',
        component: Home,
        name: '酒店管理',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-message',//图标样式class
        iconPaths:'images/ic_head.svg',
        children: [
            // {path: '/main', component: Main, name: '主页', hidden: true},
            {path: '/table', component: Table, name: '酒店列表'},
            {path: '/roomList', component: RoomList, name: '房间管理', hidden: true},
            // {path: '/form', component: Form, name: '暂定活动'},
            // {path: '/user', component: user, name: '用户列表'},
        ]
    },

     {
        path: '/',
        component: Home,
        name: '酒店管理',
         leaf: true,//只有一个节点
        iconCls: 'el-icon-message',//图标样式class
        children: [
            // {path: '/main', component: Main, name: '主页', hidden: true},
            // {path: '/roomList', component: RoomList, name: '房间管理', hidden: true},
            // {path: '/table', component: Table, name: '酒店列表'},
            {path: '/form', component: Form, name: '暂定活动'},
            // {path: '/user', component: user, name: '用户列表'},
        ]
    },
     {
        path: '/',
        component: Home,
        name: '酒店管理',
         leaf: true,//只有一个节点
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/user', component: user, name: '用户列表'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            {path: '/order', component: Page6, name: '订单管理'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        leaf: true,//只有一个节点
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/echarts', component: echarts, name: 'echarts'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;