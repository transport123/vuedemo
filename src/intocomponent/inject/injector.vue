<script setup>

import { inject, ref } from 'vue'
import { myInjectionKey } from './key'

class defaultComplex {
    constructor() {
        console.log('start')
        let result = 0;
        for (let i = 0; i < 100; i++) {
            result += i;
        }
        this.number = result;
    }
}

function noClassDefault() {
    let result = 0;
    for (let i = 0; i < 100; i++) {
        result += i;
    }
    this.number = result;
}


function addCount()
{
    count.value++
    //抛出警告，不会修改成功
}


//如果注入的是ref对象，不会解包，使得其保持响应
//对于默认值，如果需要一系列计算进行返回，建议使用工厂函数，而不是直接将函数进行调用，可以避免不必要的性能损耗
//注意工厂函数需要使用new 来创建对象
const source = inject('source', 'default')

//很奇怪，默认的第三个参数在使用工厂函数时为true，但是调用的inject却是另一个为false的函数，只能手动赋值，不太理解为什么
const complex = inject('complex', () => ref(new noClassDefault()),true)

//通过注入的方法提供数据时，最好将数据的更改全部放在provider中，假设想通过injector触发一个更改，我们需要抛出事件。
//但是很明显emit此时不好用，因为emit不具备穿透的特性，所以我们直接利用inject来注入一个方法，使得在子组件中可以直接调用该方法

//注入的一个函数
const addSource=inject('addSource',()=>{},false)

//注入只读属性
const count = inject('count',ref(100))

const mySymbol = inject(myInjectionKey,{symbolName:ref('default'),symbolCount:ref(0)})
console.log(mySymbol)

</script>
<template>
    <div style="border: 1px solid black;">
        {{ source }}
        <button @click="addSource">addSource</button>
        <br/>
        {{count }}
        <button @click="addCount">addCount</button>
    </div>
</template>
<style></style>