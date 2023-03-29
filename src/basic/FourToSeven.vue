
<!--该页面尝试使用组合式写法-->
<script setup>
import { set } from 'lodash';
import {reactive,computed,onMounted,ref} from 'vue'

const refValue = ref(4);
const obj = {
  foo: ref(1),
  bar: ref(2)
};
const author = {
    name: 'John Doe',
    books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
}

let authorRef=ref({
    name: 'John Doe',
    books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

let authorReact= reactive(author)

const bookLength =computed(()=>{
    if(authorRef.value.books.length>0)
    return authorRef.value.books.length;

    return '长度错误'
})
const originRef = ref({firstValue:1,secondValue:2})

const computedFirst =computed(()=>{
    return originRef.value.firstValue+1;
})

const computeSet =computed({
    get(){
        return originRef.value.secondValue+10;
    }
    ,
    set(newValue){
        originRef.value.secondValue=newValue;
    }
})

function setValue(){
    computeSet.value=100;
}


function changeRefValue()
{
    //author.name='jack'
    authorReact = reactive({
        name: 'peter',
        books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
    })
    authorReact.name='park'
    authorRef = ref({
        name: 'peter',
        books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
    })
    authorRef.name='park'

    
    obj.bar.value=20;//如果注释该语句authorRef和authorReact就始终不会改变
    console.log(refValue)
    console.log(authorRef)
    console.log(authorReact)
    console.log(obj)
    //此时的行为理解：
    //Vue会将更改累积起来然后一次刷新，所以我认为这个刷新是一种全局刷新;
    //但是某个节点是否会被真实刷新需要满足两点：
    //1，节点处使用了 响应式对象，相当于一种‘注册’，这样在更新时才会去实际的更改dom树中的值；
    //2，对象本身在更改时能触发‘刷新’，否则永远无法进入‘全局刷新’这个阶段，dom树也就不会改变
    //上述例子中由于authorRef更换对象，新对象更改并不会触发刷新，所以即使值改变了也不会改变dom中的值
    //理解上应该有偏差，暂时先这么理解。

}

//class 与 style绑定
const isActive = ref(true)
const isError=ref(true)

const computeNoError=ref(null)
const computeError=ref({type:'fatal'})

const arrActive = ref('active')
const arrError = ref('text-error')


const fontSize=ref(20)
const styleColor=ref({
    color:'blue',
    background:'green'
})

const styleFont=ref({
    fontSize: '25px '
})
const isStyleFont=ref(false)

const objStyle=ref({
    active:isActive,
    'text-error':isError
})

const computedStyle=computed(()=>{
return{
    active: isActive.value && !computeError.value,
    'text-error': computeError.value && computeError.value.type==='fatal'
}
}
)

const vueGood = ref(true)
const vueType = ref(0)

const users=ref([{name:'harry',isActive:true},{name:'ronn',isActive:false}]);
const activeusers=computed(()=>{
        return users.value.filter(user=>user.isActive)
    })

const cUsers=[ref({name:'harry',isActive:true}),ref({name:'ronn',isActive:false})]
const activeCUsers=computed(()=>{
    return cUsers.filter(user=>user.value.isActive)
})

const parentMsg=ref('parentMessage')
const items=ref([{message:'foo',id:1},{message:'bar',id:2}])
const innerItem=ref([[{message:'foo',id:1},{message:'bar',id:2}],[{message:'foo',id:3},{message:'bar',id:4}]])

const objKeys=ref({
    name:'objobj',
    type:'plain',
    base:false
})

function snape()
{
    users.value.push({name:'snape',isActive:true})
    cUsers.push(ref({name:'snape',isActive:true}));
    //cUsers本身不是响应式对象，所以push后也不会触发任何改变
}

onMounted(()=>{
    console.log(refValue)

})
</script>

<template>
    <div>
        react:{{authorReact.name }}<br/>
        ref:{{ authorRef.name}}<br/>
        {{ obj }}<br/>
        {{bookLength+refValue}}<br/>
        {{ computedFirst }}<br/>
        {{ computeSet }}
        <button @click="changeRefValue">改变</button>
        <button @click="setValue">setValue</button>

    </div>

    <div>
        <p  class="static" :class="{active:isActive,'text-error':isError}">内联字面量class的绑定</p>

        <p  class="objstatic" :class="objStyle">对象样式的绑定</p>

        <p  class="computestatic" :class="computedStyle">计算样式的绑定</p>

        <p :class="[isActive?arrActive:'',arrError]"> 数组绑定样式1</p>

        <p :class="[{active:isActive},arrError]"> 数组绑定样式2</p>

        <p :style="styleColor">内联style绑定1</p>

        <p :style="{'fontSize':fontSize+'px'}">内联style绑定2</p>

        <p :style="[styleColor,styleFont]">内联style数组绑定</p>

        <p :style="[styleColor,{styleFont:isStyleFont}]">内联style数组条件绑定</p>
    </div>

    <div>
        <h1 v-if="vueGood">if:vue is good</h1>
        <h1 v-else>else:vue is bad</h1>
        <button @click="vueGood=!vueGood">vue好吗</button>
        <h1 v-show="vueGood">show:vue is good</h1>

        <h1 v-if="vueType===0">i don't use vue</h1>
        <h1 v-else-if="vueType===2">i use vue2</h1>
        <h1 v-else>i use vue3</h1>

    </div>
    <!--v-for与v-if的规范使用方式
    1,通过computed过滤出合法数据，只使用v-for
    2，通过template包裹li，将if和for分开在不同的标签上-->
    <ul>
        <li v-for="user in activeusers">
            {{user.name }}
        </li>
    </ul>

    <button @click="snape">添加snape</button>

    <ul>
        <template v-for="user in users">
            <li v-if="user.isActive">
                {{user.name}}
            </li>
        </template>
    </ul>
    <hr/>

    <ul>
        <li v-for="(item, index) in items" :key="item.id">
           {{ parentMsg }}-{{index}}-{{item.message }}
        </li>

        <li v-for="{message} in items">
           {{ parentMsg }}-{{message }}
        </li>
    </ul>

    <ul>
        <li v-for="item of innerItem">
            <span v-for="childItem of item">
               {{ item.length }} - {{childItem.message}} - {{ childItem.length }}
            </span>
        </li>
    </ul>

    <ul>
        <li v-for="(value,key,index) of objKeys">
            {{ key }}.{{ value }}:{{ index }}
        </li>
    </ul>
    <p v-for="(item, index) in items">
        {{ parentMsg }}-{{index}}-{{item.message }}
    </p>
    <span v-for="i in 15"> i: {{ i }} </span>
</template>

<style>
.active{
    border:1px solid black
}

.text-error{
    color: red;
}
.static{
    position:fixed;
    top:0;
    right:0
}

.objstatic{
    position:fixed;
    top:100px;
    right:0
}

.computestatic{
    position:fixed;
    top:200px;
    right:0
}

</style>