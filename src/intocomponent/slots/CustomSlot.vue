<script setup>
import FancyButton from './FancyButton.vue';
import MultiSlots from './MultiSlots.vue';
</script>

<template>
    <div style="background-color: bisque;">
        <FancyButton>
            a
        <span style="border: 1px solid red; " >clickme clickme clickme clickme clickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickme</span>
        <!-- <img style="width: 50px;height: 40px;background-color: aquamarine;"/> -->
        </FancyButton>
        <br/>

        <span style="display: inline-block;height: 100px; line-height:100px;border: 1px solid black;text-align: center;"> 
        <span style="border: 1px solid red; vertical-align: middle;display: inline-block;line-height: normal;" >clickme clickme clickme clickme clickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickmeclickme clickme clickme clickme</span> 
        </span>


        <span style="display: inline-block;line-height: 100px;border: 1px solid black">
        <span style="vertical-align: middle;">aa</span>
        </span>
        
        <MultiSlots>
            <template v-slot:redp="{redgreeting,rcount}">
                redtext
                <span style="font-size: 3em;">{{redgreeting}}{{ rcount }}</span>
            </template>
            noname slot1
            <template #bluep="blueprops" >
                bluetext<br/>
                {{ blueprops.count }}<br/>
                {{ blueprops.text }}
            </template>
            noname slot2
        </MultiSlots>

    </div>
   
</template>