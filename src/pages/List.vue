<script>
import axios from 'axios'
import {nextTick, onMounted,ref} from 'vue'

axios.defaults.baseURL='http://192.168.0.26:8080';
axios.defaults.timeout = 5000;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const scrollDiv = ref(null)
const addDialogRef = ref(null)

export default {
 
  data() {
    return {
      showskeleton:true,
      list:[{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },{
        name:"jack",
        age:15,
        userId:1,
        gender:1
      },],
      editDialogVisible:false,
      addDialogVisible:false,
      deleteDialogVisible:false,

      addform:{
        age:0,
        name:'',
        gender:0
      },
      editform:{
        age:'',
        name:'',
        gender:0,
        userId:0
      },
      deleteid:-1,
      addConfirmAble:false,
      editConfirmAble:false,
      deleteConfirmAble:false
    }
  },
  mounted() {
    this.init()
    console.log(scrollDiv.value)
  },

  methods: {
    init() {//axios.get("/user/showUser")
      this.showskeleton=true;
      Promise.resolve(this.list).then(response => {
        console.log(response)
        this.list=response;
        this.showskeleton=false;
      }).catch((err)=>{
        this.showskeleton=true;
        console.log(err)
      })
     
      console.log("haha")

      // scrollDiv.scrollTop=scrollDiv.scrollTop+e.deltaY;
    },
    forceupdate(){
      this.$forceUpdate();
    },
    adduser(){
      this.addform.age='';
      this.addform.name='';
      this.addform.gender=-1;
      this.addDialogVisible=true;
      
    },
    addUserSubmit()
    {
      let addDialogRef = this.$refs.addDialogRef;
      console.log(addDialogRef)
      addDialogRef.addEventListener('click',this.scrollListener);
      if(!this.checkValidate(this.addform))
      {
        return;
      }
      this.addConfirmAble=true;
      console.log(this.addform);

      this.addform.age=Number(this.addform.age);
      console.log(this.addform);

      axios.post("/user/addUser",this.addform).
      then((response)=>{
        console.log('sam'+response)
        this.addDialogVisible=false
      },err=>{
        console.log('sam'+err);
      }).
      then(()=>{this.init();}).
      then(()=>{
        this.addConfirmAble=false;
      }).
      catch((err)=>{
        console.log(err);
        this.addConfirmAble=false;
      })
    },
    editUser(row){
      console.log(row)
      this.editform.age=row.age;
      this.editform.name=row.name;
      this.editform.gender=row.gender;
      this.editform.userId=row.userId;
      this.editDialogVisible=true;
    },
    editUserSubmit(){
      if(!this.checkValidate(this.editform))
      {
        return;
      }
      this.editConfirmAble=true;
      console.log(this.editform);
      axios.put("/user/updateUser",this.editform).then((response)=>{
        console.log(response)
        this.editDialogVisible=false
        this.editConfirmAble=false;
        this.init();
      }).catch(err=>{
        this.editConfirmAble=false;
        console.log(err)
      })
    },

    getGender(gender){
      if(gender===0)
      {
        return '女';
      }
      if(gender===1)
      {
        return '男';
      }
      return '未知'
    },
    deleteUser(did)
    {
      this.deleteDialogVisible=true;
      this.deleteid=did;
    },
    deleteUserSubmit(){
      this.deleteDialogVisible=false;
      axios.delete(`/user/deleteUser?userId=${this.deleteid}`).then((response)=>{
        console.log(response)
       this.init();
      }).catch(err=>{
        console.log(err)
      })
    },
    checkValidate(userInfo){
      console.log(userInfo)
      let nameReg = /^[\u4E00-\u9FA5A-Za-z]{2,10}$/
      if(!nameReg.test(userInfo.name))
      {
        this.$message({message:'非法用户名',showClose:true,duration:1500});
          return false;
      }

      if(userInfo.gender!==0 && userInfo.gender!==1)
      {
        this.$message({message:'请选择性别',showClose:true,duration:1500});
        return false;
      }

      let ageReg=/^([1-9][0-9]{0,1}|100)$/;
      
      if(!ageReg.test(userInfo.age))
      {
        this.$message({message:'请输入正确的年龄',showClose:true,duration:1500});
        return false;
      }
      return true;
    },
    scrollListener(e){
      // let scrollDiv = this.$refs.scrollDiv;
      // scrollDiv.scrollTop=scrollDiv.scrollTop+e.deltaY;
      console.log(e)
   

    },
    opened()
    {
      console.log(addDialogRef.value);
    }
  },
}
</script>

<template>
  <div style="overflow-y: scroll;height: 120vh;border: 5px solid black;padding-bottom: 10px; padding-right: 100px;"   ref="scrollDiv" >
      <el-skeleton v-show="showskeleton"/>
      <div style="border: 1px solid green;height: 300px;overflow-y: scroll; padding: 10px;">
      <div style="border: 1px solid red;height: 600px;"></div>
      </div>
      <div v-show="!showskeleton">
        <el-table :data="list" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="gender" label="性别">
          <template #default="scope">
            {{ getGender(scope.row.gender) }}
          </template>
          </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button  type="primary"  size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button  type="danger" size="small" @click="deleteUser(scope.row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button  type="primary"  size="small" class="elbtn" @click="adduser" style="position: fixed;z-index: 10000;top: 0px;right:0px">添加</el-button>

      </div>
      <el-dialog title="添加用户" v-model="addDialogVisible" :lock-scroll="false" ref="addDialogRef" @opened="opened">
        <el-form :model="addform" label-width="80px"  >
          <el-form-item label="姓名" prop="date">
            <el-input  auto-complete="off" v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="name">
            <el-input  auto-complete="off" v-model="addform.age"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="addform.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserSubmit" v-bind:disabled="addConfirmAble">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="编辑用户" v-model="editDialogVisible" :lock-scroll="false">
        <el-form :model="editform" label-width="80px" >
          <el-form-item label="姓名" prop="name">
            <el-input  auto-complete="off" v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input  auto-complete="off" v-model="editform.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="editform.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserSubmit" v-bind:disabled="editConfirmAble">确 定</el-button>
        </div>
      </el-dialog>

      

      <el-dialog title="删除用户" v-model="deleteDialogVisible">
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteUserSubmit" v-bind:disabled="deleteConfirmAble">确 定</el-button>
        </div>
      </el-dialog>
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
