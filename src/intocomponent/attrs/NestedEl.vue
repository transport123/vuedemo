<script>
export default{
    inheritAttrs:false
}
</script>
<script setup>
import { useAttrs, watch } from 'vue';
const props = defineProps(['name','clickCountProp'])
const emits = defineEmits(['update:name'])
const elAttrs = useAttrs()
// console.log(elAttrs)
//和prop一样，内部也不推荐修改attr，它为只读，此时会抛出一个warning，且该修改无效
//elAttrs.class=""



watch(()=>props.name,()=>{
    console.log('name changed')
})

//官方文档解释attr尽管总是显式最新样式，但是因为性能原因并不具备响应性，不能监听attr的变化，如果想使用响应性推荐prop
//不知为何该例子也能跑通，当使用v-bind在外层绑定attr时，外层的改变是可以在这里watch到的，不知道是否我理解有误
watch(()=>elAttrs.class,()=>{
    console.log('classchanged')
})

</script>
<template>
    <div>
        未默认继承的字体不会被改变
    </div>
    <div>
        attrs:{{ $attrs }}<br/>
        <!--绑定事件会被暴露为一个函数，由于不能算作‘属性’，所以不会被自动打印出来-->
        events:{{ $attrs.onClick }}
    </div>
    <!--可以使用attrs全部绑定或者部分绑定，要注意此时使用的是表达式，传统的绑定是不起作用的，只能使用vbind-->
    <div :class="$attrs.class">
        指定该div继承部分属性
    </div>
    <div v-bind="$attrs" style="margin-top: 50px;">
        指定该div继承所有属性   
    </div>
    <button @click="$attrs.onClick">绑定并修改attr</button>
    <label>name</label>
    <input :value="$props.name" @input="$emit('update:name',$event.target.value)"/><br/>
    {{ props.name }}
</template>