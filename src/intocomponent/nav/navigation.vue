<script setup>
import NavItem from './nav-item.vue';
const props = defineProps({
    dataSource:{
        type:Array,
        required:true,
        default()
        {
            return[{
                title:'default',
                children:[]
            }]
        }
    }
})
</script>
<template>
    <NavItem v-for="(path,i) in $props.dataSource" :key="i" :item-data="path">
    </NavItem>
</template>