<script setup>
import BaseButton from './BaseButton.vue';
function MyButtonClicked()
{
    console.log('mybuttonclicked')
}
</script>
<template>
    <BaseButton @click="MyButtonClicked"/>
</template>