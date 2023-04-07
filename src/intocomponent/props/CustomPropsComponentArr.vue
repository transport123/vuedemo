<script setup>
const props = defineProps(['foo','fooObj'])

</script>

<template>
    <div>
        name:{{ props.fooObj.name }}<br/>
        number:{{ props.fooObj.number  }}<br/>
        foo:{{ props.foo }}
    </div>
</template>