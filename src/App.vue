<script>
import { debounce } from 'lodash';

export default {
  data() {
    return {
      content: 'content!',
      vhtml: '<span style="color: red;">this is a red?</span>',
      dynamicid: 'did',
      easyid: "eid",
      vbindObj: {
        oname: 'name',
        vnumber: 'number'
      },
      buttonenable: true,
      buttonhidden: false,
      tsid: 2,
      isShowts3: true,
      attrname: 'style',
      mstyle: {
        color: 'red'
      }
    }
  },
  created(){
    this.betterDebounce=debounce(this.handleDebounce,5000);
    //通过每次组件创建时都创建一个debounce实例，为每个组件维护自己的状态，就不会出错
    //此时组件内只要绑定this.betterDebounce函数就好了，它其实就是this的一个函数类型的属性
  },
  mounted() {
  },
  unmounted() {
    this.betterDebounce.cancel();
  },
  methods: {
    increment(id) {
      return id + 1;
    },
    vonLog() {
      console.log('v-on')
    },  
    onSubmitPre() {

    },
    handleDebounceDefault:debounce(function(){
      //do-sth
      //这种方式只在模块加载时创建一个debounce实例，多个组件会共用此实例。由于debounce内部会维护‘时间状态’来实现防抖，多个组件的状态不同就会造成问题
    },500),
    functionF:function(){
      //这种写法也是一种申明函数的方法
    },
    handleDebounce(){
      //do-sth
    }
  },
  computed:{
   
  }
}
</script>

<template>
  <div v-if=true>
    <span v-html="vhtml"></span> <!--尽量不用这个属性，不安全-->
    <header>

      <div class="wrapper">
        <p v-bind:id="dynamicid" style="border: 1px black solid;line-height: 3;">这是一个动态id</p>

        <p style="border: 1px black solid;">这是一个段落</p>

        <p :id='easyid' style="border: 1px black solid;">这是一个简写语法id</p>
        <!--当使用flex嵌套flex时，如果没有给内部flex容器设定宽度，内部flex容器的宽度由flex子项计算得到，也就是内部flex容器的宽度为 inline-box的子flex项的宽度之和，且这个值是固定的
            后续在设置flex:1或者flex-basis:50%也是根据这个值来计算的，如果不额外设置margin或者gap，这个宽度好像没法改变，有点棘手-->

      </div>
      <div v-bind="vbindObj">{{ vbindObj }}</div><!--这种绑定方式是否有些多此一举？-->
    </header>
    <div :id="`ts-${tsid}`">
      <button :disabled="buttonenable" :hidden="buttonhidden">button</button>
      {{ buttonenable ? dynamicid : easyid }}
      <!--双括号和v-bind均支持js的表达式，模板字符串;但只支持能返回值的单句表达式，所以调用函数是可以的，多语句不行--><br />
      <!--模板表达式仅能访问有限的全局对象列表如Math，Date等；也可以显式的在app.config.globalproperties上添加供所有表达式使用-->
      {{ `this is a template str+${content}` }}
    </div>
    <div :id="`ts-${increment(tsid)}`" v-if="isShowts3" style="height: 100px; background-color: aqua;">
      v-if表示该元素是否存在于dom树中，当为false时html中没有该元素<br />
      <button v-on:click="vonLog">v-on绑定事件</button>
      <span v-bind:[attrname]="mstyle">动态属性绑定</span>
      <form @submit.prevent="onSubmitPre">以某种特殊的行为绑定事件，比如此时就是要阻止事件的默认行为</form>
    </div>
  </div>

  
</template>

<style scoped>
header {

  border: 1px red solid;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;

    background-color: aqua;
  }


  header .wrapper {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: beige;
    gap: 30px;
  }

  .elbtn{
    background-color: #3f9eff;
    border-color: #3f9eff;
    color:#fff
  }
  .elbtn:hover{
    background-color: #ecf5ff;
    border-color: #b3d8ff;
    color:#409eff;
  }

}
</style>
