<script setup>
import {ref} from 'vue'
const greetingblue=ref('helloblue')
const greetingred=ref('hellored')
</script>
<template>
    <div>
        <p style="color: red;">
            <slot name="redp" :redgreeting="greetingred" :rcount="20">
                default
            </slot>
        </p>
        <p style="color: blue;">
            
            <slot name="bluep" :text="greetingblue" :count="1">

            </slot>
        </p>
        <p>
            <slot>

            </slot>
        </p>
    </div>
</template>