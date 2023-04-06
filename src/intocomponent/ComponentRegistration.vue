<script setup>
import { createApp } from 'vue';
import Entry from '../RouterEntry.vue'
import Ticker from '../componentdetail/SimpleComponent.vue'
//全局注册需要使用app，所以正常情况下是放在main.js进行的；此vue文件仅作为一种展示
const app = createApp(Entry)
app.component('Entry',Entry).component('Ticker',Ticker).component('notsfc',{//组件的定义
})
//在注册后，可以在该app应用中任意地方使用组件

</script>
<template>
    <div>

    </div>
</template>