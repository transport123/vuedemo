<script setup>
import {ref} from 'vue'
const count=ref(15)
const greeting=ref('vue!')


function greet(event){
    alert(`hello ${greeting.value}`)
    if(event)
    console.log(event.target)
}

function stopBubble(event){
    console.log(event.currentTarget)
}

function selfEvent(){
    console.log('self function')
}

function preventDefault(){
    console.log('prevented')
}

function combinedMethod(){
    console.log('stoped and prevented')
}
</script>

<template>
    <div>
        <button @click="count++; count=count*2;Math.abs(count)">内联事件处理</button>
        <p>{{count}}</p>
        <button @click="greet">greet</button>
    </div>

    <div @click="stopBubble">
        <button @click.stop="stopBubble">停止冒泡</button>
    </div>

    <div @click.self="selfEvent">
        <button>自身处理</button>
    </div>

    <div>
        <form action="http://baidu.com" method="get" @submit.prevent="preventDefault">
            <input type="submit" value="提交"/> 
        </form>
        <a href="http://baidu.com" @click.stop.prevent="combinedMethod">跳转链接</a>
    </div>

    
</template>