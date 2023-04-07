<script setup>
const emits=defineEmits(['click'])
</script>
<template>
    <div style="border: 1px solid black;width: 300px;line-height: 5;">
        <button @click="$emit('click',$event)">非原生click</button>
        <!--当使用了原生重名的事件时，组件只能监听我们定义的事件，原生click就不起作用了。点击外界的组件没有任何作用-->
    </div>
</template>