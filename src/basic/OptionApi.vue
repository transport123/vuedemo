<script>
export default{
  data(){
    return{

        option:{
            val1:1,
            val2:2
        },
        value1:1
    }
  },
  mounted(){
    console.log(this.option)
    console.lo,g(this.value1)
  },
  methods:{
    changeOp()
    {
        this.option={val1:2,val2:3};
    }
  }
}
</script>

<template>
<p>{{option.val1}}</p>
<button @click="changeOp">改变option</button>
</template>