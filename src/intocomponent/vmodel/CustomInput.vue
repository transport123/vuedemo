<script setup>
import {computed} from 'vue'
const props = defineProps(['modelValue','email','compute','capital','capitalModifiers'])
//如果想使用v-model的双向绑定，该事件申明时需要带上update前缀
const emits= defineEmits(['update:modelValue','update:email','update:compute','update:capital'])

const computedValue =computed(
    {
        get(){
            return props.compute
        },
        set(value){
            emits('update:compute',value)
        }
    }
)

function capitalize(capitalValue)
{

    let value = capitalValue
    if(props.capitalModifiers.capitalize){
        value = value.charAt(0).toUpperCase() + value.slice(1)
    }
    emits('update:capital',value)
}
</script>
<template>
    <div>
        <h3>这是一个自定义的输入表单</h3>
        <input type="text" :value="modelValue" @input="$emit('update:modelValue',$event.target.value)">
        <h3>这是计算属性实现的vmodel</h3>
        <input type="text" v-model="computedValue">
        <h3>这是一个邮箱</h3>
        <input type="text" :value="email" @input="$emit('update:email',$event.target.value)">
        <h3>这是首字母大写的修饰符</h3>
        <input type="text" :value="capital" @input="capitalize($event.target.value)">
    </div>
</template>