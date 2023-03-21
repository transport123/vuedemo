<script>
import axios from 'axios'
//axios.defaults.baseURL=''
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
      },
      list: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      }],
      editDialogFormVisible:true,
      dialogVisible:false,
      addform:{
        date:'',
        name:'',
        address:''
      }
    }
  },
  mounted() {
    this.init()
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
    init() {
      axios.get("https://451ece6c-f618-436b-b4a2-517c6b2da400.mock.pstmn.io/list").then(response => {
        console.log(response)
      })
    },
    addUserSubmit()
    {
      console.log(this.addform.name);
    }
  }
}
</script>

<template>
  <div v-if=false>
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

  <div>
    
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button  type="primary"  size="small">编辑</el-button>
            <el-button  type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  

      <el-dialog title="添加用户" v-model="dialogVisible">
        <el-form :model="addform" label-width="80px" >
          <el-form-item label="日期" prop="date">
            <el-input  auto-complete="off" v-model="addform.date"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input  auto-complete="off" v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input  auto-complete="off" v-model="addform.address"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <el-button  type="primary"  size="small" class="elbtn" @click="dialogVisible = true">添加</el-button>
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
