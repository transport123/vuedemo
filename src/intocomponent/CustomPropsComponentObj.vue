<script setup>
import {Person} from '../rawjs/person'
const props = defineProps({
    foo:String,
    fooObj:{
        type:Object,
        default(rawProps){
            return{
                'name':'defaultfoo',
                'number':0
            }
        }
    },
    //prop类型检查，只有对象定义的方式可以使用该特性
    propA:[String,Number],//值可以为String或Number
    propB:{
        type:Number,
        required:false,//该值为true时表示必须传递该prop，默认都是可选的
        default:25//默认值为25
    },
    propC:{
        type:Object,
        default(rawProps){
            return{
                'attr':'attrValue'
            }
        }//当为Object时必须通过一个工厂返回默认构造值
    },
    propD:{
        type:Function,
        //该函数作为默认值
        default(){
            return 'default function'
        }
    },
    propE:{
        //自定义值检查器，赋值必须是这些值中的一个
        //也可以自定义规则，该函数输入一个value，返回一个bool值表示value是否合法
        validator(value){
            return ['messy','haland'].includes(value)
        }
    },
    person:{
        type:Person,
        default(rawProps){
            return new Person('jessie','pinkman')
        }
    },
    //boolean有特殊的使用方式，属性显式声明在标签中时不用赋值，默认为true，未声明时为false
    disabled:{
        type:Boolean
    }
})
//需要注意defineprops内部是无法访问到script中定义的其他变量的，因为其在编译时会移到整个函数的外部

</script>

<template>
    <div>
        name:{{ props.fooObj.name }}<br/>
        number:{{ props.fooObj.number }} <br/>
        {{ props.person }}   
    </div>
</template>