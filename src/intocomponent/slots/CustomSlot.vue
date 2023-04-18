<script setup>
import FancyButton from './FancyButton.vue';
import MultiSlots from './MultiSlots.vue';
</script>

<template>
    <div style="background-color: bisque;">
        <FancyButton>
        <span style="border: 1px solid red; " >click</span>
        <img style="width: 50px;height: 40px;background-color: aquamarine;vertical-align: middle;"/>
        </FancyButton>
        <br/>

        <span style="display: inline-block; line-height:100px;border: 1px solid black;font-size: 0;"> 
            <span style="display: inline-block;font-size:3rem;vertical-align: middle;">hello</span>
            <!-- <span style="width: 50px;height: 10px;background-color: red; vertical-align: baseline;display: inline-block;"></span> -->
            <!-- <img style="width: 50px;height: 40px;" /> -->

            
            <!-- <span style="border: 1px solid red; display: inline-block;line-height: normal;font-size: medium;vertical-align: baseline;" >clickme clickme clickme clickme clickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickme</span>  -->
        </span>

        <span style="display: inline-block;line-height: 80px;background-color: red;border: 1px solid black;">
            a
        <span style="width: 50px;height: 200px;display: inline-block;background-color: beige;vertical-align: middle;"></span>
        </span>


        <span style="display: inline-block;line-height: 100px;border: 1px solid black;font-size: 0;">
        <span style="vertical-align: middle;font-size: medium;">aa</span>
        </span>
        <br/>
        <span style="line-height: 60px;border: 1px solid black;display: inline-block;font-size: 3rem;">
           xxaB
           <span style="height: 30px;width: 20px;background: red;display: inline-block;"></span>
        </span>
        <MultiSlots >
            <template v-slot:redp="{redgreeting,rcount}">
                redtext
                <span style="font-size: 3em;">{{redgreeting}}{{ rcount }}</span>
            </template>
           
            <template #bluep="blueprops" >
                bluetext<br/>
                {{ blueprops.count }}<br/>
                {{ blueprops.text }}
            </template>
            <template v-slot="defaults">
                noname slot1
                noname slot2
                {{ defaults.defaultname }}{{ defaults.defaultcount }}
                hello
                <!--注意，-->
            </template>
           
        </MultiSlots>

    </div>
   
</template>