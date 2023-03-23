<script setup>
import {nextTick, onMounted,ref,getCurrentInstance, defineComponent,reactive} from 'vue'
const btnref=ref(null)
const primarybtn = ref(null)
const btnContent='确定'

onMounted(()=>{
    console.log('mounted')
    console.log(btnref.value)
})

function btnClicked(){
    console.log(btnref.value)
    console.log([primarybtn.value])
}

</script>
<template>
    <div>
        <el-button type="primary" ref="btnref" @click="btnClicked">{{btnContent}}</el-button>
        <button ref="primarybtn">取消</button>
    </div>
</template>