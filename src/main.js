import { createApp } from 'vue'
import APP from './basic/LastThree.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(APP)
app.config.errorHandler=(err)=>{
    
}//通过config来配置应用级的信息，注意一定要在挂载前配置好
app.use(ElementPlus)
app.component()//通过component添加自定义组件，使得组件在app内都是可用的
app.mount('#app')
//app可以创建多个，分别挂载到一个大页面上的小部分上