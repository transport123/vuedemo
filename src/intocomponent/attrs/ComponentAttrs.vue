<script setup>
import { nextTick, ref } from 'vue';
import MyButton from './MyButton.vue';
import NestedEl from './NestedEl.vue';
const Nested = ref(null)
const originDiv = ref(null)
const hasBorder = ref(true)
const name =ref('jack')
const clickCount = ref(0)
const clickCountProp=ref(100)
function fatherClick(event)
{
    console.log('fatherClick'+event.target)
}

//无论是attr还是prop,当绑定的数据源改变时,通过$attr或$prop访问属性时都不会立刻发生改变,因为这相当于dom树中的内容,尽管是虚拟节点，其值的改变
//也会发生在一次flush中，如果希望访问到新值需要在nexttick中
function nestedClick()
{
    console.log('nestedClick')
    hasBorder.value=!hasBorder.value
    clickCount.value++
    clickCountProp.value--
    if(Nested)
    {
        console.log(Nested.value.$props)
        console.log(Nested.value.$attrs)
        //Nested.value.$attrs.class=""
        nextTick(()=>{
            console.log("nexttick")
            console.log(Nested.value.$props)
            console.log(Nested.value.$attrs)           
        })
    }
}
//自定义组件标签和原生标签有较大的区别，nested获取到的ref是一个虚拟节点，并不是真实dom树中的一个node，$attrs也是该虚拟节点
//特有的属性，其和prop类似为readonly，所以这里我们无法更改class的内容;而原生标签在获取之后即为真实的dom节点，可以像操作真实
//dom树一样去改变其中的属性样式等
function divClick()
{
    console.log(originDiv.value)
    originDiv.value.className=""
}
</script>
<template>
    <!--未申明为prop 和 emit的属性与事件，传递时会通过attr来进行传递-->
    <!--多层级的组件会一直透传到最底层的接收属性元素;prop和emit则会被mybutton消费，而不会传递到basebutton;
        如果透传的attr中有符合basebutton的prop申明，则该prop就会被赋值-->
    <!--事件不仅仅会透传，多个绑定会触发多个函数-->
    <MyButton class="large color" @click="fatherClick($event)"/>
    <!--原生html的部分css属性如颜色，字体会默认的应用到子元素上，这部分和vue组件的属性透传无关，不要混淆-->
    <div style="color: green;">

        <NestedEl class="large bgcolor" :class="{border:hasBorder}" :clickCount="clickCount" @click="nestedClick" ref="Nested" v-model:name="name"
        :clickCountProp="clickCountProp">
        </NestedEl>
    </div>
    <div ref="originDiv"  class="large bgcolor" @click="divClick">
        原生div标签
    </div>
</template>
<style>
.large{
    font-size: large;
}
.color{
    color: red;
}
.bgcolor{
    background-color: blueviolet;
}
.border{
    border: 2px gray solid;
}
</style>