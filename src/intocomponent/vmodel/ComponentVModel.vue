<script setup>
import MyInput from './CustomInput.vue'
import {ref} from 'vue'
const originModel=ref('origin')
const valueModel=ref('value')
const customDefaultModel=ref('customDefault')
const emailModel=ref("4088@qq.com")
const compute = ref('compute')
const capitalize=ref('capital')

function valueChanged(event)
{
    valueModel.value=event.target.value
}

</script>
<template>
    <div>
        原生vmodel:{{ originModel }}<br/>
        <label>原生input:</label>
        <input type="text" v-model="originModel"/><br/>
        vmodel实现原理:{{ valueModel }}<br/>
        <label>vmodel的本质:</label>
        <!--首先单向绑定，并监听input事件，实时改变model值-->
        <input type="text" :value="valueModel" @input="valueChanged($event)"/><br/>
        <!--组件使用vmodel时的原理和此一致，需要单向绑定+事件监听-->
        自定义组件vmodel:{{ customDefaultModel }}<br/>
        compute:{{compute }}<br/>
        邮箱:{{ emailModel }}<br/>
        <!--vmodel的默认属性为modelValue,其他自定义属性需要使用完整的写法-->
        <MyInput v-model="customDefaultModel" v-model:email="emailModel" v-model:compute="compute" v-model:capital.capitalize="capitalize">
        </MyInput><br/>

    </div>


    
</template>