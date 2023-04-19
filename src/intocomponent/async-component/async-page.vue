<script setup>
//对于公共的loading,error组件，如果组件本身结构不复杂，体积较小，且复用性较高，可以考虑通过全局导入的方式，使其在应用中可用
//不过要搞清楚，这是 组件本身（即该组件打包后的文件）的加载过程，而不是常说的业务中的接口调用过程，譬如一个列表的骨架图占位等
//需要在业务中单独进行处理
import { defineAsyncComponent, inject,ref } from 'vue'
//对于较小的简单组件直接引入，不适用异步的方式
import LoadingComponent from './loading-component.vue'
import ErrorComponent from './error-component.vue'
const loaded = inject('asyncComponentLoaded', ref(false))
const loadAsync=inject('loadAsyncComponent',()=>{},false)
console.log('page loaded')
//通过一个bool值模拟组件是否加载,import内部应该也做了类似的缓存操作，一次加载完成后就不用再加载了
const customPromise = new Promise((resolve, reject) => {
    if (loaded.value) {
        resolve('pending done')
    } else {
        setTimeout(() => {
            loadAsync()
            resolve('pending done')
        }, 2000)
    }
}).then((x) => {
    console.log(x)
    return import('./async-component.vue')
}).then((component) => {
    return component
})

const AsyncComponent = defineAsyncComponent({
    loader: () => {
        return customPromise
    },
    loadingComponent: LoadingComponent,
    //delay表示在该值之后才去显式loading组件，为了避免闪屏现象
    delay: 200,
    errorComponent: ErrorComponent,
    //在组件加载失败时，即promise的回调调用了reject，error组件会被显式；
    //当超时时error组件也会显式，但如果之后还是成功resolve，异步组件仍会显式，而不是总是显式错误界面
    //感觉实际应用中timeout不设置更好，因为这种行为比较奇怪，通过上层的reject处理更加合理
}
)
</script>
<template>
    <div>
        i'm a placeholder
        <AsyncComponent></AsyncComponent>
    </div>
</template>
<style></style>