<script setup>
    import { ref } from 'vue';
    const props = defineProps({
        itemData:{
            type:Object,
            required:true,
            default(raw){
                return {
                    title:'default',
                    children:[]
                }
            }
        }
    })
    const hasChild=ref(props.itemData.children.length>0)
</script>

<template>
    
    <div>
        <span>{{ $props.itemData.title }}</span><br/>
        <template v-if="hasChild">
            <div style="margin-left: 20px;">
                <nav-item v-for="(path,i) in $props.itemData.children" :key="i" :itemData="path">
                </nav-item>
            </div>
        </template>
    </div>

    
</template>