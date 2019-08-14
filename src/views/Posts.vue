<template>
    <div>
        <header class="masthead text-white text-center">
            <div class="overlay"></div>
            <div class="container">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                <h1 class="mb-5">Posts</h1>
                </div>
            </div>
            </div>
        </header>
        <!-- Image Showcases -->
        <section class="showcase">
            <div class="container p-0">
            <router-link v-for="(item, index) in $store.state.posts" :key="index" :to="{name: 'PostId', params: {id: index}}" class="row no-gutters no-gutters1 m-5 shadow-lg">
                <div :class="['col-lg-6', {'order-lg-2': index%2==1 ? false : true}, 'text-white', 'showcase-img']" :style="{'background-image': `url(${item.image})`}"></div>
                <div class="col-lg-6 order-lg-1 my-auto showcase-text" :class="['col-lg-6', {'order-lg-1': index%2==1 ? true : false}, 'my-auto', 'showcase-text', 'p-4']">
                    <h2 v-html="item.title"></h2>
                    <p class="lead mb-0" v-html="item.content"></p> 
                </div>
            </router-link>
            </div>
        </section>
    </div>

</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('getPosts')
    },
    data() {
        return {
        }
    },
}
</script>

<style scoped>
    .no-gutters1{
        text-decoration: none;
        color: black;
        background-color: white;
    }
</style>
