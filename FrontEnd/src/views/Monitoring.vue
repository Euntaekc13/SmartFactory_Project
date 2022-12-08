<template>
    <div ref="webgl"></div>
</template>

<script>
import Three from "../example.js";


export default {
    name: "monitoring",
    mounted(){
        Three(this.$refs.webgl);
        console.log(this.$route.params.url);
        console.log(this.$route.params.port);
        console.log(this.$route.params.topic);
    }
}
</script>

<style scoped>
</style>
