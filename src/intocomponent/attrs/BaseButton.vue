<script setup>
import { ref } from 'vue';
const bgColor = ref('blue')
function baseClick(){
    console.log('baseClicked')
}
</script>
<template>
    <button :style="{'backgroundColor':bgColor}" @click="baseClick">基础按钮</button>
</template>
<style>
</style>