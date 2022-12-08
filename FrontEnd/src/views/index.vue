<template>
    <div ref="webgl"></div>
</template>

<script>
import Three from "../example.js";


export default {
    mounted(){
        Three(this.$refs.webgl);
    }
}
</script>

<style scoped>
</style>
