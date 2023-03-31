<script setup>
import RouteLink from './routes/RouteLink.vue';
import {ref} from 'vue'
const routeLinkRef = ref('/List')



function changeLink()
{
    if(routeLinkRef.value.startsWith('http'))
        routeLinkRef.value='/List'
    else
        routeLinkRef.value='http://www.baidu.com'

}
</script>

<template>
<div>
    <header style="padding-top: 10px;">
        <RouterLink to="/">app首页</RouterLink>
        <RouterLink to="/ComponentFoundation" class="routerlink">
            组件基础
        </RouterLink>

        <RouteLink :to="routeLinkRef" activeClass="aClass" inactiveClass="iaClass" bbb="ttt" xxx="bibibi">
            自定义link
        </RouteLink>
   

    </header>
    <div style="height: 100px;">
    <button @click="changeLink">改变链接</button>
    <span class="spanafter">这是一些文字</span>

    </div>
</div>
    <RouterView/>
</template>

<style>
.routerlink{
    margin:20px;
    text-decoration: none;
    border:1px black solid;
    padding-right: 5px;
}
.routerlink:visited{
    color:black
}
.aClass{
    color: crimson;
}
.iaClass{
    color:darkslategrey
}
.spanafter::after{
    content:"where am i"
}
</style>