<!-- <script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script> -->
<script setup>
import {RouterLink} from 'vue-router'
import {computed} from 'vue'

//通过 ... 进行展开,因为RouterLink.props是一个对象，所以要使用对象展开的方式，以及对象来定义该组件的prop。、
//使用数组方式会提示props非迭代对象，这是当然的因为它是一个对象
const rpops = defineProps({...RouterLink.props,inactiveClass:String})

//通过rpops来访问props对象中的属性，也可以使用useLink将其scope提升
const isExternal = computed(()=>{
    return typeof rpops.to === 'string' && rpops.to.startsWith('http')
})

function showLog(fn,event)
{
    console.log(event.target)
}
</script>

<template>
    <div>
    <!--通过vbind将attrs穿透传递-->
    <a v-bind="$attrs" v-if="isExternal" :href="to" target="_blank" style="color:green">
        <slot/>
    </a>

    <!--组件内的标签其实就是使用了插槽，此时想在插槽内部访问组件的属性值，需要v-slot传递 -->
    <RouterLink v-else v-bind="$props" @click="showLog" v-slot="{isActive,href,navigate}" custom sss="999">
        <a :href="href"  @click="showLog(navigate,$event)" :class="isActive?activeClass:inactiveClass" v-bind="$attrs" 
        ppp="0000" inactiveClass>
        <!--因为inactiveclass并不是RouterLink的prop-->
            <slot/>
        </a>
    </RouterLink>
    </div>
</template>