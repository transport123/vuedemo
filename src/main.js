import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createRouter,createWebHashHistory} from 'vue-router';
import Entry from './RouterEntry.vue'
import App from './App.vue'
import ComponentFoundation from './componentdetail/ComponentFoundation.vue'
import List from './pages/List.vue'
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: App },
  {path:'/ComponentFoundation',component:ComponentFoundation},
  {path:'/List',component:List}
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

const app = createApp(Entry)
app.use(router)
app.config.errorHandler=(err)=>{
    
}//通过config来配置应用级的信息，注意一定要在挂载前配置好
app.use(ElementPlus)
app.component()//通过component添加自定义组件，使得组件在app内都是可用的
app.mount('#app')
//app可以创建多个，分别挂载到一个大页面上的小部分上