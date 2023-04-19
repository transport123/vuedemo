<script setup>
import { provide, readonly, ref } from 'vue'
import Middleware from './middleware.vue'
import { myInjectionKey } from './key'
const list = ref(["one", "two", "three"])
const source = ref(list.value[0])
const count=ref(10)

const symbolName=ref('tom')
const symbolCount=ref(15)

console.log(myInjectionKey)
function addSource()
{
    let i = list.value.indexOf(source.value)
    let x = (++i)%3
    source.value=list.value[x]
}
provide('source',source)
provide('addSource',addSource)
provide('count',readonly(count))
provide(myInjectionKey,{
  symbolName,
  symbolCount
})

//app.provede() 可以在app层级提供，使得数据注入进整个app，在任意组件都可用。
</script>
<template>
    <div style="display: flex;align-items: center;">
        <div style="display: inline-block;border: 1px solid black;">
            <template v-for="(text, index) in list" :key="index">
                <input :id="text + 'radio'" type="radio" v-model="source" :value="text" />
                <label :for="text + 'radio'">{{ text }}</label>
                <br />
            </template>
        </div>
        <Middleware/>

    </div>
</template>