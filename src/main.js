import { createApp } from 'vue'
 
import 'element-plus/dist/index.css'
import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router';
import Entry from './RouterEntry.vue'
import element from 'element-plus'
const App =()=>import('./App.vue')
const ComponentFoundation = ()=>import('./componentdetail/ComponentFoundation.vue')
const List = ()=>import('./pages/List.vue')//对于vue-router不需要使用defineAsyncComponent，因为路由本身就是动态导入的
const ComponentProps=()=>import('./intocomponent/props/ComponentProps.vue')
const ComponentEmits=()=>import('./intocomponent/emits/ComponentEmits.vue')

// import App from './App.vue'
// import ComponentFoundation from './componentdetail/ComponentFoundation.vue'
// import List from './pages/List.vue'

// 2. 定义一些路由)
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {path: '/', component: App },
  {path:'/ComponentFoundation',component:ComponentFoundation},
  {path:'/List.html',component:List},
  {path:'/ComponentProps',component:ComponentProps},
  {path:'/ComponentEmits',component:ComponentEmits}
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // `routes: routes` 的缩写
})

const app = createApp(Entry)
app.use(router)
app.config.errorHandler=(err)=>{
    
}//通过config来配置应用级的信息，注意一定要在挂载前配置好
/*import('element-plus').then((element)=>{
})*/
//使用import()来异步懒加载需要的模块 该方法也会应用code split 将模块拆分，由于没有命名所以和index同名。实际应用发现codesplit虽然将chunk
//体积减小，但是加起来的总体积反而更大，应该是异步加载需要添加一部分的中间代码所导致的

app.use(element)
app.component()//通过component添加自定义组件，使得组件在app内都是可用的
app.mount('#app')
//app可以创建多个，分别挂载到一个大页面上的小部分上