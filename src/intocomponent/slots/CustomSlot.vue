<script setup>
import FancyButton from './FancyButton.vue';
import MultiSlots from './MultiSlots.vue';
</script>

<template>
    <div style="background-color: bisque;">
        <FancyButton>
        <span style="vertical-align: bottom;display: inline-block;border: 1px solid red; line-height: auto;" >clickme</span>
        <img style="width: 50px;height: 50px;background-color: aquamarine;vertical-align: middle;"/>
        </FancyButton>
        <br/>
        
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