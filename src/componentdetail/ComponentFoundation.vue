<script setup>
import {ref} from 'vue'
import SimpleComponent from './SimpleComponent.vue';
import HomeTab from './HomeTab.vue';
import ArchiveTab from './ArchiveTab.vue';
const counters=ref(['one','two','three'])
const componentSize=ref(15)
const tabs={HomeTab,
    ArchiveTab}
    

const currentTab=ref('HomeTab')
</script>

<template>
<h1>多个计数器</h1>
<div :style="{fontSize:`${componentSize}px`}">
<SimpleComponent v-for="counter in counters" :prefix="counter" @font-enlarge="componentSize++">
简单控件
</SimpleComponent>
</div>

<div>

    <button v-for="(_,key) in tabs" :key="key" @click="currentTab=key" :class="{currentBtn:currentTab===key}">{{key}}</button>
    <component :is="tabs[currentTab]">  
    </component>

</div>


</template>

<style>
.currentBtn{
    background-color: blue;
}

</style>