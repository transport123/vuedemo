<script setup>
import { createApp } from 'vue';
import Entry from '../RouterEntry.vue'
import Ticker from '../componentdetail/SimpleComponent.vue'
//全局注册需要使用app，所以正常情况下是放在main.js进行的；此vue文件仅作为一种展示
const app = createApp(Entry)
app.component('Entry',Entry).component('Ticker',Ticker).component('notsfc',{//组件的定义
})
//在注册后，可以在该app应用中任意地方使用组件。但是全局方式会将未使用的组件也打进生产环境的包中，无法使用“tree-shaking”将其移除
//且会将父子组件的依赖关系变得混乱，当项目变大时整体结构不清晰，不容易维护。所以还是更推荐传统的局部注册
//如果没有使用setup的语法糖，局部注册还需要对component进行一次申明

// export default{
//     components:{
//         Entry:Entry,
//         Ticker
//     }   
// }

</script>
<template>
    <div>
    </div>
</template>