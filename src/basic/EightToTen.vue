<script setup>
import {ref} from 'vue'
const count=ref(15)
const greeting=ref('vue!')


function greet(event){
    alert(`hello ${greeting.value}`)
    if(event)
    console.log(event.target)
}

function stopBubble(event){
    console.log(event.currentTarget)
}

function selfEvent(){
    console.log('self function')
}

function preventDefault(){
    console.log('prevented')
}

function combinedMethod(){
    console.log('stoped and prevented')
}
function rightfoo()
{
    console.log('rightfoo')
}
function altsubmit()
{
    console.log('altsubmit')
}

const initialText = ref('defaultValue')
const modelText = ref('defaultValue')

const singleCheck=ref(true)
const multiChecks=ref(['apple'])
const picked=ref("Two")
const singleRadio=ref()
const singleSelected=ref('bus')
const multiSelected=ref(['coco'])

const vforSelect=ref([{hint:'first',value:'vfirst'},{hint:'second',value:'vsecond'},{hint:'third',value:'vthird'}])
const vforSelected=ref([])

const bindSingleBox=ref(null);
const bindSingleBoxTrue=ref({checked:"true",hint:"congrats"})
const bindSingleBoxFalse=ref({checked:"false",hint:"sorry"})

const bindFirst=ref({place:'first',value:'vfirst'})
const bindSecond=ref({place:'second',value:'vsecond'})
const bindRadio=ref(bindSecond.value)

const numberInput=ref(0)

function inputListener(event)
{
    console.log(event.target.value)
    console.log(initialText.value)
    initialText.value=event.target.value

    //input事件发生时不会默认改变绑定的响应式value，所以引入了双向绑定v-model
}

function numberChange(event)
{
    if(typeof numberInput.value ==='number')
         console.log('number')
}

</script>

<template>
    <div>
        <button @click="count++; count=count*2;Math.abs(count)">内联事件处理</button>
        <p>{{count}}</p>
        <button @click="greet">greet</button>
    </div>

    <div @click="stopBubble">
        <button @click.stop="stopBubble">停止冒泡</button>
    </div>

    <div @click.self="selfEvent">
        <button>自身处理</button>
    </div>

    <div>
        <form action="http://baidu.com" method="get" @submit.prevent="preventDefault">
            <input type="submit" value="提交"/> 
        </form>
        <a href="http://baidu.com" @click.stop.prevent="combinedMethod">跳转链接</a>
        <button @click.right="rightfoo">
        点击鼠标右键触发事件;left right middle
        </button>
        <input type="text" @keyup.alt.enter="altsubmit"/>
    </div>
    <!--表单输入处理 v-model-->
    <div>
        <input :value="initialText" @input="inputListener">
        {{ initialText }}   <br/>
        <input v-model="modelText">
        {{ modelText }}   <br/>

        <input type="checkbox" id="singlecheck" v-model="singleCheck" />
        <label for="singlecheck">{{singleCheck }}</label>
        <br/>

        <input type="checkbox"  v-model="multiChecks" value="apple" id="applebox"/>
        <label for="applebox">apple</label>

        <input type="checkbox" v-model="multiChecks" value="banana" id="bananabox"/>
        <label for="bananabox">banana</label>

        <input type="checkbox"  v-model="multiChecks" value="orange" id="orangebox"/>
        <label for="orangebox">orange</label>
        {{multiChecks}}
        <br/>
        <input type="radio" id="one" value="One" v-model="picked" />
        <label for="one">One</label>
        <input type="radio" id="two" value="Two" v-model="picked" />
        <label for="two">Two</label>
        {{picked}}
        <br/>
        <input type="radio" id="tree"   />
        <label for="tree">tree</label>
        {{singleRadio}}
        <br/>
        <select v-model="singleSelected">
            <option disabled>please select one</option>
            <option value="bus!">bus</option>
            <option>bicycle</option>
            <option>walk</option>
        </select>
        {{ singleSelected }}
        <br/>
        <select v-model="multiSelected" multiple>
            <option>burger</option>
            <option>coco</option>
            <option>patato</option>
        </select>
        {{ multiSelected }}
        <br/>
        <select v-model="vforSelected" multiple>
            <option v-for="item in vforSelect" :value="item.value">
                {{ item.hint }}
            </option>
        </select>
        {{ vforSelected }}
        <br/>

        <input id="bindSingleBox" type="checkbox" v-model="bindSingleBox"  :true-value="bindSingleBoxTrue" :false-value="bindSingleBoxFalse" />
        <label for="bindSingleBox">bind单个复选框</label>
        {{ bindSingleBox }}
        <br/>

        <input type="radio" v-model="bindRadio" :value="bindFirst"/>
        <label>first</label>

        <input type="radio" v-model="bindRadio" :value="bindSecond"/>
        <label>second</label>
        {{bindRadio}}    
        <br/>

        <input v-model.number="numberInput" @input="numberChange($event)"/>
        {{ numberInput}}

        </div>



</template>