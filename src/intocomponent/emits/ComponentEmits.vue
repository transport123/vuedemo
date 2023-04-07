<script setup>
import ObjEmit from './CustomEmitComponentObj.vue'
import ArrEmit from './CustomEmitComponentArr.vue'

function submitA()
{
    console.log('submitA')
}
function submitB()
{
    console.log('submitB')
}
//emit在抛出事件的同时可以传递参数，且没有数量限制，都会直接传递给对应的函数
//需要注意使用emit抛出事件时，如果想访问原生的event事件，需要手动将其作为参数抛出
function submitC(account,pwd,e)
{
    console.log('submitC')
    console.log(`account:${account} pwd:${pwd}`)
    console.log(e)
}
function submitD()
{
    console.log('submitD')
}

function isOringinClick(e)
{
    console.log('clicked')
    console.log(e.target)
}
</script>

<template>
    <!--与原生dom事件不同，emit事件不会冒泡传递；平级或者嵌套的事件交互需要使用总线方案vuebus或者状态管理（vuex,pinia)-->
    <ObjEmit @submit-a="submitA" @submit-b="submitB" @submit-c="submitC" @submit-d="submitD">
    </ObjEmit>
    <ArrEmit @click="isOringinClick">
    </ArrEmit>
</template>