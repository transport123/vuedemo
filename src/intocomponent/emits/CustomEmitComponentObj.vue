<script setup>
const emits=defineEmits({
    //无检查规则
    'submitA':null,
    submitB(){
        return true
    },
    //两种参数检查
    submitC:(account,pwd)=>{
        if(account && pwd)
        {
            console.log(`account:${account} pwd:${pwd}`)
            return true
        }else{
            console.log('illegal account or pwd')
            return false
        }
    },
    submitD:({account,pwd})=>{
        if(account && pwd)
        {
            console.log(`account:${account} pwd:${pwd}`)
            return true
        }else{
            console.log('illegal account or pwd')
            return false
        }
    //参数检查一方面显式申明了参数的个数，一方面检测输入实参是否合法
    //但是该检查并不会影响事件是否传递，无论是返回true或false，或者是emit参数数量与定义不同，外界函数都会成功接收到所有参数并触发
    //我们只能看到一个warning
    }
})
//script中无法使用$emit，所以使用defineEmits返回的变量来触发
emits('submitA')
</script>
<template>
    <button  @click="$emit('submitA')">submitA</button>
    <button  @click="$emit('submitB')">submitB</button>
    <button  @click="$emit('submitC','12345','123',$event)">submitC</button>
    <button  @click="$emit('submitD',{account:'1234',pwd:'1234'})">submitD</button>
</template>