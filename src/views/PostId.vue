<template>
    <div >
        <div class="container" :style="{'background': `url(${$store.state.posts[$route.params.id].imgUrl}) no-repeat`, 'height': '500px'}">
        </div>
        <div>
            <h3 v-html="$store.state.posts[$route.params.id].title"></h3>
            <p>{{$store.state.posts[$route.params.id].description}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        console.log(this.$route.params.id)
        
        console.log(this.$store.state.posts[this.$route.params.id].imgUrl)
        
    },
}
</script>