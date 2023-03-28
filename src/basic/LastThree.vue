<script setup>
import {ref,watch,reactive,watchEffect,onMounted} from 'vue'
const basicNum = ref(0)


const objNum=ref({count:0})

const outObj=reactive({
    name:'outer',
    child:{
        name:'inner',
        id:1106
    }
})

const bookId=ref(10)
const effectBookId=ref(100)

watch(basicNum,(newvalue,oldvalue)=>{
    console.log(`basic old${oldvalue}`)
    console.log(`basic new${newvalue}`)
},{immediate:true})

watch(objNum,(newvalue,oldvalue)=>{
    console.log(`old proxy${oldvalue.count}`)
    console.log(`new proxy${newvalue.count}`)

})

watch(objNum.value,(newvalue,oldvalue)=>{
    console.log(`old proxy value${oldvalue.count}`)
    console.log(`new proxy value${newvalue.count}`)

})

watch(()=>(objNum.value.count),(newvalue,oldvalue)=>{
    console.log(`old getter${oldvalue}`)
    console.log(`new getter${newvalue}`)
})

watch(()=>(outObj.child),(newvalue,oldvalue)=>{
    console.log(`old outObj`+oldvalue.id)
    console.log(`new outObj`+newvalue.id)
},{deep:true})

watch(bookId,async (value)=>{
    try{
        const response = await fetch(`url?${bookId.value}`)
        const json = await response.json()
        console.log(value)
    }catch(err){
        console.log(err)
    }
   
},{immediate:true})

watchEffect(async ()=>{
    try{
        console.log('watcheffect')

        const response = await fetch(`url?${effectBookId.value}`)
        const json = await response.json()
    }catch(err){
        console.log(err)
    }
})

const plainInput=ref(null)
const datalist=ref([{name:'jack',age:20},{name:'peter',age:20},{name:'frank',age:20}])
const domRefs=ref([])

onMounted(()=>{
    console.log('mounted')

    console.log(plainInput.value)
    plainInput.value.focus()
    for(let i=0;i<domRefs.value.length;i++)
    {
        console.log(domRefs.value[i])
    }
})

function changeProxy()
{
    objNum.value={count:10}
}

function changeProxyValue()
{
    objNum.value.count=100
}

function pTempRef(el)
{
    console.log(el)
}

</script>

<template>
    <div>
        <button @click="basicNum++;objNum.count++">Num++</button>
        <button @click="changeProxy">改变ref的proxy</button>
        <button @click="changeProxyValue">改变ref的proxy value</button>
        <button @click="outObj.child.id++">改变child属性值</button>
        <button @click="outObj.child={name:'after',id:1107}">改变child本身</button>
    </div>
    <div>
        <input ref="plainInput" id="plaininput"/>
        <ul>
            <li v-for="person in datalist" ref="domRefs">
                {{ person.name }}
            </li>
        </ul>
        <input :ref="pTempRef"/>
    </div>




</template>