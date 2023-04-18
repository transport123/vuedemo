<script setup>
import { ref,reactive } from 'vue';
import ArrProps from './CustomPropsComponentArr.vue'
import ObjProps from './CustomPropsComponentObj.vue'
import Navigation from '../nav/navigation.vue';
//ref的好处就是用一个引用将目标对象包裹了起来，且响应链为ref自身，那么在深响应的情况下，只要这个ref本身没有被替换，响应链就会一直存在
const fooObj = ref({name:"haland",number:22})
const traditionObj = {
    child:{
        name:'vivi',
        age:25
    },
    index:0
}
const reactiveObj=reactive({
    child:{
        name:'vivi',
        age:25
    },
    index:0
})

const pathData=[{
    title:'一级标题A',
    children:[{
        title:'二级标题A',
        children:[{
            title:'三级标题AA',
            children:[]
        },{
            title:'三级标题AB',
            children:[]
        }]
    },{
        title:'二级标题B',
        children:[]
    }]
},{
    title:'一级标题B',
    children:[{
        title:'二级标题A',
        children:[{
            title:'三级标题AA',
            children:[]
        },{
            title:'三级标题AB',
            children:[]
        }]
    },{
        title:'二级标题B',
        children:[]
    }]
}]
const refPath = ref(pathData)

function showObj(){
    let child = traditionObj.child
    child.name='kitty'
    console.log(traditionObj)//传统对象也是引用，这一点和java有些相似

}

function acceptReactChild(child)
{
    console.log(child)//传统对象也是引用，这一点和java有些相似
    child.name = 'reactVivi'
}

function acceptReactIndex(index)
{
    console.log(index)//传统对象也是引用，这一点和java有些相似
    index = 25
}

</script>
<template>
    <div>
        <div>
            arrfoo:
            <ArrProps :foo-obj="{'name':'jack','number':25}"></ArrProps> <br/>
            <!--虽然此时的赋值为静态对象，但由于传统属性赋值只能传递字符串，而这里是js的语句，所以还是得用动态绑定-->
            objfoo:
            <ObjProps :foo-obj="{'name':'jack','number':25}" dis    abled></ObjProps> <br/>
            <!--在定义prop时较长的名称推荐使用驼峰命名法，且此时引号不是必须的；在使用prop时推荐使用kebab命名法，向传统的html属性靠拢-->
            dynamicfoo:
            <ArrProps :foo-obj="fooObj" foo="im a foo"></ArrProps> <br/>
            <label>dynamicfoo的内容</label>
            <input type="text" v-model="fooObj.name"/><br/>
            multibind:
            <ArrProps v-bind="{'foo':'im not a foo','fooObj':{
                'name':'mbple',
                'number':18
            }}"></ArrProps> <br/>
            <!--一次性将该对象的所有属性进行绑定，对象属性名对应prop名，所以需要保持一致，否则就会变成未定义的attr-->
        </div>

        <div>
            <button @click="showObj">改变传统嵌套对象值</button>
            <button @click="acceptReactChild(reactiveObj.child)">改变React嵌套对象值</button>
            <!--可以看出reactive对象的响应丢失是因为引用的丢失，如果还是对象内部的引用那么响应链仍然存在-->
            <button @click="acceptReactIndex(reactiveObj.index)">改变React普通属性值</button>
            <!--很明显这里的传参是值的拷贝，那么引用就丢失了，所以响应也就断了-->
            reactiveObj:{{ reactiveObj }}
        </div>

        <div>
            <Navigation :data-source="pathData"></Navigation>
        </div>
    </div>
</template>