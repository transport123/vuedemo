<script setup>
    import {ref} from 'vue'
    defineProps(['prefix'])
    defineEmits(['font-enlarge'])
    const count = ref(0)
</script>

<template>
    <p>{{prefix}}  </p>
    <button @click="count++">clicked {{ count }} times</button>
    <slot />
    <button @click="$emit('font-enlarge')">enlarge</button>
   
</template>